const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      static: path.resolve(__dirname, 'static'),
      handlebars: 'handlebars/dist/handlebars.js'
    },
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(
    {
      filename: 'index.html',
      template: 'static/index.html',
    }
  )],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 5000,
    open: true,
  },
};
