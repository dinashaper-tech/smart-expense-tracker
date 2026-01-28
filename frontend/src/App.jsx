import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Analytics from './components/Analytics';
import { expenseService } from './services/api';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load expenses and analytics on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch expenses
      const expensesRes = await expenseService.getExpenses();
      setExpenses(expensesRes.data || []);

      // Fetch analytics for current month
      const now = new Date();
      const analyticsRes = await expenseService.getAnalytics(
        now.getMonth() + 1,
        now.getFullYear()
      );
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = async (expenseData) => {
    const result = await expenseService.createExpense(expenseData);
    
    if (result.success) {
      // Reload data to update list and analytics
      await loadData();
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        await loadData(); // Reload data after deletion
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Smart Expense Tracker</h1>
        <p>Track your spending with AI-powered insights</p>
      </header>

      <div className="main-content">
        <div className="left-column">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        </div>

        <div className="right-column">
          <Analytics analytics={analytics} />
        </div>
      </div>
    </div>
  );
}

export default App;