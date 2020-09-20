const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    index: ['@babel/polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            babelrc: false, // 不采用.babelrc的配置
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              publicPath: '../'
            },
          },
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: 'css-loader',
            options: {
              url: true,
              modules: 'global'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'images/',
            limit: 10 * 1024,
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.vue', '.js'
    ],
    modules: ["node_modules"],
    alias: {
      vue: 'vue/dist/vue.min.js',
      components: path.resolve(__dirname + '/src/components/'),
      '@': path.resolve('src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true
      },
      chunks: ['index'],
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    })
  ]
}