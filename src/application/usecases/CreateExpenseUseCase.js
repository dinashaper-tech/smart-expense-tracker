const Expense = require('../../domain/entities/Expense');

class CreateExpenseUseCase {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(expenseData) {
    const expense = new Expense(expenseData);
    expense.validate();
    
    const savedExpense = await this.expenseRepository.create({
      userId: expense.userId,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date
    });

    return savedExpense;
  }
}

module.exports = CreateExpenseUseCase;