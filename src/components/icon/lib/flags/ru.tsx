import React from 'react';

export const ru = ({color, ...rest}) => {
  return (
    <svg viewBox="0 0 28 20" {...rest}>
      <defs>
        <path id="a" d="M0 0h28v20H0z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path stroke="#D3E9F8" fill="#E8F6FF" d="M.5.5h27v19H.5z" />
        <path fill="#0161D3" d="M0 7h28v20H0z" mask="url(#b)" />
        <path fill="#D80227" d="M0 13h28v20H0z" mask="url(#b)" />
      </g>
    </svg>
  );
};
