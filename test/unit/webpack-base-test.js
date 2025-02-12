//单元测试
const assert = require("assert"); //用assert进行断言

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base");

  console.log(baseConfig.entry.search);
  console.log(baseConfig.entry.app);

  it("entry", () => {
    //it 表示一个测试用例
    assert.equal(
      baseConfig.entry.search.indexOf(
        "builder-webpack5/test/smoke/template/src/search/index.js"
      ) > -1,
      true
    );
    assert.equal(
      baseConfig.entry.app.indexOf(
        "builder-webpack5/test/smoke/template/src/app/index.js"
      ) > -1,
      true
    );
  });
});
