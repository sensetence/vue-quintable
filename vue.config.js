const path = require('path');

module.exports = {
    outputDir: process.env.BUILD_MODE === 'build' ? path.resolve(__dirname, "built") : path.resolve(__dirname, "dist"),
    publicPath: process.env.BUILD_MODE === 'build' ? '/vue-quintable-demo' : '/',
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8081, // CHANGE YOUR PORT HERE!
        https: true,
        hotOnly: false,
    },
}