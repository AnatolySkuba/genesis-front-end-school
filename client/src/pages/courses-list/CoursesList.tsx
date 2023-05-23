import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Loader, Error, CourseCard, Pagination } from 'courses-components';

import { ROUTER_KEYS, COURSES_PER_PAGE, COURSES_TOTAL } from 'shared/consts';
import { ICourse, getCoursesList } from '../../entities/course';

function CoursesList() {
  const [searchParams] = useSearchParams();
  const perPage = Number(searchParams.get('perPage')) || COURSES_PER_PAGE.Ten;
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = `?page=${currentPage}&perPage=${perPage}`;
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery(`${ROUTER_KEYS.COURSES}`, () => getCoursesList(query));

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !courses) {
    return <Error />;
  }

  const pagesTotal = Math.ceil(COURSES_TOTAL / perPage);
  const coursesPicked: ICourse[] = [];
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  for (let i = startIndex; i < endIndex && i < courses.length; i++) {
    coursesPicked.push(courses[i]);
  }
  const currentPageCourses = courses.length < COURSES_TOTAL ? courses : coursesPicked;

  return (
    <>
      <ul
        className="grid gap-5 p-5 justify-items-center tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4"
        role="listbox"
      >
        {currentPageCourses.map((course: ICourse) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>

      {pagesTotal > 1 && <Pagination coursesTotal={COURSES_TOTAL} />}
    </>
  );
}

export default CoursesList;
