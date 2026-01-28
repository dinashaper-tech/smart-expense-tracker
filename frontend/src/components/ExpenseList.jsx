import { Trash2, Calendar, Tag } from 'lucide-react';
import './ExpenseList.css';

const CATEGORY_COLORS = {
  food: '#FF6B6B',
  transport: '#4ECDC4',
  entertainment: '#FFE66D',
  utilities: '#95E1D3',
  healthcare: '#F38181',
  other: '#AA96DA'
};

function ExpenseList({ expenses, onDelete }) {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <h2>Recent Expenses</h2>
        <div className="empty-state">
          <p>No expenses yet. Add your first expense above! 💸</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h2>Recent Expenses ({expenses.length})</h2>
      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div 
              className="category-indicator"
              style={{ backgroundColor: CATEGORY_COLORS[expense.category] }}
            />
            
            <div className="expense-details">
              <div className="expense-header">
                <h3>{expense.description}</h3>
                <span className="expense-amount">
                  {formatCurrency(expense.amount)}
                </span>
              </div>
              
              <div className="expense-meta">
                <span className="meta-item">
                  <Tag size={14} />
                  {expense.category}
                </span>
                <span className="meta-item">
                  <Calendar size={14} />
                  {formatDate(expense.date)}
                </span>
              </div>
            </div>

            <button 
              className="delete-btn"
              onClick={() => onDelete(expense.id)}
              title="Delete expense"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;