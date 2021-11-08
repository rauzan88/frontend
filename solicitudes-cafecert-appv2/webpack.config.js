const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: "./src/main.ts",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src/app/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader", "angular2-template-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },

      // workaround for warning: System.import() is deprecated and will be removed soon. Use import() instead.
      {
        test: /[\/\\]@angular[\/\\].+\.js$/,
        parser: { system: true },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: '../.env'}),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      // global app config object
      "process.env":  JSON.stringify(
        //ip qa
        process.env.FRONTEND,
        process.env.REPORTESBUSINESS,
        process.env.INFOBASEBUSINES,
        process.env.LOGIN,
        process.env.USERBUSSINESS,
        process.env.EVENTBUSINESS,
        process.env.NEXT,
        process.env.FILECRUD,
        process.env.FILEBUSINESS,
        process.env.EVALUATIONBUSINESS,
        process.env.CERTIFBUSINESS

        ///---------------------
        //ip des
        // frontend: 'http://192.168.24.238:8070',
        // requestbusiness: "http://192.168.24.238:8071",
        // infobasebusines: "http://192.168.24.238:8063",
        // login: "http://192.168.24.238:8077",
        // userbusiness: "http://192.168.24.238:8078",
        // eventbusiness: "http://192.168.24.238:8067",
        // next: "http://192.168.24.238:8082",
        // filecrud: "http://192.168.24.238:8061",
        // filebusiness: "http://192.168.24.238:8060",
        // evaluationbusiness: "http://192.168.24.238:8057",
        // certifbusiness: "http://192.168.24.238:8074",

        /*frontend: 'http://localhost:8070',
                requestbusiness: 'http://localhost:8071',
                infobasebusines: 'http://localhost:8063',
                login: 'http://localhost:8077',
                userbusiness: 'http://localhost:8078',
                eventbusiness: 'http://localhost:8067',
                next: 'http://localhost:8082',
                filecrud: 'http://localhost:8061',
                filebusiness: 'http://localhost:8060',
                evaluationbusiness: 'http://localhost:8057',
                certifbusiness: 'http://localhost:8074',*/
      ),
    }),

    // workaround for warning: Critical dependency: the request of a dependency is an expression
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.resolve(__dirname, "src")
    ),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: true,
  },
  devServer: {
    historyApiFallback: true,
  },
};