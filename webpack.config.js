const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const buildInfo = {
  version: require('./package.json').version,
  buildDate: new Date().toISOString(),
  commitHash: require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim(),
};

const definedVariables = {
  BUILD_INFO: JSON.stringify(buildInfo),
};

console.log('definedVariables', definedVariables);

// https://webpack.js.org/guides/typescript/
module.exports = {
  target: 'web',
  entry: {
    'index': './src/index.ts',
    'browser': './src/browser.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //sourceMap: true,
        extractComments: false,
        terserOptions: {
          ecma: 5,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin(definedVariables),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};
