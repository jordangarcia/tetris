module.exports = {
  entry: './src/main.js',
  output: {
    filename: "./app/tetris.js",
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
