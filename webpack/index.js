import path from "path";
import webpack from "webpack";

const config = {
  entry: "./app",
  output: {
    filename: "bundle.js",
    path: "./webpack/"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: "babel", exclude: path.resolve(__dirname, "../node_modules") }
    ]
  }
};

export default config;
