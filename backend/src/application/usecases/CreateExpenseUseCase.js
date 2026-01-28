const Expense = require('../../domain/entities/Expense');

// Use Case: Contains application-specific business logic
class CreateExpenseUseCase {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(expenseData) {
    // Create domain entity
    const expense = new Expense(expenseData);
    
    // Validate business rules
    expense.validate();
    
    // Persist to database via repository
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