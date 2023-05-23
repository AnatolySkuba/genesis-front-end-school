import React from 'react';
import { shallow } from 'enzyme';

import { ILesson, LessonStatus } from '../..';

import CourseLesson from './CourseLesson';

jest.mock('courses-components', () => ({
  VideoPlayer: jest.fn(),
}));

describe('Lesson Component', () => {
  const lesson: ILesson = {
    id: '1',
    title: 'Lesson 1',
    status: LessonStatus.Unlocked,
    link: 'https://www.example.com',
    duration: 0,
  };

  const lockedLesson = {
    ...lesson,
    status: LessonStatus.Locked,
  };

  it('should show lock icon for locked lessons', () => {
    const wrapper = shallow(<CourseLesson {...lockedLesson} videoId="1" />);

    expect(wrapper.find('SlLock')).toHaveLength(1);
  });
});
