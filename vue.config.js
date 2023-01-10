const path = require("path");
const fs = require("fs");

module.exports = {
  outputDir:
    process.env.BUILD_MODE === "build"
      ? path.resolve(__dirname, "built")
      : process.env.BUILD_DEST_DIRECTORY
      ? process.env.BUILD_DEST_DIRECTORY
      : path.resolve(__dirname, "dist"),
  publicPath: process.env.BUILD_MODE === "build" ? "/vue-quintable-demo" : "/",
  devServer: {
    server: {
      type: "https",
      options: {
        key: fs.readFileSync("./certs/example.com+5-key.pem"),
        cert: fs.readFileSync("./certs/example.com+5.pem"),
      },
    },
    port: 8080,
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: path.resolve(__dirname, "node_modules/vue/dist/vue.esm.js"),
      },
      symlinks: false, // because the related errors on try to use the `yarn link` in a vue-cli project
    },
  },
};
