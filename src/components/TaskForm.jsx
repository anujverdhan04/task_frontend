import React, { useState } from 'react';

const STATUSES = ['Todo', 'In Progress', 'Done'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function TaskForm({ onAdd, placeholder = 'Task title...' }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [status, setStatus] = useState(STATUSES[0]);
  const [priority, setPriority] = useState(PRIORITIES[1]);
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      discription,
      status,
      priority,
      assignedTo,
      dueDate,
    });

    // Reset form
    setTitle('');
    setDiscription('');
    setStatus(STATUSES[0]);
    setPriority(PRIORITIES[1]);
    setAssignedTo('');
    setDueDate('');
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button
        className="btn-add-task"
        onClick={() => setShowForm(true)}
        style={{
          width: '100%',
          padding: '12px',
          background: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          marginBottom: '24px',
        }}
      >
        + Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
      <div style={{
        background: '#fff',
        padding: '16px',
        borderRadius: '6px',
        border: '1px solid #bdc3c7',
      }}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="Task details..."
            rows="3"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #bdc3c7' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div className="form-group">
            <label>Assigned To</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Developer name"
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            className="btn-submit"
            style={{ flex: 1 }}
          >
            Create Task
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => setShowForm(false)}
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
