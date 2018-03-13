import path from 'path';

const include = path.join(__dirname, 'src');

export default {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    library: 'sygicMapsServices',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", include }
    ]
  },
  resolve: {
    extensions: ['.json', '.js']
  }
};