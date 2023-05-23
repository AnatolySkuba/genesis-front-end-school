import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom';

import { LocalStorageMock } from 'shared/lib/tests/helpers/mockLocalStorage';
import { KeyboardButton } from 'shared/types';
import VideoPlayer from './VideoPlayer';

declare const global: any;

class MockHTMLVideoElement {
  currentTime = 0;

  requestPictureInPicture = jest.fn();
}

Object.defineProperty(global, 'HTMLVideoElement', {
  value: MockHTMLVideoElement,
});

describe('VideoPlayer', () => {
  const props = {
    id: '1',
    src: 'https://example.com/video.m3u8',
    className: 'test-class',
    muted: true,
  };

  const propsWithControls = {
    ...props,
    controls: true,
  };
  const savedTime = '123';

  beforeAll(() => {
    global.localStorage = new LocalStorageMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    global.localStorage = undefined;
  });

  it('renders a video element with default props', () => {
    const wrapper = shallow(<VideoPlayer {...props} />);
    const videoElement = wrapper.find('video');

    expect(videoElement.exists()).toBe(true);
  });

  it('should update the playback rate when the keyboard shortcut is used', () => {
    render(<VideoPlayer {...props} />);
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

    expect(videoElement.playbackRate).toBe(1);
    fireEvent.keyDown(videoElement, { ctrlKey: true, code: KeyboardButton.ArrowUp });

    expect(videoElement.playbackRate).toBe(1.25);
    fireEvent.keyDown(videoElement, { ctrlKey: true, code: KeyboardButton.ArrowDown });

    expect(videoElement.playbackRate).toBe(1);
  });

  it('requests picture-in-picture mode on button click', () => {
    const requestPictureInPictureMock = jest.fn();
    HTMLVideoElement.prototype.requestPictureInPicture = requestPictureInPictureMock;

    render(<VideoPlayer {...propsWithControls} />);
    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(requestPictureInPictureMock).not.toHaveBeenCalled();
  });

  test('saves video progress to localStorage on time update', () => {
    const localStorageSetItemSpy = jest.spyOn(localStorage, 'setItem');

    render(<VideoPlayer {...props} />);
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;
    fireEvent.timeUpdate(videoElement);
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      `lessonTime ${props.id}`,
      videoElement.currentTime.toString()
    );
  });

  it('should save the current lesson time to localStorage when the component mounts', () => {
    localStorage.getItem = jest.fn().mockReturnValue(savedTime);

    render(<VideoPlayer {...props} />);
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

    expect(videoElement.currentTime).toBe(+savedTime);
  });
});
