import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  const createdDate = todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'Just now';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDeleteTodo(todo._id);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          type="button"
          className={todo.completed ? 'todo-checkbox checked' : 'todo-checkbox'}
          onClick={() => onToggleComplete(todo._id)}
          aria-label={todo.completed ? 'Mark todo as incomplete' : 'Mark todo as complete'}
        >
          {todo.completed ? '✓' : ''}
        </button>
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <small className="todo-date">
            {createdDate}
          </small>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="delete-btn"
        title="Delete todo"
      >
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;
