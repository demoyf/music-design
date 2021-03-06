'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks:['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/song_list.html',
      template: 'page/song_list/song_list.html',
      inject: true,
      chunks:['song_list']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/manage.html',
      template: 'page/manage/manage.html',
      inject: true,
      chunks:['manage']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/forum_page.html',
      template: 'page/forum_page/forum_page.html',
      inject: true,
      chunks:['forum_page']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/show_forum.html',
      template: 'page/show_forum/show_forum.html',
      inject: true,
      chunks:['show_forum']
    }),

    new HtmlWebpackPlugin({
      filename: 'page/all_forum.html',
      template: 'page/all_forum/all_forum.html',
      inject: true,
      chunks:['all_forum']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/play_music.html',
      template: 'page/play_music/play_music.html',
      inject: true,
      chunks:['play_music']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/publish_page.html',
      template: 'page/publish_page/publish_page.html',
      inject: true,
      chunks:['publish_page']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/album_info.html',
      template: 'page/album_info/album_info.html',
      inject: true,
      chunks:['album_info']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/search_result.html',
      template: 'page/search_result/search_result.html',
      inject: true,
      chunks:['search_result']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/artist.html',
      template: 'page/artist/artist.html',
      inject: true,
      chunks:['artist']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/hot_artist.html',
      template: 'page/hot_artist/hot_artist.html',
      inject: true,
      chunks:['hot_artist']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/billboard.html',
      template: 'page/billboard/billboard.html',
      inject: true,
      chunks:['billboard']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
