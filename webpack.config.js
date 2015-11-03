module.exports = {
  entry: {
    tetris: './src/main.js',
    //example: './src/pages/example/main.js',
    '../exports': './src/exports',
  },
  output: {
    path: './app/',
    filename: "[name].js",
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/,  exclude: /node_modules/,  loader: "babel-loader" },
    ]
  },
};
