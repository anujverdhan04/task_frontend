import React, { useState } from 'react';

export default function TodoForm({ onAdd, placeholder = 'Add a task...' }) {
  const [value, setValue] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };
  return (
    <form onSubmit={submit} className="todo-form">
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        placeholder={placeholder} 
      />
      <button type="submit">Add</button>
    </form>
  );
}
