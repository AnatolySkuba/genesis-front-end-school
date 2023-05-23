import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import sprite from 'shared/assets/sprite.svg';
import { COURSES_PER_PAGE } from 'shared/consts';
import { NumberNavigation } from 'courses-components';

type Props = {
  coursesTotal: number;
};

const Navigation: FC<Props> = ({ coursesTotal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || COURSES_PER_PAGE.Ten.toString();
  const pagesTotal = Math.ceil(coursesTotal / +perPage).toString();

  const getPage = (page: number) => {
    setSearchParams({
      page: (+currentPage + page).toString(),
      perPage,
    });
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center items-center text-gray-600 dark:text-gray-300 mt-6"
    >
      <button
        className="p-2 mr-1 rounded hover:bg-gray-100 dark:hover:bg-stone-800 cursor-pointer"
        onClick={() => getPage(-1)}
        disabled={currentPage === '1'}
      >
        <svg className="h-6 w-6" strokeWidth="2">
          <use href={`${sprite}#arrow`} />
        </svg>
      </button>
      <NumberNavigation coursesTotal={coursesTotal} />
      <button
        className="p-2 ml-1 rounded hover:bg-gray-100 dark:hover:bg-stone-800 cursor-pointer"
        onClick={() => getPage(1)}
        disabled={currentPage === pagesTotal}
      >
        <svg className="h-6 w-6 rotate-180" strokeWidth="2">
          <use href={`${sprite}#arrow`} />
        </svg>
      </button>
    </nav>
  );
};

export default Navigation;
