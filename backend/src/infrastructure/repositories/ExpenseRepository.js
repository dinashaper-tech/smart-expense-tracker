const ExpenseModel = require('../database/models/ExpenseModel');
const Expense = require('../../domain/entities/Expense');
const bcrypt = require('bcryptjs');

class ExpenseRepository {
  
  // Create new expense
  async create(expenseData) {
    try {
      const expenseDoc = new ExpenseModel(expenseData);
      const saved = await expenseDoc.save();
      console.log(' Expense created:', saved); 
      return this._mapToEntity(saved);
    } catch (error) {
      console.error(' Error creating expense:', error);
      throw error;
    }
  }

  // Find all expenses for a user
  async findByUserId(userId) {
    console.log('Repository: Finding expenses for userId:', userId);
    const expenses = await ExpenseModel.find({ userId }).sort({ date: -1 });
    console.log('Repository: Found', expenses.length, 'expenses');
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
    console.log(` Query: userId=${userId}, start=${startDate}, end=${endDate}`); 
    
    const expenses = await ExpenseModel.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });
    
    console.log(`Found ${expenses.length} expenses in date range`); 
    
    if (expenses.length > 0) {
      console.log('Sample expense dates:', expenses.slice(0, 3).map(e => ({
        date: e.date,
        amount: e.amount,
        category: e.category
      }))); 
    }
    
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