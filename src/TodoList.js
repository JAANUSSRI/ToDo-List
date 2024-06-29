import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, filter, onToggleDone }) => {
  const getVisibleTodos = () => {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'done') {
      return todos.filter((todo) => todo.done);
    } else {
      return todos.filter((todo) => !todo.done);
    }
  };

  return (
    <ul>
      {getVisibleTodos().map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleDone={() => {
            const updatedTodos = todos.map((t) => (t._id === todo._id ? { ...t, done: !t.done } : t));
            onToggleDone(updatedTodos);
          }}
        />
      ))}
    </ul>
  );
};

export default TodoList;