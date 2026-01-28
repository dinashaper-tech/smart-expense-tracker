Smart Expense Tracker

A full-stack expense tracking application with AI-powered insights and analytics.

![Tech Stack](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)

##  Features

-  Track daily expenses with categories
-  Visual analytics with pie charts
-  Smart category suggestions
-  Responsive design
-  Clean Architecture implementation
-  Real-time updates

##  Tech Stack

**Frontend:**
- React 18 with Vite
- Recharts for data visualization
- Lucide React for icons
- Axios for API calls

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- Clean Architecture pattern
- RESTful API design

##  Project Structure
````
smart-expense-tracker/
├── backend/
│   ├── src/
│   │   ├── domain/           # Business entities & rules
│   │   ├── application/      # Use cases
│   │   ├── infrastructure/   # Database & external services
│   │   └── interface/        # Controllers & routes
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── services/         # API services
    │   └── App.jsx
    └── package.json