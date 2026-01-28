import axios from 'axios';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'user-id': 'demo-user' // Simple demo authentication
  }
});

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

