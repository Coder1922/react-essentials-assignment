import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskInput = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: text.trim() });
      setText(''); // Clear input after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-add">Add Task</button>
    </form>
  );
};

export default TaskInput;