const ExpenseModel = require('../database/models/ExpenseModel');
const Expense = require('../../domain/entities/Expense');

// Repository: Handles all database operations
class ExpenseRepository {
  
  // Create new expense
  async create(expenseData) {
    const expenseDoc = new ExpenseModel(expenseData);
    const saved = await expenseDoc.save();
    return this._mapToEntity(saved);
  }

  // Find all expenses for a user
  async findByUserId(userId) {
    const expenses = await ExpenseModel.find({ userId }).sort({ date: -1 });
    return expenses.map(exp => this._mapToEntity(exp));
  }

  // Find expense by ID
  async findById(id) {
    const expense = await ExpenseModel.findById(id);
    return expense ? this._mapToEntity(expense) : null;
  }

  // Update expense
  async update(id, updateData) {
    const updated = await ExpenseModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return updated ? this._mapToEntity(updated) : null;
  }

  // Delete expense
  async delete(id) {
    const result = await ExpenseModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Get expenses by date range
  async findByDateRange(userId, startDate, endDate) {
    const expenses = await ExpenseModel.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });
    return expenses.map(exp => this._mapToEntity(exp));
  }

  // Map database model to domain entity
  _mapToEntity(doc) {
    return new Expense({
      id: doc._id.toString(),
      userId: doc.userId,
      amount: doc.amount,
      category: doc.category,
      description: doc.description,
      date: doc.date,
      createdAt: doc.createdAt
    });
  }
}

module.exports = new ExpenseRepository();