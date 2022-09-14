/** @type {import('next').NextConfig} */
const withLess = require('next-with-less');

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': '#6366f1',
      },
    },
  },
  reactStrictMode: true,
  env: {
    BaseURL: 'http://127.0.0.1:8001',
    // BaseURL: 'http://ec2-3-139-230-2.us-east-2.compute.amazonaws.com:8001',
  },
  crossOrigin: 'anonymous',
  eslint: {
    dirs: [
      'pages',
      'components',
      'HOC',
      'redux',
      'store',
      'type',
      'url',
      'util',
    ],
  },
});
