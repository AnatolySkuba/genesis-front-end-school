import React, { FC, useEffect, useState } from 'react';

import sprite from 'shared/assets/sprite.svg';

const ThemeSwitcher: FC = () => {
  const [themeDark, setThemeDark] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setThemeDark(true);
    }
  }, []);

  const themeToggle = () => {
    setThemeDark(!themeDark);

    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  };

  return (
    <button
      onClick={() => themeToggle()}
      className="text-gray-600 dark:text-yellow-100 transition duration-700 ease-in-out p-2"
    >
      {themeDark ? (
        <svg
          className="w-5 h-5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          data-testid="sun-icon"
        >
          <use href={`${sprite}#sun`} />
        </svg>
      ) : (
        <svg className="w-5 h-5">
          <use href={`${sprite}#moon`} />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitcher;
