const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  runtimeCompiler: true,
  publicPath: "/static/",
  parallel: 2,
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        include: /\.js$/,
        deleteOriginalAssets: true,
      }),
    ],
  },
};
