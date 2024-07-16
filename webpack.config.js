const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// const current_mode = 'development';
const current_mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
  entry: './index.js',
  mode: current_mode,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    publicPath: '/'
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
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(ogg|mp3|wav)$/i,
        type: 'asset/resource'
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
    port: 8080,
    proxy: [
      {
        context: ['/kits'],
        target: 'http://localhost:3000'
      },
    ],
  },
};
