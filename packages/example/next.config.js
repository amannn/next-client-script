/* eslint-disable import/no-extraneous-dependencies */
const withClientScripts = require('next-client-script/dist/withClientScripts');
const withImages = require('next-images');

const nextConfig = {
  pageExtensions: ['page.tsx']
};

module.exports = withImages(
  withClientScripts({
    '/': './src/pages/index.client.tsx',
    '/tests': './src/pages/tests/index.client.tsx',
    '/tests/nested': './src/pages/tests/nested.client.tsx',
    '/dynamic/:initialCount': './src/pages/dynamic/[initialCount].client.tsx'
  })(nextConfig)
);
