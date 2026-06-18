import React from 'react';

export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark ? '☾ Switch to Light' : '☼ Switch to Dark'}
    </button>
  );
}