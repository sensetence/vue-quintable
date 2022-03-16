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
    https: {
      key: fs.readFileSync("./certs/example.com+5-key.pem"),
      cert: fs.readFileSync("./certs/example.com+5.pem"),
    },
    public: "https://localhost:8080/",
  },
};
