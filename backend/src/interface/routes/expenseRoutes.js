const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/ExpenseController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('Expense routes loaded'); 

// ALL expense routes require authentication
router.use(authMiddleware); 

router.post('/expenses', (req, res) => {
  console.log('POST /expenses route hit'); 
  expenseController.createExpense(req, res);
});

router.get('/expenses', (req, res) => {
  console.log('GET /expenses route hit'); 
  expenseController.getExpenses(req, res);
});

router.get('/expenses/analytics', (req, res) => {
  console.log('GET /expenses/analytics route hit');
  expenseController.getAnalytics(req, res);
});

router.delete('/expenses/:id', (req, res) => {
  console.log('DELETE /expenses/:id route hit'); 
  expenseController.deleteExpense(req, res);
});

module.exports = router;