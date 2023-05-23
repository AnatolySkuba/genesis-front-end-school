import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader, Error } from 'courses-components';

import CourseDetails from './CourseDetails';
import { LessonStatus } from '../../entities/course';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('courses-components', () => ({
  Loader: jest.fn(),
  Error: jest.fn(),
  VideoPlayer: jest.fn(),
  CourseLesson: jest.fn().mockReturnValue('Mocked CourseLesson component'), // Mocking CourseLesson component
}));

describe('CourseDetails', () => {
  let wrapper: ShallowWrapper;

  const mockCourse = {
    id: '1',
    title: 'Course Title',
    description: 'Course Description',
    lessons: [
      {
        id: '1',
        link: 'lesson-link',
        status: 'Unlocked',
        title: 'Lesson 1',
      },
      {
        id: '2',
        link: 'lesson-link',
        status: LessonStatus?.Locked,
        title: 'Lesson 2',
      },
    ],
    meta: {
      courseVideoPreview: {
        link: 'video-link',
      },
    },
    duration: 60,
    launchDate: '2023-05-15T00:00:00.000Z',
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ courseId: '1' });
    (useQuery as jest.Mock).mockReturnValue({ data: mockCourse, isLoading: false, isError: false });
    wrapper = shallow(<CourseDetails />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Loader while loading', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    wrapper = shallow(<CourseDetails />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('should render Error when there is an error or no course data', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    wrapper = shallow(<CourseDetails />);

    expect(wrapper.find(Error)).toHaveLength(1);
  });

  it('should render course details when loaded', () => {
    expect(wrapper.find('[role="article"]')).toHaveLength(1);
  });

  it('should set h1 when an unlocked lesson is clicked', () => {
    wrapper.find('li').first().simulate('click');

    expect(wrapper.find('h1').at(0).text()).toEqual(mockCourse.lessons[0].title);
  });

  it('shows error toast when a locked lesson is clicked', () => {
    const mockToast = jest.spyOn(toast, 'error');

    wrapper.find('li').at(1).simulate('click');

    expect(mockToast).toHaveBeenCalledWith('Oops, the lesson is locked!');
  });

  it('shows h1 when an unlocked lesson is clicked', () => {
    wrapper.find('li').first().simulate('click');

    expect(wrapper.find('h1')).toHaveLength(2);

    wrapper.find('h1').at(1).simulate('click');

    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('sets courseId as an empty string when params.courseId is not present', () => {
    (useParams as jest.Mock).mockReturnValue({});

    wrapper = shallow(<CourseDetails />);

    const courseId = useParams().courseId || '';
    expect(courseId).toEqual('');
  });
});
