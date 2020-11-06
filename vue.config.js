const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  outputDir: process.env.BUILD_MODE === 'build' ? path.resolve(__dirname, "built") : path.resolve(__dirname, "dist"),
  publicPath: process.env.BUILD_MODE === 'build' ? '/vue-quintable-demo' : '/',
}
