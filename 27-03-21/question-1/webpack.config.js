const path = require('path');

module.exports = {
  devServer: {
    contentBase: './public',
  },
  devtool: 'source-map',
  entry: './src/index.tsx',
  mode: 'development',
  optimization: {
    usedExports: true,
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    symlinks: false,
  },
  watch: true,
};
