class GetUserExpensesUseCase {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(userId, filters = {}) {
    const { startDate, endDate } = filters;

    if (startDate && endDate) {
      return await this.expenseRepository.findByDateRange(userId, new Date(startDate), new Date(endDate));
    }

    return await this.expenseRepository.findByUserId(userId);
  }
}

module.exports = GetUserExpensesUseCase;