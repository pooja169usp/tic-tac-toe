module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: [
    "babel-polyfill",
    "./src/index.js"
  ],
  output: {
    libraryTarget: "this",
    filename: "./bundle.js",
    path: __dirname + "/build"
  },
  devServer: {
    inline: true,
    port: 8090
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // search for js files
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env","@babel/preset-react", {'plugins': ['@babel/plugin-proposal-class-properties']}]
        }
      }
    ]
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
  }
};