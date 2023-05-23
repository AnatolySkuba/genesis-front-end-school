import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ThemeSwitcher } from 'courses-components';
import { FcUndo } from 'react-icons/fc';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isBackButton = location.pathname !== '/courses';

  return (
    <header
      className={`flex items-center bg-black bg-opacity-10 py-2 px-5 dark:bg-gray-100 dark:bg-opacity-10 ${
        isBackButton ? 'justify-between' : 'justify-end'
      }`}
    >
      {isBackButton && (
        <FcUndo className="cursor-pointer w-9 h-9 p-2" onClick={() => navigate(-1)} role="link" />
      )}
      <ThemeSwitcher />
    </header>
  );
}

export default Header;
