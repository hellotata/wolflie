
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      path.join(__dirname, '../src/client/index.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss?/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
