class GetExpenseAnalyticsUseCase {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(userId, month, year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const expenses = await this.expenseRepository.findByDateRange(userId, startDate, endDate);

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const avgPerDay = totalSpent / new Date(year, month, 0).getDate();

    return {
      totalSpent: totalSpent.toFixed(2),
      expenseCount: expenses.length,
      categoryBreakdown,
      averagePerDay: avgPerDay.toFixed(2),
      period: { month, year }
    };
  }
}

module.exports = GetExpenseAnalyticsUseCase;