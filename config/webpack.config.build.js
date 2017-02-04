const webpack = require('webpack');
const baseConfig = require('./webpack.config.base.js');

// Apply custom build config here
const buildConfig = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ].concat(baseConfig.plugins),
};

module.exports = Object.assign({}, baseConfig, buildConfig);
