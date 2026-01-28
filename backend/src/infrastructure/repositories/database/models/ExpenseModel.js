const mongoose = require('mongoose');

// Database schema - infrastructure layer
const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true // Optimize queries by userId
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'transport', 'entertainment', 'utilities', 'healthcare', 'other']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

module.exports = mongoose.model('Expense', expenseSchema);