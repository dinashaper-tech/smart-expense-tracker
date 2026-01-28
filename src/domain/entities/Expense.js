class Expense {
  constructor({ id, userId, amount, category, description, date, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.category = category;
    this.description = description;
    this.date = date || new Date();
    this.createdAt = createdAt || new Date();
  }

  validate() {
    if (this.amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    if (!this.description || this.description.trim() === '') {
      throw new Error('Description is required');
    }
    return true;
  }

  isRecent() {
    const daysDiff = (new Date() - new Date(this.date)) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  }
}

module.exports = Expense;