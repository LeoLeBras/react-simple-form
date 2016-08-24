/* eslint global-require: 0 */

const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: '#eval-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  resolve: {
    extensions: ['', '.js', '.css', '.json'],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    quiet: true,
    publicPath: '/dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
      ],
    }],
  },
  postcss: () => ([
    require('autoprefixer')({
      browsers: '> 98%',
    }),
  ]),
}
