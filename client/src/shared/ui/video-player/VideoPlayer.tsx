import React, { FC, useCallback, useEffect, useRef, useState, VideoHTMLAttributes } from 'react';
import Hls from 'hls.js';
import { HiArrowSmDown } from 'react-icons/hi';
import { MdPictureInPictureAlt } from 'react-icons/md';

import { KeyboardButton } from 'shared/types';

export type VideoPlayerProps = {
  id?: string;
} & VideoHTMLAttributes<HTMLVideoElement>;

const VideoPlayer: FC<VideoPlayerProps> = function VideoPlayer({
  id,
  src,
  controls = false,
  ...props
}) {
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const hls = new Hls();
    if (src) {
      hls.loadSource(src);
      if (videoRef.current) {
        hls.attachMedia(videoRef.current);
      }
      const savedTime = localStorage.getItem(`lessonTime ${id}`);

      if (id && savedTime && videoRef && videoRef.current) {
        videoRef.current.currentTime = parseInt(savedTime, 10) || 0;
      }
    }
  }, [videoRef, src, id]);

  // save the video progress to the localStorage
  const handleTimeUpdate = useCallback(() => {
    localStorage.setItem(`lessonTime ${id}`, videoRef.current?.currentTime.toString() || '');
  }, [id]);

  // Add a change in video playback using a keyboard
  useEffect(() => {
    const changePlaybackRate = (rate: number) => {
      if (videoRef.current) {
        const newRate = videoRef.current.playbackRate + rate;
        if (newRate >= 0.5 && newRate <= 3.75) {
          videoRef.current.playbackRate = newRate;
          setPlaybackRate(newRate);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch (event.code) {
          case KeyboardButton.ArrowDown:
            changePlaybackRate(-0.25);
            break;
          case KeyboardButton.ArrowUp:
            changePlaybackRate(0.25);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const enablePictureInPicture = () => {
    videoRef.current?.requestPictureInPicture();
  };

  return (
    <>
      <video
        ref={videoRef}
        controls={controls}
        loop
        data-testid="video-element"
        onTimeUpdate={handleTimeUpdate}
        {...props}
      >
        <track kind="captions" src="path_to_captions_file.vtt" label="English" default />
      </video>
      {controls && (
        <div className="flex justify-between items-center py-2 px-3">
          <p className="flex items-center text-sm">
            Press
            <kbd className="ml-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              Ctrl
            </kbd>
            <span className="mx-2">+</span>
            <kbd className="inline-flex items-center px-2 py-1.5 rotate-180 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              <HiArrowSmDown />
            </kbd>
            <span className="mx-2">or</span>
            <kbd className="inline-flex items-center px-2 py-1.5 mr-2 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              <HiArrowSmDown />
            </kbd>
            to change the playback speed: {playbackRate}
          </p>
          <button type="button" onClick={() => enablePictureInPicture()}>
            <MdPictureInPictureAlt size={18} className="text-gray-500 dark:text-slate-200" />
          </button>
        </div>
      )}
    </>
  );
};

VideoPlayer.defaultProps = {
  id: '',
};

export default VideoPlayer;
