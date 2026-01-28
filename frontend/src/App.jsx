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
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const expensesRes = await expenseService.getExpenses();
      setExpenses(expensesRes.data || []);

      const now = new Date();
      const analyticsRes = await expenseService.getAnalytics(
        now.getMonth() + 1,
        now.getFullYear()
      );
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = async (expenseData) => {
    try {
      const result = await expenseService.createExpense(expenseData);
      
      if (result.success) {
        await loadData();
      }
    } catch (error) {
      throw new Error('Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your expenses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-state">
          <h2>Oops!</h2>
          <p>{error}</p>
          <button onClick={loadData} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1> Smart Expense Tracker</h1>
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