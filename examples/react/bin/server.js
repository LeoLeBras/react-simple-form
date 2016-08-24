/* eslint no-console: 0 */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.dev')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: {
    index: './bin/index.html',
  },
}).listen(3000, 'localhost', (err) => {
  if (err) {
    return console.log(err)
  }
  return console.log('Listening at http://localhost:3000/')
})
