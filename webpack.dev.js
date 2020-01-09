var glob = require("glob");
var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/js/main.js",
    dev: glob.sync("./src/js/dev/*.js")
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "[name].js"
  }
};
