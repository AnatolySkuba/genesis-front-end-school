import React from 'react';
import { shallow } from 'enzyme';
import { useSearchParams } from 'react-router-dom';
import '@testing-library/jest-dom';

import { COURSES_PER_PAGE } from 'shared/consts';
import { Pagination } from '.';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));
jest.mock('courses-components', () => ({
  Navigation: jest.fn(),
}));

describe('Pagination', () => {
  const coursesTotal = 100;

  const mockSearchParams = {
    get: jest.fn(),
    set: jest.fn(),
  };
  const mockSetSearchParams = jest.fn();
  jest
    .spyOn(require('react-router-dom'), 'useSearchParams')
    .mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('?page=1&perPage=10')]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show the correct number of items', () => {
    const wrapper = shallow(<Pagination coursesTotal={coursesTotal} />);

    expect(wrapper.find('button').text()).toContain(`${COURSES_PER_PAGE.Ten} items`);
  });

  it('should show the correct number of entries', () => {
    const wrapper = shallow(<Pagination coursesTotal={coursesTotal} />);

    expect(wrapper.find('p').text()).toContain(`of ${coursesTotal} entries`);
  });

  it('should show the dropdown when the button is clicked', () => {
    const wrapper = shallow(<Pagination coursesTotal={coursesTotal} />);
    wrapper.find('button').simulate('click');

    expect(wrapper.find('Dropdown').prop('showDropdown')).toBe(true);
  });

  it('currentPage and perPage should be set correctly without the search params', () => {
    const getSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, getSearchParams]);

    const wrapper = shallow(<Pagination coursesTotal={coursesTotal} />);

    expect(wrapper.find('p').text()).toContain('Showing from 1 to');
    expect(wrapper.find('button').text()).toContain(`${COURSES_PER_PAGE.Ten} items`);
  });

  it('should render showing correctly', () => {
    const wrapper = shallow(<Pagination coursesTotal={9} />);
    const showing = wrapper.find('p').text();

    expect(showing).toEqual('Showing from 1 to 9 of 9 entries');
  });
});
