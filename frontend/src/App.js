import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  const API_URL = '/api/todos';

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos. Make sure backend is running on port 5000.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title, description) => {
    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, { title, description });
      setTodos((currentTodos) => [response.data, ...currentTodos]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo');
      console.error('Error adding todo:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updates);
      setTodos((currentTodos) => currentTodos.map((todo) => (todo._id === id ? response.data : todo)));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const toggleComplete = (id) => {
    const todo = todos.find(t => t._id === id);
    updateTodo(id, { completed: !todo.completed });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="App">
      <div className="page-shell">
        <header className="hero-card">
          <div>
            <p className="eyebrow">MERN Task Manager</p>
            <h1>Plan faster, finish sooner.</h1>
            <p className="hero-copy">A MongoDB-backed to-do app with smooth CRUD actions, live stats, and a cleaner workflow.</p>
          </div>
          <div className="hero-pill">Connected to Atlas</div>
        </header>

        <section className="stats-grid" aria-label="todo statistics">
          <div className="stat-card">
            <span>Total</span>
            <strong>{todos.length}</strong>
          </div>
          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
          <div className="stat-card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </section>

        <main className="container">
          <div className="toolbar">
            <h2>Your Tasks</h2>
            <div className="filter-group" role="tablist" aria-label="Todo filters">
              {['all', 'active', 'completed'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={filter === option ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        
          {error && <div className="error-message">{error}</div>}

          <TodoForm onAddTodo={addTodo} submitting={submitting} />

          {loading ? (
            <div className="loading">Loading todos...</div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggleComplete={toggleComplete}
              onDeleteTodo={deleteTodo}
              emptyMessage={filter === 'all' ? 'No todos yet. Add your first task.' : 'No todos match this filter.'}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
