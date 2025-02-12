// 作为单元测试的入口文件
const path = require("path");

process.chdir(path.join(__dirname, "smoke/template")); // 进入到当前template目录

describe("builder-webpack test case", () => {
  require("./unit/webpack-base-test");
});
