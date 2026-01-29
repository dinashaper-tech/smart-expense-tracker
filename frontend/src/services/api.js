import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  console.log(' Making request to:', config.url); 
  console.log('Token from localStorage:', token ? 'EXISTS' : 'MISSING'); 
  
  if (token) {

    config.headers.Authorization = `Bearer ${token}`;
    console.log(' Authorization header added'); 
  } else {
    console.log(' No token found in localStorage!'); 
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(' API Error:', error.response?.status, error.response?.data); 
    
    if (error.response?.status === 401) {
      console.log('🚪 Unauthorized - redirecting to login'); 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const expenseService = {
  async getExpenses(startDate, endDate) {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  async createExpense(expenseData) {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  async deleteExpense(id) {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  async getAnalytics(month, year) {
    const response = await api.get('/expenses/analytics', {
      params: { month, year }
    });
    return response.data;
  }
};