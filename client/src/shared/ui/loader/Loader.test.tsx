import React from 'react';
import { shallow } from 'enzyme';

import { Loader } from '.';

describe('Loader component', () => {
  it('renders three bouncing circles', () => {
    const wrapper = shallow(<Loader />);
    const circles = wrapper.find('.bg-green-600');

    expect(circles.length).toBe(3);
    expect(circles.at(0).hasClass('animate-bounce')).toBe(true);
    expect(circles.at(1).hasClass('animate-bounce200')).toBe(true);
    expect(circles.at(2).hasClass('animate-bounce400')).toBe(true);
  });

  it('renders centered on screen', () => {
    const wrapper = shallow(<Loader />);
    const loaderContainer = wrapper.first();

    expect(loaderContainer.hasClass('flex')).toBe(true);
    expect(loaderContainer.hasClass('justify-center')).toBe(true);
    expect(loaderContainer.hasClass('items-center')).toBe(true);
  });
});
