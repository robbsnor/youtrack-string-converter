const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
  entry: {
    main: "./src/js/main.js"
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "[name].js"
  },
  externals: {
    jquery: 'jQuery'
  }
};