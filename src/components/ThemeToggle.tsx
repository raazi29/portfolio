
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <input
        type="checkbox"
        id="theme-checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="theme-checkbox"
      />
      <label htmlFor="theme-checkbox" className="theme-label">
      </label>
    </div>
  );
};

export default ThemeToggle;
