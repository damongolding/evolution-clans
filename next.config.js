const withImages = require('next-images');

module.exports =  withImages({
  basePath: '/evolution-clans',
  webpack(config, options) {
    return config;
  }
})
