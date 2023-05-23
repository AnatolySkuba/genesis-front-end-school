import React from 'react';
import { shallow } from 'enzyme';
import { VideoPlayer } from 'courses-components';

import { ICourse } from '../..';

import CourseCard from './CourseCard';

jest.mock('courses-components', () => ({
  VideoPlayer: jest.fn(),
}));

describe('CourseCard', () => {
  const course: ICourse = {
    id: '1',
    title: 'Test Course',
    description: 'This is a test course',
    previewImageLink: '/test-preview-image',
    lessonsCount: 10,
    rating: 4.5,
    meta: {
      skills: ['React', 'Node.js'],
      courseVideoPreview: {
        link: '/test-video-link',
      },
    },
    duration: 1,
    launchDate: '2023-03-06T16:50:06.000Z',
  };

  it('renders the video player when hovered and the preview image otherwise', () => {
    const wrapper = shallow(<CourseCard {...course} />);
    expect(wrapper.find(VideoPlayer)).toHaveLength(0);
    wrapper.simulate('mouseenter');
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
    expect(wrapper.find(VideoPlayer).prop('src')).toEqual(
      course.meta.courseVideoPreview ? course.meta.courseVideoPreview.link : undefined
    );
    wrapper.simulate('mouseleave');
    expect(wrapper.find(VideoPlayer)).toHaveLength(0);
  });
});
