module.exports = {
  entry: {
    tetris: './src/main.js',
    //example: './src/pages/example/main.js',
    helpers: './src/pages/helper_examples/main.js',
    '../exports': './src/exports',
  },
  output: {
    path: './app/',
    filename: "[name].js",
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/,    loader: "babel-loader" },
    ]
  },
};
