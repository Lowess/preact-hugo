const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat",
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact/compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact/compat/lib/react-dom-factories'
    }
  },

  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery",
    "bootstrap": "bootstrap"
  },

  entry: {
    main: path.join(__dirname, "src", "index.js"),
    bootstrap: path.join(__dirname, "node_modules/bootstrap/js/dist", "index.js"),
  },

  output: {
    path: path.join(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]",
        options: {
          outputPath: 'preact-hugo',
        },
      },

      {
        loader: "json-loader",
        test: /\.json$/
      },

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true }
      },

      {
        // For app .css files except from node_modules
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },

      // {
      //   // For vendors .css files in node_modules
      //   test: /\.css$/,
      //   include: /node_modules/,
      //   use: ['style-loader', 'css-loader']
      // }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true
    }),

    new CopyWebpackPlugin([
      {
        from: "./src/fonts/",
        to: "fonts/",
        flatten: true
      }
    ]),

    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
  ]
};
