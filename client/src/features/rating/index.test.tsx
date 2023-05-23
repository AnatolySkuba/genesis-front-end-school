import React from 'react';
import { shallow } from 'enzyme';

import Rating from './Rating';

const props = {
  rating: 3,
};

describe('should render Rating component', () => {
  it('should contain list wrapper', () => {
    const component = shallow(<Rating {...props} />);

    expect(component.find('ul').length).toBe(1);
  });
});
