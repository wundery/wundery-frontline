const webpack = require('webpack');
const path = require('path');
const postcss = require('postcss-nested');
const autoprefixer = require('autoprefixer');

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
              plugins: () => [postcss, autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
            },
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true,
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      'node_modules',
    ],
    alias: {
      assets: path.resolve(process.cwd(), 'src/assets'),
      features: path.resolve(process.cwd(), 'src/features'),
      globals: path.resolve(process.cwd(), 'src/globals'),
      middlewares: path.resolve(process.cwd(), 'src/middlewares'),
      services: path.resolve(process.cwd(), 'src/services'),
      translations: path.resolve(process.cwd(), 'src/translations'),
      utils: path.resolve(process.cwd(), 'src/utils'),
    },
  },
};
