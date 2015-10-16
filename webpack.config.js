module.exports = {
  entry: {
    tetris: './src/main.js',
    example: './src/pages/example/main.js',
    helpers: './src/pages/helper_examples/main.js',
  },

  output: {
    path: './app/',
    filename: "[name].js",
  },
  module: {
    loaders: [
      { test: /\.js$/,    loader: "babel-loader" },
    ]
  },
};
