import React from 'react';
import { shallow } from 'enzyme';
import { useSearchParams } from 'react-router-dom';
import '@testing-library/jest-dom';

import Dropdown, { Props } from '.';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

describe('Dropdown', () => {
  const props: Props = {
    coursesTotal: 20,
    showDropdown: true,
    setShowDropdown: jest.fn(),
  };

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('?page=1&perPage=10')]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correct list in the dropdown list', () => {
    const wrapper = shallow(<Dropdown {...props} />);

    expect(wrapper.find('ul')).toHaveLength(1);
  });

  it('should update perPage in the search params when button is clicked', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('?page=1&perPage=10');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<Dropdown {...props} />);
    const button = wrapper.find('button').at(0); // get the first button
    button.simulate('click');

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1', perPage: '20' });
  });

  it('should update perPage in the search params when button is clicked, and the current page is more than all pages', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('?page=2&perPage=10');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<Dropdown {...props} />);
    const button = wrapper.find('button').at(0); // get the first button
    button.simulate('click');

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1', perPage: '20' });
  });

  it('currentPage and perPage should be set correctly without the search params', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<Dropdown {...props} />);
    const button = wrapper.find('button').at(0); // get the first button
    button.simulate('click');

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1', perPage: '20' });
  });
});
