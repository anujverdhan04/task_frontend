import React from 'react';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) return <div className="empty-state"><p>No tasks yet. Create one to get started!</p></div>;
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className={todo.status === 'Done' ? 'done' : ''}>
          <label>
            <input type="checkbox" checked={todo.status === 'Done'} onChange={(e) => onToggle(todo._id, e.target.checked)} />
            <span>{todo.title}</span>
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="del" onClick={() => onEdit(todo)}>Edit</button>
            <button className="del" onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
