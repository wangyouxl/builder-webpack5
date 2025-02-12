// 单元测试 用来检测打包后是否生成了html 文件
const glob = require("glob-all");

describe("Checking generated html files", () => {
  it("should generate html files", (done) => {
    const files = glob.sync(["./dist/index.html", "./dist/search.html"]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error("no html files generated");
    }
  });
});
