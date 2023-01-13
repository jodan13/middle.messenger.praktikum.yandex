const {merge} = require('webpack-merge');
const path = require('path');

const common = require('./webpack.config.js');
module.exports = merge({
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[fullhash:8].js',
    },
  },
  common,
);
