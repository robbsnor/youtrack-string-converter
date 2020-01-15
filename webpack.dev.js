var glob = require("glob");
var path = require("path");
var webpack = require("webpack");



new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
});

module.exports = {
  mode: "development",
  entry: {
    main: "./src/js/main.js",
    dev: glob.sync("./src/js/dev/*.js")
  },
  module: {
    rules: [{
      test: /\.s?css$/i,
      use: [
        'style-loader',        
        {
          loader: 'css-loader',
          options: {
            url: false
          }
        },
        'sass-loader'
      ]
    }]
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "[name].js"
  }
};