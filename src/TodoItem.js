import React from 'react';

const TodoItem = ({ todo, onToggleDone }) => {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggleDone(todo._id)}
        />
        <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
        <div className="todo-actions">
          <button onClick={() => { /* Implement edit functionality */ }}>Edit</button>
          <button onClick={() => { /* Implement delete functionality */ }}>Delete</button>
        </div>
      </div>
    );
  };
  
  export default TodoItem;