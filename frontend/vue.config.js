module.exports = {
  runtimeCompiler: true,
  publicPath: "[{[ .StaticURL ]}]",
  parallel: 2,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8095/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
        ws: true,
      },
    },
  },
};
