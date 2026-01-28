const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/ExpenseController');

// Define routes
router.post('/expenses', (req, res) => expenseController.createExpense(req, res));
router.get('/expenses', (req, res) => expenseController.getExpenses(req, res));
router.get('/expenses/analytics', (req, res) => expenseController.getAnalytics(req, res));
router.delete('/expenses/:id', (req, res) => expenseController.deleteExpense(req, res));

module.exports = router;