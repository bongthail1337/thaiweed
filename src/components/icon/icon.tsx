import React from 'react';

import {get} from '../../utils/get';
import lib from './lib';

type IconProps = {
  name: any;
  size?: any;
  color?: any;
  width?: any;
  height?: any;
};

export const Icon = ({name, size, width = 22, height = 22, color, ...rest}: IconProps) => {
  if (!name) {
    return null;
  }

  const svg = get(lib, name);

  if (!svg) {
    console.error(`Requested unknown icon '${name}'`);
    return null;
  }

  const svgWidth = size || width;
  const svgHeight = size || height;
  return React.createElement(svg, {
    ...rest,
    color,
    width: svgWidth,
    height: svgHeight,
  });
};
