const path = require('path');

module.exports = {
    outputDir: process.env.BUILD_MODE === 'build' ? path.resolve(__dirname, "built") : (process.env.BUILD_DEST_DIRECTORY ? process.env.BUILD_DEST_DIRECTORY : path.resolve(__dirname, "dist")),
    publicPath: process.env.BUILD_MODE === 'build' ? '/vue-quintable-demo' : '/',
}