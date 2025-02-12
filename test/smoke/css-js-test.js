// 单元测试 用来检测打包后是否生成了 css js 文件
const glob = require("glob-all");

describe("Checking generated css js files", () => {
  it("should generate html files", (done) => {
    const files = glob.sync([
      "./dist/index_*.js",
      "./dist/index_*.css",
      "./dist/search_*.css",
      "./dist/search_*.js",
    ]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error("no css js files generated");
    }
  });
});
