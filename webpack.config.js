const path = require("path");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: {
    main: "./src/index.js",
    "config/config": "./src/optionsController",
    downloadManager: "./src/downloadsController",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
