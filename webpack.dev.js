const path = require('path');
const {merge} = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge({
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 5000,
      open: true,
    },
  },
  common,
);
