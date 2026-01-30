const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/ExpenseController');
const authMiddleware = require('../middleware/authMiddleware');

console.log(' Expense routes loaded');

// All expense routes require authentication
router.use(authMiddleware);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 25.50
 *               category:
 *                 type: string
 *                 enum: [food, transport, entertainment, utilities, healthcare, other]
 *                 example: food
 *               description:
 *                 type: string
 *                 example: Lunch at cafe
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-29
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 */
router.post('/expenses', (req, res) => {
  console.log('POST /expenses route hit');
  expenseController.createExpense(req, res);
});

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses for the authenticated user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter expenses from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter expenses until this date
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses', (req, res) => {
  console.log('GET /expenses route hit');
  expenseController.getExpenses(req, res);
});

/**
 * @swagger
 * /expenses/analytics:
 *   get:
 *     summary: Get expense analytics for a specific month
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (1-12)
 *         example: 1
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year
 *         example: 2026
 *     responses:
 *       200:
 *         description: Analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Analytics'
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses/analytics', (req, res) => {
  console.log('GET /expenses/analytics route hit');
  expenseController.getAnalytics(req, res);
});

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/expenses/:id', (req, res) => {
  console.log('DELETE /expenses/:id route hit');
  expenseController.deleteExpense(req, res);
});

module.exports = router;