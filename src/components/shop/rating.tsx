import React from 'react';

import {getRating} from '../../utils/calc';
import {Icon} from '../icon';

type RatingType = {
  value: any;
  size: number;
  color?: string;
}

export const Rating = ({value, size = 15, color}: RatingType) => {
  const nRating = getRating(value);
  return (
    <>
    {[...Array(5)].map((s, i) => {
      const isValid = nRating > i;
      return (<Icon key={i} name="leaf" size={size} color={isValid ? color || '#4daf5a' : '#b0b0b0'} />)
    })}
    </>
  );
}
