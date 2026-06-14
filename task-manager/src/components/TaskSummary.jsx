import React from 'react';
import { useTasks } from '../context/TaskContext';

const TaskSummary = () => {
  const { tasks, dispatch } = useTasks();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  if (totalTasks === 0) return null;

  return (
    <div className="task-summary">
      <p>
        <strong>{completedTasks}</strong> of <strong>{totalTasks}</strong> tasks completed
      </p>
      <button 
        onClick={() => dispatch({ type: 'CLEAR_ALL' })} 
        className="btn-clear"
      >
        Clear All Tasks
      </button>
    </div>
  );
};

export default TaskSummary;