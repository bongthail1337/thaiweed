import React from 'react';

import {getRating} from '../utils/calc';
import {Icon} from './icon';

export const Rating = ({value}) => {
  const nRating = getRating(value);
  return (
    <>
    {[...Array(5)].map((s, i) => {
      const isValid = nRating > i;
      return (<Icon key={i} name="leaf" size={15} color={isValid ? '#4daf5a' : '#b0b0b0'} />)
    })}
    </>
  );
}
