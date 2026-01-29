import axios from 'axios';

// API configuration
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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API service
export const authService = {
  // Register new user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout (client-side)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Expense API service
export const expenseService = {
  // Get all expenses with optional date filtering
  async getExpenses(startDate, endDate) {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  // Create new expense
  async createExpense(expenseData) {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  // Delete expense
  async deleteExpense(id) {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  // Get analytics
  async getAnalytics(month, year) {
    const response = await api.get('/expenses/analytics', {
      params: { month, year }
    });
    return response.data;
  }
};