const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: ['file-loader']
      },
      {
        test: /\.(mp3|wav|mpe?g)$/,
        use: ['file-loader']
      },
      {
        test: /\.(gltf)$/,
        use: ['gltf-webpack-loader']
      },
      {
        test: /\.(bin)$/,
        use: ['file-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js' ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public/index.html')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
  ]
}