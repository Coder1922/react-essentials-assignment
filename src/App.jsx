import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <header>
          <h1>Task Manager</h1>
        </header>
        <main>
          <TaskInput />
          <TaskSummary />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;