var glob = require("glob");
var path = require("path");
var webpack = require("webpack");

new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
});

module.exports = {
  mode: "production",
  entry: {
    main: "./src/js/main.js"
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "[name].js"
  }
};
