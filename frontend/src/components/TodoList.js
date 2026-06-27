import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleComplete, onDeleteTodo, emptyMessage = '🎉 No todos yet! Add one to get started.' }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
