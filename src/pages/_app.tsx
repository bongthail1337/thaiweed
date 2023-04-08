import {CacheProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import Head from 'next/head';
import Router, {useRouter} from 'next/router';
import Script from 'next/script';
import {appWithTranslation, useTranslation} from 'next-i18next';
import React from 'react';

import nextI18NextConfig from '../../next-i18next.config.js';
// import {Header} from '../components';
import {createEmotionCache} from '../helpers/createEmotionCache';
import {GA_MEASUREMENT_ID,pageview} from '../helpers/gtag';
import {withYM, YA_METRIKA_ID} from '../helpers/ym';
import {GlobalStyle} from '../styles';
import theme from '../styles/theme';

const clientSideEmotionCache = createEmotionCache();

const App = ({Component, emotionCache = clientSideEmotionCache, pageProps}) => {
  const {t} = useTranslation('common');
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = url => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <GlobalStyle />
      <Head>
        <link rel="icon" href="/favicon.svg?" sizes="any" type="image/svg+xml"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="max-image-preview:large" />
        <title>{t('SEO.title')}</title>
        <meta name="description" content={t('SEO.description')} />
        <meta name="keywords" content={t('SEO.keywords')} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Header /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

const AppYM = withYM(YA_METRIKA_ID, Router)(App);

export default appWithTranslation(AppYM, nextI18NextConfig);
