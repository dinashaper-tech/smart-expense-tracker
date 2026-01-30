const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Expense Tracker API',
      version: '1.0.0',
      description: 'A comprehensive expense tracking API with user authentication and analytics',

    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'your-JWT-token-here ',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (min 6 characters)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
            },
          },
        },
        Expense: {
          type: 'object',
          required: ['amount', 'category', 'description'],
          properties: {
            id: {
              type: 'string',
              description: 'Expense ID',
            },
            userId: {
              type: 'string',
              description: 'User ID who created the expense',
            },
            amount: {
              type: 'number',
              format: 'float',
              description: 'Expense amount in USD',
              example: 25.50,
            },
            category: {
              type: 'string',
              enum: ['food', 'transport', 'entertainment', 'utilities', 'healthcare', 'other'],
              description: 'Expense category',
            },
            description: {
              type: 'string',
              description: 'Expense description',
              example: 'Lunch at cafe',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Expense date',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation timestamp',
            },
          },
        },
        Analytics: {
          type: 'object',
          properties: {
            totalSpent: {
              type: 'number',
              description: 'Total amount spent',
            },
            expenseCount: {
              type: 'number',
              description: 'Number of expenses',
            },
            categoryBreakdown: {
              type: 'object',
              description: 'Spending breakdown by category',
            },
            averagePerDay: {
              type: 'number',
              description: 'Average spending per day',
            },
            period: {
              type: 'object',
              properties: {
                month: {
                  type: 'number',
                },
                year: {
                  type: 'number',
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/interface/routes/*.js'], // Path to API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;