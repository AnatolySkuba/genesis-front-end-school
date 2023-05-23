import React from 'react';
import { shallow } from 'enzyme';
import { LocalStorageMock } from 'shared/lib/tests/helpers/mockLocalStorage';
import { render, screen } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';
import '@testing-library/jest-dom';

declare const global: any;

describe('ThemeSwitcher', () => {
  let getItemSpy: jest.SpyInstance;

  beforeAll(() => {
    global.localStorage = new LocalStorageMock();
  });

  beforeEach(() => {
    getItemSpy = jest.spyOn(localStorage, 'getItem');
  });

  afterEach(() => {
    getItemSpy.mockRestore();
  });

  it('toggles themeDark state and updates class and localStorage', () => {
    const spyAddClass = jest.spyOn(document.documentElement.classList, 'add');
    const spyRemoveClass = jest.spyOn(document.documentElement.classList, 'remove');
    const spySetItem = jest.spyOn(localStorage, 'setItem');

    const wrapper = shallow(<ThemeSwitcher />);
    wrapper.find('button').simulate('click');

    expect(spyAddClass).toHaveBeenCalledWith('dark');
    expect(spySetItem).toHaveBeenCalledWith('color-theme', 'dark');

    wrapper.find('button').simulate('click');

    expect(spyRemoveClass).toHaveBeenCalledWith('dark');
    expect(spySetItem).toHaveBeenCalledWith('color-theme', 'light');
  });

  test('loads the dark theme if "color-theme" is set in localStorage', () => {
    localStorage.setItem('color-theme', 'dark');

    render(<ThemeSwitcher />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    localStorage.removeItem('color-theme');
  });

  test('loads the dark theme if "color-theme" is set in localStorage2', () => {
    const mockMatches = jest.fn(() => true);
    Object.defineProperty(window, 'matchMedia', { value: () => ({ matches: mockMatches }) });

    render(<ThemeSwitcher />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });
});
