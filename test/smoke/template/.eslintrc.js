module.exports = {
  root: true, // 表示当前是根配置
  parser: "@babel/eslint-parser", //指定解析器
//   extends: "airbnb", //继承 airbnb 的配置
  parserOptions: {
    requireConfigFile: false, // 如果你不需要单独的 Babel 配置文件，可设置为 false
    babelOptions: {
      presets: ["@babel/preset-env"], // 根据你的项目需求调整 Babel 配置
    },
  },
  env: {
    // 指定环境
    browser: true,
    node: true,
  },
  //   rules: {
  //     "no-unused-vars": "warn", // 禁止未使用的变量
  //     semi: ["error", "always"], // 必须使用分号
  //   },
};
