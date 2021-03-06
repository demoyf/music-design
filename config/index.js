'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',//on build update  ./
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    song_list:path.resolve(__dirname,'../dist/page/song_list.html'),
    album_info:path.resolve(__dirname,'../dist/page/album_info.html'),
    artist:path.resolve(__dirname,'../dist/page/artist.html'),
    hot_artist:path.resolve(__dirname,'../dist/page/hot_artist.html'),
    billboard:path.resolve(__dirname,'../dist/page/billboard.html'),
    search_result:path.resolve(__dirname,'../dist/page/search_result.html'),
    play_music:path.resolve(__dirname,'../dist/page/play_music.html'),
    all_forum:path.resolve(__dirname,'../dist/page/all_forum.html'),
    publish_page:path.resolve(__dirname,'../dist/page/publish_page.html'),
    forum_page:path.resolve(__dirname,'../dist/page/forum_page.html'),
    show_forum:path.resolve(__dirname,'../dist/page/show_forum.html'),
    manage:path.resolve(__dirname,'../dist/page/manage.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',//on build update  ./

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
