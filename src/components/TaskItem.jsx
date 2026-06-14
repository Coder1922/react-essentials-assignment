import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = () => {
    if (editText.trim()) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, newText: editText } });
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
        />
        
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
            autoFocus
          />
        ) : (
          <span className="task-text" onDoubleClick={() => setIsEditing(true)}>
            {task.text}
          </span>
        )}
      </div>

      <div className="button-group">
        <button onClick={() => setIsEditing(!isEditing)} className="btn-edit">
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button 
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })} 
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;