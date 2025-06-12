import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => setIsDark(!isDark)}
        className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold rounded shadow-md transition-all hover:scale-105"
      >
        {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
};

export default DarkModeToggle;
