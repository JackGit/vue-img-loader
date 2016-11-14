'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'vue-img-loader': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    library: 'VueImgLoader',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  },
  plugins: [
    /*new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })*/
  ]
};
