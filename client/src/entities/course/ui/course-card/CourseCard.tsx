import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoPlayer, Rating } from 'courses-components';

import { ICourse } from '../..';

function CourseCard({
  id,
  title,
  description,
  previewImageLink,
  lessonsCount,
  rating,
  meta,
}: ICourse): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative min-w-fill rounded-lg bg-white dark:bg-stone-900 duration-700 border shadow-md hover:shadow-lg shadow-gray-500 hover:shadow-gray-800 dark:hover:shadow-gray-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={id} className="block p-3 pb-10">
        <div className="relative h-28 w-64 mx-auto">
          {isHovered ? (
            <VideoPlayer
              className="absolute top-0 h-full w-full rounded-md object-contain"
              src={meta.courseVideoPreview?.link}
              id={id}
              muted
              autoPlay
            />
          ) : (
            <img
              alt={title}
              src={`${previewImageLink}/cover.webp`}
              className="absolute top-0 h-full w-full rounded-md object-contain"
            />
          )}
        </div>
        <div className="mt-1 dark:text-gray-200">
          <h2 className="font-medium">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-200">{description}</p>

          <div className="mt-1 text-xs ">
            <div>
              {meta.skills && (
                <p className="text-gray-500 dark:text-gray-200">
                  {`Skills: ${meta.skills.join(', ')}.`}
                </p>
              )}
              <div className="absolute bottom-3 w-full flex justify-between">
                <Rating rating={rating} />
                <p className="mr-6 text-gray-500 dark:text-gray-400">
                  Lessons:
                  {lessonsCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default CourseCard;
