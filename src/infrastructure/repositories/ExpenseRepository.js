const ExpenseModel = require('../database/models/ExpenseModel');
const Expense = require('../../domain/entities/Expense');

class ExpenseRepository {
  async create(expenseData) {
    const expenseDoc = new ExpenseModel(expenseData);
    const saved = await expenseDoc.save();
    return this._mapToEntity(saved);
  }

  async findByUserId(userId) {
    const expenses = await ExpenseModel.find({ userId }).sort({ date: -1 });
    return expenses.map(exp => this._mapToEntity(exp));
  }

  async findById(id) {
    const expense = await ExpenseModel.findById(id);
    return expense ? this._mapToEntity(expense) : null;
  }

  async update(id, updateData) {
    const updated = await ExpenseModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    return updated ? this._mapToEntity(updated) : null;
  }

  async delete(id) {
    const result = await ExpenseModel.findByIdAndDelete(id);
    return result !== null;
  }

  async findByDateRange(userId, startDate, endDate) {
    const expenses = await ExpenseModel.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });
    return expenses.map(exp => this._mapToEntity(exp));
  }

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