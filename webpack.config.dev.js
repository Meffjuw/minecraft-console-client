// import plugins
const HtmlWebPackPlugin     = require("html-webpack-plugin");
const path                  = require('path');
const webpack               = require("webpack");
const tsImportPluginFactory = require('ts-import-plugin');

// initialize plugins
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

const hmr = new webpack.HotModuleReplacementPlugin();

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app-dev.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
        // {
        //   loader: 'ts-loader',
        //   options: {
        //     transpileOnly: true,
        //     experimentalWatchApi: true,
        //     getCustomTransformers: () => ({
        //       before: [ tsImportPluginFactory({
        //         libraryName: 'antd',
        //         style: 'css',
        //       }) ]
        //     })
        //   },
        // },
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: ['react-hot-loader/babel'],
          },
        },
        {
          loader: 'awesome-typescript-loader',
          options: {
              useCache: true,
              useBabel: true, // !important!
              getCustomTransformers: () => ({
                  before: [tsImportPluginFactory({
                      libraryName: 'antd',
                      style: 'css',
                  })],
                }),
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
  devServer: {
    hot: true,
    inline: true,
    port: 3000
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  plugins: [htmlPlugin, hmr]
}