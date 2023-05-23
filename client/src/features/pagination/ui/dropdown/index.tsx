import React, { Dispatch, FC, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

import { COURSES_PER_PAGE } from 'shared/consts';

export type Props = {
  coursesTotal: number;
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
};

const Dropdown: FC<Props> = ({ coursesTotal, showDropdown, setShowDropdown }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || COURSES_PER_PAGE.Ten.toString();
  const coursesPerPage = Object.values(COURSES_PER_PAGE).filter(
    (item) => typeof item === 'number' && item !== +perPage
  );

  const changeCoursesPerPage = (item: number) => {
    setShowDropdown(!showDropdown);
    setSearchParams({ page: currentPage, perPage: item.toString() });

    const pagesTotalNew = Math.ceil(coursesTotal / item).toString();
    if (+currentPage > +pagesTotalNew) {
      setSearchParams({ page: pagesTotalNew, perPage: item.toString() });
    }
  };

  return (
    <div className="absolute top-8 left-10 bg-white dark:bg-stone-800 shadow">
      <ul>
        {coursesPerPage.map((item, i) => (
          <li key={i} className="hover:bg-gray-100 dark:hover:bg-stone-900">
            <button className="py-2 px-4" onClick={() => changeCoursesPerPage(+item)}>
              {`${item} items`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
