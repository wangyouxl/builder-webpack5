const path = require('path');
const glob = require('glob');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = process.cwd(); // 运行时的当前的目录

const WebpackBar = require('webpackbar');
// 动态的获取文件目录,设置 entry 和 HtmlWebpackPlugin ,从而实现多文件打包通用方案
const setMPA = () => {
  const entry = {
    // flexible: path.resolve(__dirname, "node_modules/lib-flexible/flexible.js"),
  };
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync('src/**/index.js');
  entryFiles.forEach((entryFile) => {
    const entryName = path.basename(path.dirname(entryFile));
    entry[entryName] = path.resolve(projectRoot, entryFile);
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${entryName}/${entryName}.html`),
        filename: `${entryName}.html`,
        // chunks: [entryName, "flexible"],
        chunks: [entryName],
        templateParameters: {
          jsPath: path.resolve(
            projectRoot,
            'node_modules/lib-flexible/flexible.js',
          ),
          jsFile: fs.readFileSync(
            path.resolve(projectRoot, 'node_modules/lib-flexible/flexible.js'),
            'utf-8',
          ),
        },

        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });
  return {
    entry,
    htmlWebpackPlugin,
  };
};
const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /.js$/,
        use: ['babel-loader'],
      },
      {
        test: /.css$/,
        /**
         * css-laoder 用于加载 .css文件,并且转换成 commonjs 对象
         * style-loader 将样式通过 style标签插入到 head 标签中
         * loader 的调用是链式调用,调用方式是从右到左。
         * MiniCssExtractPlugin 将 css 提取出成一个文件
         */
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 样式增强
        ],
      },
      /**
       * less/sass 的解析就是在 css 的解析之上增加 less-loader/sass-loader
       */
      {
        test: /.less$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader', // 样式增强
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // rem相对于px的值 也就是1rem = 75px
              remPrecesion: 8, // px转化为rem时保留的小数点位数
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|svg)/,
        use: [
          // {
          //   loader: "url-loader",
          //   options: {
          //     limit: 1024000, //限制大小10k  单位字节
          //   },------
          // },
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      /**
       * 对字体的解析
       */
      {
        test: /.(woff|woff2|eto|otf)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理构建目录
    new WebpackBar(), // 优化构建时命令行的显示日志
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css', // 将css抽离成一个文件 加上文件指纹
    }),
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only', // 只在发生错误时输出；
};
