/* eslint-disable import/no-extraneous-dependencies */
const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['next-client-script']);
const withClientScripts = require('next-client-script/dist/withClientScripts');

const nextConfig = {
  pageExtensions: ['page.tsx']
};

module.exports = withTM(
  withImages(
    withClientScripts({
      '/': './src/pages/index.client.tsx'
    })(nextConfig)
  )
);
