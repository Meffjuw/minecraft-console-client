// import plugins
const HtmlWebPackPlugin     = require("html-webpack-plugin");
const path                  = require('path');
const webpack               = require("webpack");
const tsImportPluginFactory = require('ts-import-plugin');
const UglifyJsPlugin        = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin     = require("compression-webpack-plugin");

// initialize plugins
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

const uglifyjs = new UglifyJsPlugin();

const prodenv = new webpack.DefinePlugin({ // <-- key to reducing React's size
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

const ignore = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

const analyzer = new BundleAnalyzerPlugin();

const compressor = new CompressionPlugin({
  asset: "[path].gz[query]",
  algorithm: "gzip",
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0.8
});

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "dist/renderer"),
    filename: "[name].js",
  },
  module: {
    rules: [
        {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              getCustomTransformers: () => ({
                before: [ tsImportPluginFactory({
                  libraryName: 'antd',
                  style: 'css',
                }) ]
              })
            },
          },
        ],
        exclude: /node_modules/
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }, {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   importLoaders: 1,
            //   localIdentName: "[name]_[local]_[hash:base64]",
            //   sourceMap: true,
            //   minimize: true
            // }
          }
        ]
      }, {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   importLoaders: 1,
            //   localIdentName: "[name]_[local]_[hash:base64]",
            //   sourceMap: true,
            //   minimize: true
            // }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  plugins: [htmlPlugin, prodenv, analyzer, ignore, compressor],
  optimization: {
    minimizer: [uglifyjs],
  }
}