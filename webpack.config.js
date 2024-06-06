import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin';

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
  new HtmlWebpackPlugin({
    template: "./static/index.ejs",
  }),

  new SimpleProgressWebpackPlugin()
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

export default {
  mode,
  target,
  plugins,
  devtool: "source-map",
  entry: "./src/index.tsx", // Use TypeScript file extension

  devServer: {
    static: path.resolve(process.cwd(), "./build"),
    hot: true,
    historyApiFallback: true,
    port: 8005
  },
  stats: "errors-only",
  output: {
    path: path.resolve(process.cwd(), "./build"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
    publicPath: "/",
  },

  watchOptions: {
    ignored: ['**/node_modules'],
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]-[hash:base64:8]",
                auto: true,
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
    
  },
  resolve: {
    extensions: [".ts", ".tsx", ".d.ts", ".js", ".jsx"]
},
};
