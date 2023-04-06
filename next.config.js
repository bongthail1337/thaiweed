const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const { i18n } = require('./next-i18next.config.js');
const { loadCustomBuildParams } = require('./next-utils.config');
const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const defaultConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    minimumCacheTTL: 60,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['cdn.pixabay.com', 'media.istockphoto.com', 'novostroiki-54.ru'],
  },
  experimental: {
    esmExternals,
  },
  i18n,
  typescript: {
    tsconfigPath,
  },
};

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  return withBundleAnalyzer({
    ...defaultConfig,
    env: {
      gaMeasurementId: 'G-9YHQGPMDZS',
      yaMetrikaId: '88802971',
    },
  });
};
