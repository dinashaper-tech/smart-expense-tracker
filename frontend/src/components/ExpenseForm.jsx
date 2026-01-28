import { useState } from 'react';
import { Plus } from 'lucide-react';
import './ExpenseForm.css';

const CATEGORIES = [
  { value: 'food', label: '🍔 Food', color: '#FF6B6B' },
  { value: 'transport', label: '🚗 Transport', color: '#4ECDC4' },
  { value: 'entertainment', label: '🎮 Entertainment', color: '#FFE66D' },
  { value: 'utilities', label: '💡 Utilities', color: '#95E1D3' },
  { value: 'healthcare', label: '🏥 Healthcare', color: '#F38181' },
  { value: 'other', label: '📦 Other', color: '#AA96DA' }
];

function ExpenseForm({ onExpenseAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'food',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onExpenseAdded(formData);
      
      // Reset form
      setFormData({
        amount: '',
        category: 'food',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label>Amount ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              required
              min="0.01"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="What did you spend on?"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          <Plus size={20} />
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;