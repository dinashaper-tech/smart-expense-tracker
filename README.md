💰 Smart Expense Tracker - Full Stack Application

[](images/Swagger.png)

A comprehensive full-stack expense tracking application with user authentication, real-time analytics, and AI-powered insights. Track your spending, visualize patterns, and make informed financial decisions.

🔧 [Backend](#-backend---nodejs--express) | 🖥️ [Frontend](#-frontend---react) | 📚 [API Documentation](#-api-documentation)

---

## 🔧 Backend - Node.js + Express

**RESTful API** built with **Node.js**, **Express**, and **MongoDB**, following **Clean Architecture** principles.

### ⚙️ Backend Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication & Authorization
- **bcryptjs** - Password hashing
- **Swagger** - API Documentation
- **Clean Architecture** - Separation of concerns
- **Repository Pattern** - Data access abstraction

### 📋 Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### 📁 Clone the Repository
```bash
git https://github.com/dinashaper-tech/smart-expense-tracker.git
cd smart-expense-tracker/backend
```

### 🏗️ Project Structure: Clean Architecture
```
backend/
│
├── src/
│   ├── config/                     ← Configuration
│   │   └── swagger.js
│   │
│   ├── domain/                     ← Domain Layer (Entities)
│   │   └── entities/
│   │       └── Expense.js
│   │
│   ├── application/                ← Application Layer (Use Cases)
│   │   └── usecases/
│   │       ├── CreateExpenseUseCase.js
│   │       ├── GetUserExpensesUseCase.js
│   │       ├── GetExpenseAnalyticsUseCase.js
│   │       ├── RegisterUserUseCase.js
│   │       └── LoginUserUseCase.js
│   │
│   ├── infrastructure/             ← Infrastructure Layer (Database, External Services)
│   │   ├── database/
│   │   │   ├── models/
│   │   │   │   ├── ExpenseModel.js
│   │   │   │   └── UserModel.js
│   │   │   └── mongodb.js
│   │   └── repositories/
│   │       ├── ExpenseRepository.js
│   │       └── UserRepository.js
│   │
│   ├── interface/                  ← Interface Layer (Controllers, Routes, Middleware)
│   │   ├── controllers/
│   │   │   ├── ExpenseController.js
│   │   │   └── AuthController.js
│   │   ├── routes/
│   │   │   ├── expenseRoutes.js
│   │   │   └── authRoutes.js
│   │   └── middleware/
│   │       └── authMiddleware.js
│   │
│   └── server.js                   ← Entry Point
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

[](images/LogIn.png)

### 🛠️ Environment Setup

Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this
```

**Get MongoDB URI:**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string and replace credentials

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
[](images/SignUp.png)
### 🚀 Run the Backend
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production
npm start
```

Server will run at: `http://localhost:5000`

API Documentation: `http://localhost:5000/api-docs`

### 🌐 API Endpoints

#### **Authentication**
| Method | Endpoint          | Description              | Auth Required |
|--------|-------------------|--------------------------|---------------|
| POST   | `/api/auth/register` | Register new user     | ❌            |
| POST   | `/api/auth/login`    | Login user            | ❌            |
| GET    | `/api/auth/me`       | Get current user info | ✅            |

#### **Expenses**
| Method | Endpoint                  | Description                    | Auth Required |
|--------|---------------------------|--------------------------------|---------------|
| GET    | `/api/expenses`           | Get all user expenses          | ✅            |
| POST   | `/api/expenses`           | Create new expense             | ✅            |
| DELETE | `/api/expenses/:id`       | Delete expense                 | ✅            |
| GET    | `/api/expenses/analytics` | Get spending analytics (monthly) | ✅          |

### 📊 Request/Response Examples

**Register User:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Create Expense:**
```json
POST /api/expenses
Headers: { "Authorization": "Bearer " }
{
  "amount": 25.50,
  "category": "food",
  "description": "Lunch at cafe",
  "date": "2026-01-30"
}

Response:
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "amount": 25.50,
    "category": "food",
    "description": "Lunch at cafe",
    "date": "2026-01-30T00:00:00.000Z"
  }
}
```

---

## 🖥️ Frontend - React

**Single Page Application** built with **React**, **Vite**, and **Recharts** for data visualization.

### ⚙️ Frontend Technologies
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Context API** - State management

### 📦 Prerequisites
- Node.js (v18+)
- npm or yarn

### 🏗️ Project Structure
```
frontend/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── components/              ← Reusable Components
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseForm.css
│   │   ├── ExpenseList.jsx
│   │   ├── ExpenseList.css
│   │   ├── Analytics.jsx
│   │   ├── Analytics.css
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/                   ← Page Components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Auth.css
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   │
│   ├── context/                 ← State Management
│   │   └── AuthContext.jsx
│   │
│   ├── services/                ← API Services
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

### 🛠️ Environment Setup

Create `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 🚀 Run the Frontend
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Frontend will run at: `http://localhost:5173`

### 🔗 Connecting to Backend

The frontend automatically connects to the backend URL specified in `.env` file. Ensure:
1. Backend is running on `http://localhost:5000`
2. `VITE_API_URL` is set correctly in `.env`
3. CORS is enabled on the backend

---
[](images/Dashboard.png)
[](images/Analysis.png)
## 🎨 Features

### ✅ User Authentication
- 🔐 Secure registration with password hashing
- 🔑 JWT-based authentication
- 👤 User-specific data isolation
- 🚪 Protected routes

### 💰 Expense Management
- ➕ Add expenses with amount, category, description, and date
- 📋 View all expenses in organized list
- 🗑️ Delete expenses with confirmation
- 🏷️ Categorize expenses (Food, Transport, Entertainment, Utilities, Healthcare, Other)

### 📊 Analytics Dashboard
- 💵 Total spending for the month
- 📅 Average spending per day
- 🔢 Number of transactions
- 📈 Category-wise breakdown with interactive pie chart
- 🎨 Color-coded categories for easy visualization

### 🎯 Additional Features
- 📱 Responsive design for mobile and desktop
- ⚡ Real-time updates
- 🎨 Modern gradient UI
- 🔄 Auto-refresh on data changes
- ❌ Error handling with user-friendly messages
- ⏳ Loading states for better UX

---

## 📚 API Documentation

Interactive API documentation is available via **Swagger UI**.

**Access Swagger:** `http://localhost:5000/api-docs`

### How to Use Swagger:

1. **Test Authentication:**
   - Expand `POST /auth/register` or `POST /auth/login`
   - Click "Try it out"
   - Fill in the request body
   - Click "Execute"
   - Copy the JWT token from response

2. **Authorize:**
   - Click the **"Authorize"** button (🔓) at the top
   - Paste your JWT token
   - Click "Authorize"

3. **Test Protected Endpoints:**
   - All expense endpoints will now include your authentication token
   - Try creating, reading, and deleting expenses

---

## 🧪 Testing

### Manual Testing Workflow

1. **Register a new user** → Should redirect to login
2. **Login with credentials** → Should redirect to dashboard
3. **View empty state** → Should show "No expenses yet"
4. **Add an expense** → Should appear in list and update analytics
5. **Add more expenses** → Analytics should recalculate
6. **Logout** → Should clear session
7. **Login as different user** → Should see only their expenses

### Expected Behavior

- ✅ Each user sees only their own expenses
- ✅ Analytics updates in real-time
- ✅ Pie chart shows category breakdown
- ✅ Expenses are sorted by date (newest first)
- ✅ Token expires after 7 days

---

## 🔐 Security Features

- 🔒 **Password Hashing:** bcrypt with salt rounds
- 🎫 **JWT Tokens:** Secure, stateless authentication
- 🛡️ **Protected Routes:** Middleware authentication
- 🚫 **Input Validation:** Server-side validation
- 🔐 **CORS:** Cross-origin resource sharing enabled
- 📝 **Environment Variables:** Sensitive data in `.env`

---

## 🗂️ Clean Architecture Layers

### 1️⃣ **Domain Layer** (Business Logic)
- Pure business entities (Expense, User)
- Business rules and validation
- Framework-independent

### 2️⃣ **Application Layer** (Use Cases)
- Application-specific business logic
- Orchestrates data flow
- Uses repositories to interact with data

### 3️⃣ **Infrastructure Layer** (Database & External Services)
- Database implementation (MongoDB)
- Repository implementations
- External API integrations

### 4️⃣ **Interface Layer** (Controllers & Routes)
- HTTP request handling
- Route definitions
- Middleware (authentication)


## 🛠️ Future Enhancements

- [ ] AI-powered category suggestions
- [ ] Budget setting and alerts
- [ ] Recurring expenses
- [ ] Export data (CSV, PDF)
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Receipt upload and OCR
- [ ] Spending trends and predictions

---

## 📝 License

MIT License - feel free to use this project for your portfolio!

---

## 👨‍💻 Creator

**Dinasha Perera**  
Software Engineer | Developer | Tech Enthusiast
[LinkedIn](https://www.linkedin.com/in/dinasha-perera/)

---

## 🙏 Acknowledgments

- Clean Architecture principles by Robert C. Martin
- MongoDB for database
- Swagger for API documentation
- Recharts for data visualization

---

**⭐ If you found this project helpful, please consider giving it a star!**

This project demonstrates full-stack development skills including:
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Clean Architecture
- ✅ Repository Pattern
- ✅ React with hooks
- ✅ State management
- ✅ Database design
- ✅ API documentation
- ✅ Responsive design
- ✅ Error handling