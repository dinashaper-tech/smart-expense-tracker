import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, DollarSign, Calendar, PieChart as PieIcon } from 'lucide-react';
import './Analytics.css';

const CATEGORY_COLORS = {
  food: '#FF6B6B',
  transport: '#4ECDC4',
  entertainment: '#FFE66D',
  utilities: '#95E1D3',
  healthcare: '#F38181',
  other: '#AA96DA'
};

function Analytics({ analytics }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (analytics && analytics.categoryBreakdown) {
      const data = Object.entries(analytics.categoryBreakdown).map(([category, amount]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: parseFloat(amount),
        color: CATEGORY_COLORS[category]
      }));
      setChartData(data);
    }
  }, [analytics]);

  if (!analytics) {
    return null;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="analytics-container">
      <h2>
        <PieIcon size={24} />
        Monthly Analytics
      </h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>
            <DollarSign size={24} color="#1976d2" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Spent</p>
            <h3 className="stat-value">{formatCurrency(analytics.totalSpent)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3e5f5' }}>
            <Calendar size={24} color="#7b1fa2" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Average/Day</p>
            <h3 className="stat-value">{formatCurrency(analytics.averagePerDay)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>
            <TrendingUp size={24} color="#388e3c" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Transactions</p>
            <h3 className="stat-value">{analytics.expenseCount}</h3>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="chart-container">
          <h3>Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Analytics;