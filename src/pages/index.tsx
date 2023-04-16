import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import React from 'react';
import {Events, scrollSpy} from 'react-scroll';

import {Intro} from '../components';
import { getAllPoints } from '../libs/api'

type Props = {
  points: any;
};

const HomePage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {t} = useTranslation('common');
  React.useEffect(() => {
    Events.scrollEvent.register('begin', function (to, element) {
      console.log('begin', to);
    });

    Events.scrollEvent.register('end', function (to, element) {
      console.log('end', to);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="max-image-preview:large" />
        <meta property="article:published_time" content={new Date().toISOString()} />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <title>{t('HomePage.SEO.title')}</title>
        <meta name="description" content={t('HomePage.SEO.description')} />
        <meta name="keywords" content={t('HomePage.SEO.keywords')} />
        <meta property="og:title" content={t('HomePage.SEO.og.title')} />
        <meta property="og:description" content={t('HomePage.SEO.og.description')} />
        <meta property="og:type" content={t('HomePage.SEO.og.type')} />
        <meta property="og:locale" content={t('HomePage.SEO.og.locale')} />
        <meta property="og:url" content={t('HomePage.SEO.og.url')} />
        <meta property="og:site_name" content={t('HomePage.SEO.og.site_name')} />
        <meta property="og:image" key="og:image" content={t('HomePage.SEO.og.image')} />
        <meta property="twitter:image" key="twitter:image" content={t('HomePage.SEO.twitter.image')} />
        <meta property="twitter:title" content={t('HomePage.SEO.twitter.title')} />
        <meta property="twitter:description" content={t('HomePage.SEO.twitter.description')} />
        <meta name="twitter:card" content={t('HomePage.SEO.twitter.card')} />
        <meta property="twitter:url" content={t('HomePage.SEO.twitter.url')} />
      </Head>
      <Intro points={_props.points}/>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => {
  const points = getAllPoints();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
      points,
    },
  };
}

export default HomePage;
