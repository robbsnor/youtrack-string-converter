const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
  entry: {
    main: "./src/js/main.js"
  },
  module: {
    rules: [{
      test: /\.s?css$/i,
      use: [
        MiniCssExtractPlugin.loader, // generate seperate css
        {
          loader: 'css-loader',
          options: {
            url: false // ignore images
          }
        },
        'sass-loader' // load scss
      ]
    }]
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "[name].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'all.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  }
};