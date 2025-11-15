import React, { useState } from 'react';

const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];

export default function BoardForm({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), color);
    setName('');
    setColor(COLORS[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="board-form">
      <h2>Create New Board</h2>
      <div className="form-group">
        <label>Board Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Frontend Tasks"
          autoFocus
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="color-picker">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-option ${color === c ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Create
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
