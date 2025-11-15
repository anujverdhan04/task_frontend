import React from 'react';

export default function SideNav({
  boards,
  selectedBoardId,
  onSelectBoard,
  onDeleteBoard,
  onShowBoardForm,
}) {
  return (
    <aside className="sidenav">
      <div className="sidenav-header">
        <h2>Boards</h2>
        <button className="btn-add-board" onClick={onShowBoardForm}>
          + New Board
        </button>
      </div>
      <ul className="boards-list">
        {boards.map((board) => (
          <li key={board._id} className={selectedBoardId === board._id ? 'active' : ''}>
            <div
              className="board-item"
              onClick={() => onSelectBoard(board._id)}
            >
              <span
                className="board-dot"
                style={{ backgroundColor: board.color }}
              />
              <span className="board-name">{board.name}</span>
            </div>
            <button
              className="btn-delete-board"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Delete board "${board.name}"?`)) {
                  onDeleteBoard(board._id);
                }
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
