module.exports = {
  entry: {
    tetris: './src/main.js',
    example: './src/pages/example/main.js',
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
