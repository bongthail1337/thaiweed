import {parseCookies, setCookie} from 'nookies';
import React from 'react';

export default function (ctx = null, name = 'cookies', maxAge = 30 * 24 * 60 * 60) {
  const cookies = parseCookies(ctx);
  const [useCookies, setUseCookies] = React.useState<any>(cookies[name] || false);
  const onChange = bool => {
    const value = bool ? 1 : 0;
    setUseCookies(value);
    setCookie(ctx, name, String(value), {
      path: '/',
      maxAge,
    });
  };
  return [Boolean(useCookies), onChange];
}
