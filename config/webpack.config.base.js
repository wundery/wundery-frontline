const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const version = process.env.VERSION || 'unknown';

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    path: path.resolve(process.cwd(), 'dist/'),
    filename: 'frontline.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(process.cwd(), 'src/'),
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('postcss-nested'),
                  require('autoprefixer')
                ];
              }
            }
          }
        ]
      },
    ]
  },

  resolve: {
    alias: {
      features: path.resolve(process.cwd(), 'src/features'),
      middlewares: path.resolve(process.cwd(), 'src/middlewares'),
      services: path.resolve(process.cwd(), 'src/services'),
      translations: path.resolve(process.cwd(), 'src/translations'),
      utils: path.resolve(process.cwd(), 'src/utils'),
      globals: path.resolve(process.cwd(), 'src/globals'),
    },
  },
};
