import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAddTodo, submitting = false }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a todo title');
      return;
    }

    await onAddTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
      </div>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Add description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Saving...' : '+ Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
