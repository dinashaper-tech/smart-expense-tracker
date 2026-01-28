// Use Case: Retrieve user expenses with optional filtering
class GetUserExpensesUseCase {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(userId, filters = {}) {
    const { startDate, endDate } = filters;

    // If date range provided, filter by date
    if (startDate && endDate) {
      return await this.expenseRepository.findByDateRange(
        userId,
        new Date(startDate),
        new Date(endDate)
      );
    }

    // Otherwise, get all expenses
    return await this.expenseRepository.findByUserId(userId);
  }
}

module.exports = GetUserExpensesUseCase;