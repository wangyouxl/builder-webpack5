const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf");

process.chdir(path.join(__dirname, "template")); // 进入到当前template目录

const Mocha = require("mocha");
const mocha = new Mocha({
  timeout: 10000,
});

rimraf.native("./dist", {}, (err) => {
  console.error("delete dist error");
});

const prodConfig = require("../../lib/webpack.prod.js");

webpack(prodConfig, (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
    })
  );

  console.log(" Webpack build success! begin run test.");

  mocha.addFile(path.join(__dirname, "html-test.js"));
  mocha.addFile(path.join(__dirname, "css-js-test.js"));

  mocha.run();
});
