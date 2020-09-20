const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),  // 开启全局的模块热替换
    new webpack.NamedModulesPlugin()  // 当模块热替换时在浏览器控制台输出对用户更友好的模块名信息
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true // 开启热更新
  }
})