//单元测试
const assert = require("assert"); //用assert进行断言

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base");
  console.log(baseConfig);

  it("entry", () => {
    //it 表示一个测试用例
    assert.equal(
      baseConfig.entry.search.indexOf(
        "bulider-webpack/test/smoke/emplate/src/search/index.js"
      ) > -1,
      true
    );
    assert.equal(
      baseConfig.entry.app.indexOf(
        "bulider-webpack/test/smoke/emplate/src/app/index.js"
      ) > -1,
      true
    );
  });
});
