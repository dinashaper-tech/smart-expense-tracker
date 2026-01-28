const CreateExpenseUseCase = require('../../application/usecases/CreateExpenseUseCase');
const GetUserExpensesUseCase = require('../../application/usecases/GetUserExpensesUseCase');
const GetExpenseAnalyticsUseCase = require('../../application/usecases/GetExpenseAnalyticsUseCase');
const expenseRepository = require('../../infrastructure/repositories/ExpenseRepository');

// Controller: Handles HTTP requests and responses
class ExpenseController {
  constructor() {
    this.createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
    this.getUserExpensesUseCase = new GetUserExpensesUseCase(expenseRepository);
    this.getAnalyticsUseCase = new GetExpenseAnalyticsUseCase(expenseRepository);
  }

  // POST /api/expenses
  async createExpense(req, res) {
    try {
      const { amount, category, description, date } = req.body;
      const userId = req.headers['user-id'] || 'demo-user'; // Simple auth for demo

      const expense = await this.createExpenseUseCase.execute({
        userId,
        amount: parseFloat(amount),
        category,
        description,
        date: date ? new Date(date) : new Date()
      });

      res.status(201).json({
        success: true,
        data: expense
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/expenses
  async getExpenses(req, res) {
    try {
      const userId = req.headers['user-id'] || 'demo-user';
      const { startDate, endDate } = req.query;

      const expenses = await this.getUserExpensesUseCase.execute(userId, {
        startDate,
        endDate
      });

      res.json({
        success: true,
        data: expenses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/expenses/analytics
  async getAnalytics(req, res) {
    try {
      const userId = req.headers['user-id'] || 'demo-user';
      const month = parseInt(req.query.month) || new Date().getMonth() + 1;
      const year = parseInt(req.query.year) || new Date().getFullYear();

      const analytics = await this.getAnalyticsUseCase.execute(userId, month, year);

      res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // DELETE /api/expenses/:id
  async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      const deleted = await expenseRepository.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Expense not found'
        });
      }

      res.json({
        success: true,
        message: 'Expense deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new ExpenseController();