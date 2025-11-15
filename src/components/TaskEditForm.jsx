import React, { useState } from 'react';

const STATUSES = ['Todo', 'In Progress', 'Done'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function TaskEditForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title || '');
  const [discription, setDiscription] = useState(task.discription || '');
  const [status, setStatus] = useState(task.status || STATUSES[0]);
  const [priority, setPriority] = useState(task.priority || PRIORITIES[1]);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || '');
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  const submit = (e) => {
    e.preventDefault();
    onSave({
      title,
      discription,
      status,
      priority,
      assignedTo,
      dueDate,
    });
  };

  return (
    <form onSubmit={submit} className="board-form">
      <h2>Edit Task</h2>

      <div className="form-group">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input value={discription} onChange={(e) => setDiscription(e.target.value)} />
      </div>

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

      <div className="form-group">
        <label>Assigned To</label>
        <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">Save</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
