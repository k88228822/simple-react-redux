const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jsx|js)$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanPlugin(),
    new HtmlPlugin({template: path.join(__dirname, 'public/index.html'), templateParameters: {title: 'simple-react-redux'}})
  ]
}