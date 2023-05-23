import React from 'react';
import { shallow } from 'enzyme';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Loader, Error, CourseCard, Pagination } from 'courses-components';

import CoursesList from './CoursesList';
import { COURSES_PER_PAGE } from 'shared/consts';

jest.mock('react-query');
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));
jest.mock('courses-components', () => ({
  Loader: jest.fn(),
  Error: jest.fn(),
  CourseCard: jest.fn(),
  Pagination: jest.fn(),
}));

describe('CoursesList component', () => {
  const courses = [
    { id: 1, title: 'Course 1', description: 'Description 1' },
    { id: 2, title: 'Course 2', description: 'Description 2' },
    { id: 3, title: 'Course 3', description: 'Description 3' },
  ];

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({ data: courses, isLoading: false, isError: false });
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('?page=1&perPage=10');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);
  });

  afterEach(jest.clearAllMocks);

  it('renders the loader when loading', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const wrapper = shallow(<CoursesList />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('renders the error when there is an error', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    const wrapper = shallow(<CoursesList />);

    expect(wrapper.find(Error)).toHaveLength(1);
  });

  it('renders the list of courses when loaded', () => {
    const wrapper = shallow(<CoursesList />);

    expect(wrapper.find(CourseCard)).toHaveLength(courses.length);
  });

  it('renders pagination the list of courses when loaded', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('perPage=2&page=1');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<CoursesList />);

    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  it('calls getCoursesList with correct parameters', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    shallow(<CoursesList />);
    const perPage = Number(searchParams.get('perPage')) || COURSES_PER_PAGE.Ten;
    const currentPage = Number(searchParams.get('page')) || 1;

    expect(perPage).toEqual(10);
    expect(currentPage).toEqual(1);
  });
});
