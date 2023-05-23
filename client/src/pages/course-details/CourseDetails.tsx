import React, { useState } from 'react';
import { FcAcceptDatabase } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader, Error, VideoPlayer, CourseLesson } from 'courses-components';

import { ROUTER_KEYS } from 'shared/consts';
import { formatTime } from 'shared/lib/helpers';
import { getCourseById, LessonStatus, ILesson } from '../../entities/course';

function CourseDetails(): JSX.Element {
  const [videoId, setVideoId] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId || '';
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(`${ROUTER_KEYS.COURSES}`, () => getCourseById(courseId));

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !course) {
    return <Error />;
  }

  const { id, title, description, lessons, meta, duration, launchDate } = course;

  const handleLesson = ({ id, link, status, title }: ILesson) => {
    if (status === LessonStatus?.Locked) {
      toast.error('Oops, the lesson is locked!');
    } else {
      setVideoId(id);
      setVideoSrc(link);
      setVideoTitle(title);
    }
  };

  const publishedDate = (str: string) => {
    const strDate = new Date(str);
    return strDate.toLocaleString();
  };

  return (
    <div className="p-5 flex justify-center" role="article">
      <div>
        <div className="bg-white max-w-240 rounded-md dark:bg-opacity-10 dark:text-slate-200 duration-700">
          <h1 className="p-2 font-medium">{videoId ? videoTitle : title}</h1>
          <VideoPlayer
            id={videoId || id}
            src={videoId ? videoSrc : meta?.courseVideoPreview.link}
            controls
          />
        </div>
        <div className="mt-2 p-2 bg-white rounded-md dark:bg-opacity-10 dark:text-slate-200 duration-700">
          {videoId && (
            <h1
              className="py-2 font-medium cursor-pointer text-blue-900 hover:font-semibold hover:ml-2  dark:text-slate-200"
              onClick={() => setVideoId('')}
            >
              {title}
            </h1>
          )}
          <p className="text-gray-700 mb-1 dark:text-slate-200">{description}</p>
          <p className="text-gray-700 text-sm dark:text-slate-200">
            Published: {publishedDate(launchDate)}
          </p>
          <p className="text-gray-700 text-sm dark:text-slate-200">
            Total duration: {formatTime(duration)}
          </p>

          <div className="mt-2">
            <div className="flex gap-2 items-center">
              <p className="font-medium">Lessons</p>
              <FcAcceptDatabase size="16" />
            </div>

            <ul>
              {lessons?.map((lesson: ILesson) => (
                <li key={lesson.id} onClick={() => handleLesson(lesson)} className="cursor-pointer">
                  <CourseLesson {...lesson} videoId={videoId} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
