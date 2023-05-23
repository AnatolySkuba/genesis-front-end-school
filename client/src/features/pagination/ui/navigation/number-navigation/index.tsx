import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { COURSES_PER_PAGE } from 'shared/consts';

type Props = {
  coursesTotal: number;
};

export const getPaginationButtons = (currentPage: string, pagesTotal: string) => {
  if (+pagesTotal < 6) {
    return Array.from({ length: +pagesTotal }, (_, i) => (i + 1).toString());
  }
  if (+currentPage < 4) {
    return ['1', '2', '3', '...', pagesTotal];
  }
  if (+currentPage > +pagesTotal - 3) {
    return ['1', '...', (+pagesTotal - 2).toString(), (+pagesTotal - 1).toString(), pagesTotal];
  }
  return ['1', '...', currentPage, '...', pagesTotal];
};

export const NumberNavigation: FC<Props> = ({ coursesTotal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || COURSES_PER_PAGE.Ten.toString();
  const pagesTotal = Math.ceil(coursesTotal / +perPage).toString();

  const paginationButtons = getPaginationButtons(currentPage, pagesTotal);

  const getPage = (page: string, index: number) => {
    +page
      ? setSearchParams({ page, perPage })
      : setSearchParams({
          page: Math.floor(
            (+paginationButtons[index - 1] + +paginationButtons[index + 1]) / 2
          ).toString(),
          perPage,
        });
  };

  return (
    <>
      {paginationButtons.map((button, i) => (
        <button
          key={i}
          className={`w-10 h-10 mx-1 text-center rounded hover:bg-gray-100 dark:hover:bg-stone-800 ${
            currentPage === button &&
            'bg-gray-200 dark:bg-gray-400 text-gray-900 dark:hover:text-gray-400 font-medium'
          }`}
          onClick={() => getPage(button, i)}
        >
          {button}
        </button>
      ))}
    </>
  );
};
