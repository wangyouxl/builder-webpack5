const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimize: true, // 启动代码压缩
    minimizer: [
      new CssMinimizerPlugin(), // css 压缩
      new TerserPlugin(), // js 压缩
    ],
    splitChunks: {
      // 分离公共包
      minSize: 0, // 引用模块的大小
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2, // 引用模块的次数
        },
      },
    },
  },
  externals: {
    // 输出的bundle中排除依赖
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

module.exports = merge(baseConfig, prodConfig);
