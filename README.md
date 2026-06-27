# MERN Stack To-Do List Application

A full-stack to-do list application built with MongoDB, Express, React, and Node.js.

## Features

- ✅ Create, Read, Update, Delete (CRUD) todos
- ✅ Mark todos as complete/incomplete
- ✅ Add descriptions to todos
- ✅ View statistics (total, completed, pending)
- ✅ Responsive UI with modern design
- ✅ Real-time data updates

## Project Structure

```
.
├── backend/              # Node.js + Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Express server entry point
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
└── frontend/            # React frontend
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # React components
    │   ├── App.js       # Main app component
    │   └── index.js     # React entry point
    └── package.json     # Frontend dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas connection string)

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
```

Or use MongoDB Atlas:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will open automatically at `http://localhost:3000`

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Example Request Bodies

### Create Todo
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Update Todo
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true
}
```

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Technologies Used

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Auto-restart on file changes
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## Troubleshooting

### Backend won't connect to MongoDB
- Ensure MongoDB is running locally or check your connection string
- For MongoDB Atlas, whitelist your IP address

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check the `proxy` setting in `frontend/package.json`
- Check browser console for CORS errors

### Port already in use
- Change `PORT` in backend `.env` file
- Or kill the process using the port

## Future Enhancements

- Add user authentication
- Add todo categories/tags
- Add due dates and reminders
- Add priority levels
- Add dark mode
- Add search and filter functionality
- Add todo sharing between users

## License

ISC
