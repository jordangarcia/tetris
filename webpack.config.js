module.exports = {
  entry: {
    tetris: './src/main.js',
    example: './src/example/main.js',
  },

  output: {
    path: './app/',
    filename: "[name].js",
  },
  module: {
    loaders: [
      // required for react jsx
      { test: /\.js$/,    loader: "jsx-loader" },
      { test: /\.jsx$/,   loader: "jsx-loader?insertPragma=React.DOM" },
      { test: /\.js$/, loader: 'jstransform-loader' },
    ]
  },
};
