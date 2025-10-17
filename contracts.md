# API Contracts & Backend Integration Guide

## Overview
This document outlines the API contracts, database models, and integration plan for the Cybersecurity Training Platform (Compensar Fundación Universitaria).

**Tech Stack:**
- Frontend: React with React Router, Tailwind CSS, shadcn/ui
- Backend: FastAPI (Python)
- Database: **PostgreSQL (NeonDB)** - User to provide connection
- Authentication: JWT tokens

---

## 1. Database Models (PostgreSQL)

### User Model
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Lesson Progress Model (Optional - Track user progress)
```sql
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Test Results Model (Optional - Track test scores)
```sql
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    answers JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
**Purpose:** Create a new user account

**Request Body:**
```json
{
  "nombre": "Olivia Jiménez",
  "email": "hello@ucompensar.edu.co",
  "password": "securePassword123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "nombre": "Olivia Jiménez",
    "email": "hello@ucompensar.edu.co"
  },
  "token": "jwt-token-here"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

#### POST /api/auth/login
**Purpose:** Authenticate user and return JWT token

**Request Body:**
```json
{
  "email": "hello@ucompensar.edu.co",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "nombre": "Olivia Jiménez",
    "email": "hello@ucompensar.edu.co"
  },
  "token": "jwt-token-here"
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

#### GET /api/auth/me
**Purpose:** Get current user profile (requires JWT token)

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Response (Success - 200):**
```json
{
  "id": "uuid-here",
  "nombre": "Olivia Jiménez",
  "email": "hello@ucompensar.edu.co"
}
```

---

### Optional: Progress Tracking Endpoints

#### POST /api/progress/lesson
**Purpose:** Mark a lesson as completed

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "lesson_id": "1",
  "completed": true
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Lesson progress saved"
}
```

---

#### POST /api/progress/test
**Purpose:** Save test results

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "score": 4,
  "total_questions": 5,
  "answers": {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 1,
    "4": 1
  }
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Test results saved",
  "result_id": "uuid-here"
}
```

---

## 3. Mock Data Currently Used (to be replaced)

### Location: `/app/frontend/src/mock.js`

**Mock User:**
```javascript
{
  id: '1',
  nombre: 'Olivia Jiménez',
  email: 'hello@ucompensar.edu.co',
  token: 'mock-jwt-token-123456'
}
```

**Mock Resources:** (Static data - no backend needed)
- 3 resource categories with topics
- These will remain as static frontend data

**Mock Lessons:** (Static data - no backend needed)
- 2 lessons with YouTube video URLs and descriptions
- These will remain as static frontend data

**Mock Questions:** (Static data - no backend needed)
- 5 cybersecurity quiz questions
- These will remain as static frontend data

---

## 4. Frontend-Backend Integration Points

### AuthContext (`/app/frontend/src/context/AuthContext.js`)

**Current Mock Functions to Replace:**

1. **login() function** (Line 23-35)
```javascript
// TODO: Replace with actual API call
const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { 
  email, 
  password 
});
const { user, token } = response.data;
setUser(user);
localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('token', token);
return { success: true, user };
```

2. **register() function** (Line 39-51)
```javascript
// TODO: Replace with actual API call
const response = await axios.post(`${BACKEND_URL}/api/auth/register`, { 
  nombre, 
  email, 
  password 
});
const { user, token } = response.data;
setUser(user);
localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('token', token);
return { success: true, user };
```

3. **Token storage:**
- Store JWT token in localStorage: `localStorage.setItem('token', token)`
- Include token in all authenticated requests: 
  ```javascript
  headers: { Authorization: `Bearer ${token}` }
  ```

---

## 5. Backend Implementation Steps

### Step 1: Database Setup
1. User provides PostgreSQL connection string from NeonDB
2. Add connection string to `/app/backend/.env`:
   ```
   POSTGRES_URL=postgresql://user:password@host:port/dbname
   ```
3. Install PostgreSQL dependencies:
   ```bash
   pip install psycopg2-binary asyncpg databases
   ```

### Step 2: Create Database Models
1. Create `/app/backend/models/user.py` with User model using SQLAlchemy
2. Create database initialization script
3. Run migrations to create tables

### Step 3: Implement Authentication
1. Create `/app/backend/routers/auth.py`:
   - POST /api/auth/register - Hash passwords with bcrypt
   - POST /api/auth/login - Verify password, generate JWT token
   - GET /api/auth/me - Validate token, return user profile

2. JWT Configuration:
   - Use python-jose for JWT tokens
   - Set expiration time (e.g., 7 days)
   - Store JWT secret in environment variables

### Step 4: Update Frontend Integration
1. Replace mock functions in `AuthContext.js` with actual API calls
2. Add axios interceptor for JWT token in headers
3. Handle token expiration and refresh logic

### Step 5: Optional - Progress Tracking
1. Create `/app/backend/routers/progress.py`
2. Implement lesson progress and test results endpoints
3. Update frontend to call these endpoints when:
   - User completes a lesson
   - User finishes a test

---

## 6. Environment Variables

### Backend (`/app/backend/.env`)
```env
# Database (User to provide)
POSTGRES_URL=postgresql://user:password@host:port/dbname

# JWT Configuration
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_DAYS=7

# CORS (already configured)
ALLOWED_ORIGINS=*
```

### Frontend (`/app/frontend/.env`)
```env
# Backend URL (already configured - DO NOT MODIFY)
REACT_APP_BACKEND_URL=http://your-backend-url
```

---

## 7. Testing Checklist

### Authentication Flow:
- [ ] User can register with name, email, password
- [ ] Passwords are hashed before storing
- [ ] User can login with email and password
- [ ] JWT token is returned and stored
- [ ] Token is included in authenticated requests
- [ ] Protected routes redirect to login if not authenticated
- [ ] User can logout and token is cleared

### Optional Features:
- [ ] Lesson progress is saved to database
- [ ] Test results are saved to database
- [ ] User can view their test history

---

## 8. Static Content (No Backend Needed)

The following data remains as static frontend data:
- **Resources:** 3 categories (Introduction, Threats, Best Practices)
- **Lessons:** 2 lessons with YouTube videos
- **Questions:** 5 quiz questions with answers

These are educational content and don't require database storage unless you want to make them dynamic in the future.

---

## Summary

**What's Currently Mocked:**
- User authentication (login/register)
- User data stored in localStorage only

**What Needs Backend:**
- User registration with password hashing
- User login with JWT tokens
- User profile retrieval

**What Remains Static:**
- All educational content (resources, lessons, questions)
- These can be made dynamic later if needed

**Next Steps:**
1. User provides PostgreSQL connection string
2. Implement authentication endpoints in backend
3. Replace mock functions in AuthContext
4. Test authentication flow
5. (Optional) Add progress tracking features
