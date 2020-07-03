/* eslint-disable import/no-extraneous-dependencies */
const withImages = require('next-images');
const withClientScripts = require('next-client-script/dist/withClientScripts');

const nextConfig = {
  pageExtensions: ['page.tsx']
};

module.exports = withImages(
  withClientScripts({
    '/': './src/pages/index.client.tsx',
    '/tests/nested': './src/pages/tests/nested.client.tsx'
  })(nextConfig)
);
