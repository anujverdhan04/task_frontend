import React, { useEffect, useState } from 'react';
import api from './api';
import SideNav from './components/SideNav';
import TodoList from './components/TodoList';
import TaskForm from './components/TaskForm';
import BoardForm from './components/BoardForm';
import TaskEditForm from './components/TaskEditForm';

export default function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBoardForm, setShowBoardForm] = useState(false);

  // Load boards on mount
  useEffect(() => {
    loadBoards();
  }, []);

  // Load todos when board is selected
  useEffect(() => {
    if (selectedBoardId) {
      loadTodos();
    }
  }, [selectedBoardId]);

  const loadBoards = async () => {
    try {
      const res = await api.get('/apib/boards');
      setBoards(res.data);
      if (res.data.length > 0 && !selectedBoardId) {
        setSelectedBoardId(res.data[0]._id);
      }
    } catch (err) {
      console.error('Failed to load boards', err);
    }
  };

  const loadTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/apit/boards/${selectedBoardId}/tasks`);
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to load todos', err);
    }
    setLoading(false);
  };

  const addBoard = async (name, color) => {
    try {
      const res = await api.post('/apib/boards', { name, color });
      setBoards((b) => [res.data, ...b]);
      setSelectedBoardId(res.data._id);
      setShowBoardForm(false);
    } catch (err) {
      console.error('Failed to create board', err);
    }
  };

  const addTodo = async (taskData) => {
    if (!selectedBoardId) return;
    try {
      const payload = {
        ...taskData,
        boardId: selectedBoardId,
      };
      const res = await api.post(`/apit/boards/${selectedBoardId}/tasks`, payload);
      setTodos((t) => [res.data, ...t]);
    } catch (err) {
      console.error('Failed to create task', err);
      alert('Failed to create task: ' + (err.response?.data?.error || err.message));
    }
  };

  // Edit flow
  const [editingTask, setEditingTask] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const openEdit = (task) => {
    setEditingTask(task);
    setShowEditForm(true);
  };

  const saveEdit = async (updates) => {
    if (!editingTask) return;
    try {
      const res = await api.put(`/apit/tasks/${editingTask._id}`, updates);
      setTodos((t) => t.map(x => x._id === editingTask._id ? res.data : x));
      setShowEditForm(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to save task update', err);
    }
  };

  const toggle = async (id, completed) => {
    try {
      // map checkbox to status
      const status = completed ? 'Done' : 'Todo';
      const res = await api.put(`/apit/tasks/${id}`, { status });
      setTodos((t) => t.map((x) => (x._id === id ? res.data : x)));
    } catch (err) {
      console.error('Failed to update todo', err);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/apit/tasks/${id}`);
      setTodos((t) => t.filter((x) => x._id !== id));
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      // backend currently deletes at /apib/:id
      await api.delete(`/apib/${boardId}`);
      setBoards((b) => b.filter((x) => x._id !== boardId));
      if (selectedBoardId === boardId) {
        setSelectedBoardId(boards.length > 1 ? boards[0]._id : null);
      }
    } catch (err) {
      console.error('Failed to delete board', err);
    }
  };

  const selectedBoard = boards.find((b) => b._id === selectedBoardId);

  return (
    <div className="app-layout">
      <SideNav
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={setSelectedBoardId}
        onDeleteBoard={deleteBoard}
        onShowBoardForm={() => setShowBoardForm(true)}
      />
      <div className="main-content">
        {showBoardForm && (
          <div className="modal-overlay">
            <div className="modal">
              <BoardForm
                onAdd={addBoard}
                onCancel={() => setShowBoardForm(false)}
              />
            </div>
          </div>
        )}
        {selectedBoard ? (
          <>
            <div className="board-header">
              <div
                className="board-color-indicator"
                style={{ backgroundColor: selectedBoard.color }}
              />
              <h1>{selectedBoard.name}</h1>
            </div>
            <TaskForm onAdd={addTodo} />
            {loading ? (
              <p>Loading...</p>
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggle}
                onDelete={remove}
                onEdit={openEdit}
              />
            )}

            {showEditForm && editingTask && (
              <div className="modal-overlay">
                <div className="modal">
                  <TaskEditForm
                    task={editingTask}
                    onSave={saveEdit}
                    onCancel={() => { setShowEditForm(false); setEditingTask(null); }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p>No boards yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
