import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import sprite from 'shared/assets/sprite.svg';
import { RATING_COLORS } from 'shared/consts';

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating }) => {
  const calculateFillPercentage = (rating: number, index: number): number => {
    const fillPercent = Math.round((rating - index) * 100);
    return Math.min(Math.max(fillPercent, 0), 100);
  };

  return (
    <div className="flex">
      <ul className="flex">
        {Object.values(RATING_COLORS).map((color, index) => {
          const uniqueId = uuidv4();
          const fillPercent = calculateFillPercentage(rating, index);

          return (
            <li key={index}>
              <svg className={`mr-1 h-4 w-4 text-${color}-400`}>
                <linearGradient id={uniqueId}>
                  <stop offset={`${fillPercent}%`} stopColor={color} />
                  <stop offset={`${fillPercent}%`} stopColor="#fff" />
                </linearGradient>
                <use href={`${sprite}#heart`} fill={`url(#${uniqueId})`} stroke={color} />
              </svg>
            </li>
          );
        })}
      </ul>
      <p className="ml-2 text-gray-500 dark:text-gray-400">
        {rating} out of
        {Object.values(RATING_COLORS).length}
      </p>
    </div>
  );
};

export default Rating;
