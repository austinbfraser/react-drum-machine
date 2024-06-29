const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const current_mode = 'development';
// const current_mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
  entry: './app.jsx',
  mode: current_mode,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html',
    })
  ],
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.join(__dirname, 'build'),
    },
    port: 8080,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000'
      },
    ],
  },
};
