
const
  path = require('path'),
  webpack = require('webpack');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin('[name].bundle.css');

const config = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'docs/build/'),
    filename: 'rmr-cinema.bundle.js'
  },
  mode: 'development',
//  mode: 'production',
  watch: true,
  plugins: [
//     new webpack.optimize.UglifyJsPlugin({
//       compress: { warnings: false }
//     })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
//        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015']
            ]
          }
        }]
      }
    ]
  }
};

module.exports = config;
