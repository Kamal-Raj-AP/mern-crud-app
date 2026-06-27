const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

async function startServer() {
  let connected = false;

  try {
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not set');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
    connected = true;
  } catch (err) {
    console.warn('MongoDB connection error:', err.message);
    console.warn('Starting server with local fallback storage so the app can still run.');
  }

  app.locals.dataMode = connected ? 'mongodb' : 'local-fallback';

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (${app.locals.dataMode})`);
  });
}

// Routes
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    dataMode: app.locals.dataMode || 'unknown'
  });
});

startServer();
