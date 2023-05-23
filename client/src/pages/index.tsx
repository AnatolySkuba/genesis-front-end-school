import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTER_KEYS } from 'shared/consts';

const CourseList = lazy(() => import('./courses-list'));
const CourseDetails = lazy(() => import('./course-details'));

function Routing() {
  return (
    <Routes>
      <Route path={ROUTER_KEYS.COURSES} element={<CourseList />} />
      <Route path={`${ROUTER_KEYS.COURSES}/:courseId`} element={<CourseDetails />} />
      <Route path="*" element={<Navigate to={ROUTER_KEYS.COURSES} replace />} />
    </Routes>
  );
}

export default Routing;
