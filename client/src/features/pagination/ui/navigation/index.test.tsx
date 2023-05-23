import React from 'react';
import { shallow } from 'enzyme';

import Navigation from '.';

jest.mock('courses-components', () => ({
  NumberNavigation: jest.fn(),
}));

describe('Navigation component', () => {
  const coursesTotal = 20;
  const mockSearchParams = {
    get: jest.fn(),
    set: jest.fn(),
  };
  const mockSetSearchParams = jest.fn();
  jest
    .spyOn(require('react-router-dom'), 'useSearchParams')
    .mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    const wrapper = shallow(<Navigation coursesTotal={coursesTotal} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('disables the previous button on the first page', () => {
    mockSearchParams.get.mockReturnValue('1');

    const wrapper = shallow(<Navigation coursesTotal={coursesTotal} />);
    const prevButton = wrapper.find('button').at(0);

    expect(prevButton.prop('disabled')).toBe(true);
  });

  it('disables the next button on the last page', () => {
    mockSearchParams.get.mockReturnValue('2');

    const wrapper = shallow(<Navigation coursesTotal={coursesTotal} />);
    const nextButton = wrapper.find('button').at(1);

    expect(nextButton.prop('disabled')).toBe(false);
  });

  it('calls setSearchParams with the correct params when clicking previous button', () => {
    mockSearchParams.get.mockReturnValue('2');

    const wrapper = shallow(<Navigation coursesTotal={coursesTotal} />);
    const prevButton = wrapper.find('button').at(0);
    prevButton.simulate('click');

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1', perPage: '2' });
  });

  it('calls setSearchParams with the correct params when clicking next button', () => {
    mockSearchParams.get.mockReturnValue('1');

    const wrapper = shallow(<Navigation coursesTotal={coursesTotal} />);
    const nextButton = wrapper.find('button').at(1);
    nextButton.simulate('click');

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '2', perPage: '1' });
  });
});
