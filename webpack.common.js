const path = require("path");



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