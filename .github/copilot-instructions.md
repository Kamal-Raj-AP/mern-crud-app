# MERN To-Do List App - Project Setup

## Project Overview
A full-stack MERN (MongoDB, Express, React, Node.js) to-do list application with complete CRUD functionality, responsive UI, and real-time updates.

## Setup Checklist

- [x] Project scaffolded with backend and frontend folders
- [x] Backend configured with Express, MongoDB, and API routes
- [x] Frontend created with React components and styling
- [x] All dependencies defined in package.json files
- [x] Environment configuration example provided (.env.example)
- [x] Comprehensive README with setup and API documentation
- [ ] Install dependencies for both backend and frontend
- [ ] Start MongoDB locally or configure Atlas connection
- [ ] Run backend server (npm run dev)
- [ ] Run frontend server (npm start)

## To Get Started

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Setup MongoDB:**
   - Option A: Use local MongoDB (ensure it's running)
   - Option B: Create a free cluster on MongoDB Atlas and update connection string

4. **Create .env file in backend folder:**
   ```
   MONGODB_URI=mongodb://localhost:27017/todoapp
   PORT=5000
   ```

5. **Start backend server:**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start frontend app (in a new terminal):**
   ```bash
   cd frontend
   npm start
   ```

## Features Implemented

- ✅ Full CRUD operations for todos
- ✅ Mark todos as complete/incomplete
- ✅ Add descriptions to todos
- ✅ View statistics (total, completed, pending)
- ✅ Modern, responsive UI with gradient design
- ✅ Error handling and loading states
- ✅ API routes for backend
- ✅ MongoDB schema with timestamps

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, CORS, Nodemon
**Frontend:** React, Axios, CSS3

## API Endpoints

- GET /api/todos - Get all todos
- GET /api/todos/:id - Get single todo
- POST /api/todos - Create new todo
- PUT /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo

## Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Next Steps

1. Install all dependencies with npm install in both folders
2. Configure MongoDB connection
3. Start the backend and frontend servers
4. Open http://localhost:3000 in your browser to use the app
