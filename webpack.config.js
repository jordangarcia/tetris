var path = require("path");
var webpack = require("webpack");

/**
 * Joins the inputted path with the current dir
 */
var dir = function(inp) {
  return path.join(__dirname, inp)
}

module.exports = {
  context: dir('app'),
  entry: './app',
  output: {
    path: dir('dist'),
    filename: "bundle.js",
  },
  resolve: {
    root: dir('app'),
  },
  module: {
    loaders: [
      // required to write "require('./style.css')"
      { test: /\.css$/,    loader: "style-loader!css-loader" },

      // required for react jsx
      { test: /\.js$/,    loader: "jsx-loader" },
      { test: /\.jsx$/,   loader: "jsx-loader?insertPragma=React.DOM" },
    ]
  },
};
