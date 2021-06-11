const path = require('path');

module.exports = {
  entry: {
    main: './src/assets/js/main.js'
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].js'
  },
  // externals: {
  //   jquery: 'jQuery'
  // }
};