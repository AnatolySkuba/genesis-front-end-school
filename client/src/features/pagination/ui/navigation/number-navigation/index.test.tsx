import React from 'react';
import { shallow } from 'enzyme';
import { useSearchParams } from 'react-router-dom';

import { getPaginationButtons, NumberNavigation } from '.';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

describe('NumberNavigation component', () => {
  const coursesTotal = 50;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination buttons', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);

    const wrapper = shallow(<NumberNavigation coursesTotal={coursesTotal} />);

    expect(wrapper.find('button').length).toEqual(5);
  });

  it('should call setSearchParams with page and perPage values when page is a number', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('?page=1&perPage=6');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<NumberNavigation coursesTotal={50} />);

    const button = wrapper.find('button').at(3); // get the 4th button
    button.simulate('click');

    expect(setSearchParams).toHaveBeenCalledWith({ page: '6', perPage: '6' });
  });

  it('should call setSearchParams with calculated page value when page is not a number', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('?page=1&perPage=10');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<NumberNavigation coursesTotal={50} />);

    const button = wrapper.find('button').at(3); // get the 4th button
    button.simulate('click');

    expect(setSearchParams).toHaveBeenCalledWith({ page: '4', perPage: '10' });
  });

  describe('getPaginationButtons', () => {
    it('returns correct pagination buttons when there are less than 6 pages in total', () => {
      const currentPage = '1';
      const pagesTotal = '3';
      const paginationButtons = getPaginationButtons(currentPage, pagesTotal);

      expect(paginationButtons).toEqual(['1', '2', '3']);
    });

    it('returns correct pagination buttons when current page is less than 4', () => {
      const currentPage = '2';
      const pagesTotal = '10';
      const paginationButtons = getPaginationButtons(currentPage, pagesTotal);

      expect(paginationButtons).toEqual(['1', '2', '3', '...', '10']);
    });

    it('returns correct pagination buttons when current page is greater than pagesTotal - 3', () => {
      const currentPage = '8';
      const pagesTotal = '10';
      const paginationButtons = getPaginationButtons(currentPage, pagesTotal);

      expect(paginationButtons).toEqual(['1', '...', '8', '9', '10']);
    });

    it('returns correct pagination buttons when current page is between 4 and pagesTotal - 3', () => {
      const currentPage = '5';
      const pagesTotal = '10';
      const paginationButtons = getPaginationButtons(currentPage, pagesTotal);

      expect(paginationButtons).toEqual(['1', '...', '5', '...', '10']);
    });
  });
});
