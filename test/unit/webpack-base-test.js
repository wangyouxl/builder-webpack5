//单元测试
const assert = require("assert"); //用assert进行断言

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base");
  console.log(baseConfig);

  it("entry", () => {
    //it 表示一个测试用例
    assert.equal(
      baseConfig.entry.search,
      "C:\\Users\\Administrator\\Desktop\\webpack学习\\my-project\\bulider-webpack\\test\\smoke\\template\\src\\search\\index.js"
    );
    assert.equal(
      baseConfig.entry.app,
      "C:\\Users\\Administrator\\Desktop\\webpack学习\\my-project\\bulider-webpack\\test\\smoke\\template\\src\\app\\index.js"
    );
  });
});
