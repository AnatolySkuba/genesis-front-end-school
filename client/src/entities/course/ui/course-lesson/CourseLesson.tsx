import React, { FC } from 'react';
import { FcStart } from 'react-icons/fc';
import { SlLock } from 'react-icons/sl';
import { formatTime } from 'shared/lib/helpers';

import { ILesson } from '../..';

interface ILessonProps extends ILesson {
  videoId: string;
}

const CourseLesson: FC<ILessonProps> = ({ id, title, status, videoId, duration }): JSX.Element => (
  <div className="flex items-center">
    <p className="flex items-center gap-3 text-blue-800 hover:font-semibold hover:ml-2 dark:text-slate-200">
      {title}
      {id === videoId && <FcStart className="animate-pulse" />}
    </p>
    <p className="ml-2 text-xs slate-200">{formatTime(duration)}</p>
    {status === 'locked' && <SlLock size="10" color="red" />}
  </div>
);

export default CourseLesson;
