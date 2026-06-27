const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'todos.json');

async function ensureLocalStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, '[]', 'utf8');
  }
}

async function readLocalTodos() {
  await ensureLocalStore();
  const contents = await fs.readFile(dataFile, 'utf8');

  try {
    return JSON.parse(contents);
  } catch {
    return [];
  }
}

async function writeLocalTodos(todos) {
  await ensureLocalStore();
  await fs.writeFile(dataFile, JSON.stringify(todos, null, 2), 'utf8');
}

function normalizeTodo(todo) {
  return {
    _id: todo._id.toString ? todo._id.toString() : todo._id,
    title: todo.title,
    description: todo.description || '',
    completed: Boolean(todo.completed),
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt
  };
}

function sortTodos(todos) {
  return [...todos].sort((left, right) => new Date(right.updatedAt || right.createdAt) - new Date(left.updatedAt || left.createdAt));
}

async function getTodos() {
  if (mongoose.connection.readyState === 1) {
    const todos = await Todo.find().sort({ updatedAt: -1, createdAt: -1 });
    return todos.map(normalizeTodo);
  }

  return sortTodos(await readLocalTodos());
}

async function getTodoById(id) {
  if (mongoose.connection.readyState === 1) {
    const todo = await Todo.findById(id);
    return todo ? normalizeTodo(todo) : null;
  }

  const todos = await readLocalTodos();
  return todos.find((todo) => todo._id === id) || null;
}

async function createTodo(payload) {
  if (mongoose.connection.readyState === 1) {
    const savedTodo = await new Todo(payload).save();
    return normalizeTodo(savedTodo);
  }

  const todos = await readLocalTodos();
  const now = new Date().toISOString();
  const newTodo = {
    _id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: payload.title,
    description: payload.description || '',
    completed: false,
    createdAt: now,
    updatedAt: now
  };

  todos.unshift(newTodo);
  await writeLocalTodos(todos);
  return newTodo;
}

async function updateTodo(id, updates) {
  if (mongoose.connection.readyState === 1) {
    const todo = await Todo.findById(id);
    if (!todo) return null;

    if (typeof updates.title === 'string') todo.title = updates.title.trim();
    if (updates.description !== undefined) todo.description = updates.description;
    if (updates.completed !== undefined) todo.completed = updates.completed;

    const savedTodo = await todo.save();
    return normalizeTodo(savedTodo);
  }

  const todos = await readLocalTodos();
  const index = todos.findIndex((todo) => todo._id === id);

  if (index === -1) {
    return null;
  }

  const nextTodo = {
    ...todos[index],
    title: typeof updates.title === 'string' ? updates.title.trim() : todos[index].title,
    description: updates.description !== undefined ? updates.description : todos[index].description,
    completed: updates.completed !== undefined ? updates.completed : todos[index].completed,
    updatedAt: new Date().toISOString()
  };

  todos[index] = nextTodo;
  await writeLocalTodos(todos);
  return nextTodo;
}

async function deleteTodo(id) {
  if (mongoose.connection.readyState === 1) {
    return Todo.findByIdAndDelete(id);
  }

  const todos = await readLocalTodos();
  const filteredTodos = todos.filter((todo) => todo._id !== id);

  if (filteredTodos.length === todos.length) {
    return null;
  }

  await writeLocalTodos(filteredTodos);
  return true;
}

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};