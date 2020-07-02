/* eslint-disable import/no-extraneous-dependencies */
const withImages = require('next-images');
const withClientScripts = require('../dist/withClientScripts');

const nextConfig = {
  pageExtensions: ['page.js']
};

module.exports = withImages(
  withClientScripts({
    '/': './src/pages/index.client.js'
  })(nextConfig)
);
