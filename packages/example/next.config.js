/* eslint-disable import/no-extraneous-dependencies */
const withImages = require('next-images');
const withClientScripts = require('next-client-script/dist/withClientScripts');

const nextConfig = {
  pageExtensions: ['page.tsx'],
  headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'cache-control',
            value: 'cache-control: public,max-age=60'
          }
        ]
      }
    ];
  }
};

module.exports = withImages(
  withClientScripts({
    '/': './src/pages/index.client.tsx',
    '/tests/nested': './src/pages/tests/nested.client.tsx'
  })(nextConfig)
);
