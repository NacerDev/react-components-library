const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const miniCssPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[hash].css',
})
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})
module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    entry: path.join(__dirname, 'src', 'index'),
    output: {
      publicPath:argv.mode==="development"?"":"http://127.0.0.1:8000/",
      path: path.resolve('dist'),
      filename: 'ryde.min.js',
      chunkFilename: '[chunkhash:8].chunk.js',
      library: ["RYDE"],
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          oneOf: [
            {
              resourceQuery: /^\?raw$/,
              use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                'sass-loader'
              ]
            },
            {
              use: [
                argv.mode == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: "[name]_[local]_[hash:base64:5]",
                  }
                },
                'sass-loader'
              ]
            }]


        },
        {
          // Exclude `js` files to keep "css" loader working as it injects
          // its runtime that would otherwise be processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/,/\.(sa|sc|c)ss$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'media/[name].[hash:8].[ext]',
          },
        }
      ]
    },
    plugins: [htmlPlugin, miniCssPlugin],
    resolve: {
      extensions: ['.json', '.js', '.jsx']
    },
  }

};