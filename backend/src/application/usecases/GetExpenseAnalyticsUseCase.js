// Use Case: Calculate spending analytics
class GetExpenseAnalyticsUseCase {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(userId, month, year) {
    console.log(` Analytics requested for user: ${userId}, month: ${month}, year: ${year}`); 

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    console.log(` Date range: ${startDate} to ${endDate}`); 

    const expenses = await this.expenseRepository.findByDateRange(
      userId,
      startDate,
      endDate
    );

    console.log(` Found ${expenses.length} expenses for analytics`); 
    console.log('Expenses:', expenses.map(e => ({ 
      amount: e.amount, 
      category: e.category, 
      date: e.date 
    }))); 

    // Calculate analytics
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const daysInMonth = new Date(year, month, 0).getDate();
    const avgPerDay = expenses.length > 0 ? totalSpent / daysInMonth : 0;

    const result = {
      totalSpent: parseFloat(totalSpent.toFixed(2)),
      expenseCount: expenses.length,
      categoryBreakdown,
      averagePerDay: parseFloat(avgPerDay.toFixed(2)),
      period: { month, year }
    };

    console.log('Analytics result:', result); 
    return result;
  }
}

module.exports = GetExpenseAnalyticsUseCase;