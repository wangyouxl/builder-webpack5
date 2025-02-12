const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: './dist', // 服务的基础目录
    hot: true, // 开启热更新
    open: true, // 打开浏览器
  },
  devtool: 'source-map', // 产生.map文件 映射源代码的关系
};

module.exports = merge(baseConfig, devConfig);
