import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import React from 'react';

import {Intro} from '../../components';
import { getAllPoints, getContentBySlug } from '../../libs/api'

type Props = {
  points: any;
  shop: any;
};

const ShopPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { slug } = router.query;
  const {t} = useTranslation('common');

  if (!router.isFallback && !slug) {
    return null;
  }
  
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
      <Intro initShop={_props.shop} points={_props.points}/>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({locale, params}) => {
  const points = getAllPoints();
  const shop = getContentBySlug(params?.slug)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
      points,
      shop,
    },
  };
}

export const getStaticPaths = async () => {
    const points = getAllPoints();
    const paths = points.map(({ id }) => {
        return {
          params: {
            slug: id,
          },
        }
      });

    return {
      paths,
      fallback: false,
    }
}

export default ShopPage;
