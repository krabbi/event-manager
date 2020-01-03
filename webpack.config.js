const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = env => {
  const config = {};
  config.mode = 'development';
  config.resolve = {
    extensions: ['.js', '.jsx'],
  };
  config.entry = {
    app: ['./src/Root.js'],
    vendor: ['react', 'react-dom'],
  };
  config.output = {
    path: path.join(__dirname, 'build/'),
    filename: 'js/[name].js',
    chunkFilename: 'js/chunks/[name].js',
    publicPath: '/',
    pathinfo: true,
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  };
  config.devtool = 'cheap-module-source-map';
  config.module = {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
    ],
  };
  config.plugins = [
    new HtmlWebpackPlugin({
      title: 'ElIoT',
      hash: true,
      cache: true,
      template: './src/index.html',
      // filename: '../index.html',
      showErrors: true,
    }),
  ];
  config.devServer = {
    publicPath: config.output.publicPath,
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    port: 3333,
    historyApiFallback: true,
    compress: false,
  };

  return config;
};
