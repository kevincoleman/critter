"use strict";

var path = require("path");
var webpack = require("webpack");
var helpers = require("./helpers");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var AwesomeTypescriptLoader = require("awesome-typescript-loader");
var ForkCheckerPlugin = AwesomeTypescriptLoader.ForkCheckerPlugin;
var ENV = process.env.ENV = process.env.NODE_ENV = "development";
var HMR = helpers.hasProcessFlag("hot");

var metadata = {
  title: "Angular 2 Base Project",
  baseUrl: "/",
  host: "localhost",
  port: 3000,
  ENV: ENV,
  HMR: HMR
};

var config = {
  src : helpers.root("src"),
  dist: helpers.root("dist")
};
config.scripts  = path.join(config.src, "scripts");
config.styles   = path.join(config.src, "styles");
config.images   = path.join(config.src, "images");

var webpackConfig = {
  // static data for index.html
  metadata: metadata,
  devtool: "inline-source-map",
  debug: true,
  // our angular app
  entry: {
    "polyfills" : path.join(config.scripts, "polyfills.ts"),
    "vendor"    : path.join(config.scripts, "vendor.ts"),
    "main"      : path.join(config.scripts, "main.ts"),
    "styles"    : path.join(config.styles,  "main.scss")
  },
  resolve: {
    extensions: ["", ".ts", ".js", ".json", ".jade"],
    // Enables `require "myMod"` instead of `require "src/scripts/myMod"`
    modulesDirectories: ["node_modules", "src/scripts"],
    alias: {
      // Example: require("images/foo.jpg")
      "images": path.join(config.src, "images")
    }
  },
  // Config for build files
  output: {
    path: config.dist,
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id].chunk.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/, loader: "tslint-loader",
        exclude: [helpers.rootNode("")]
      }
    ],
    // Loaders can have long strings, linter should ignore just this section
    /* tslint:disable:max-line-length */
    loaders: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript",
        query: {
          "tsconfig": "src/tsconfig.json"
        },
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      // Support for requiring html as raw text
      {
        test: /\.html$/,
        loader: "html"
      },
      // Support inline SVG as raw HTML-like string
      {
        test: /\.svg$/,
        loader: "html",
        include: config.scripts
      },
      // Support image files
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url?limit=10000&name=/images/[name]-[hash].[ext]"
      },
      // Support font files
      {
        test: /\.(eot|woff|ttf|svg)$/,
        loader: "url?limit=10000&name=/fonts/[name]-[hash].[ext]",
        exclude: config.scripts
      },
      // Support for CSS as raw text
      {
        test: /\.css$/,
        loaders: [
          "exports-loader?module.exports.toString()",
          "css-loader?sourceMap"
        ],
        include: config.scripts
      },
      // Support for SCSS as raw text
      {
        test: /\.scss$/,
        loaders: [
          "exports-loader?module.exports.toString()",
          "css?sourceMap",
          "postcss",
          "resolve-url?sourceMap",
          "sass?sourceMap&outputStyle=expanded"
        ],
        include: config.scripts
      },
      // Support for styles as external files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader",
          "css-loader?sourceMap!postcss-loader!resolve-url?sourceMap!sass-loader?sourceMap&outputStyle=expanded"),
        exclude: config.scripts
      },
      // Allow direct import of json files
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  postcss: function() { return [autoprefixer({ browsers: ["last 1 version"] })]; },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["main", "vendor", "polyfills"], minChunks: Infinity
    }),
    // static assets
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.ejs",
      chunksSortMode: "none",
      inject: false
    }),
    new ExtractTextPlugin("./styles/[name].css"),
    new webpack.DefinePlugin({
      "ENV": JSON.stringify(ENV),
      "HMR": HMR
    })
  ],
  // Other loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: "src"
  },
  // Dev server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000 // TODO: Does this enable polling?
    }
  }
};
module.exports = webpackConfig;

