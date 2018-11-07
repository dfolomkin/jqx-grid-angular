const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: {
    angular: ['angular', 'angular-resource'],
    app: './src/app/app.module.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2'],
            plugins: [['angularjs-annotate', { explicitOnly: true }]]
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../css/'
            }
          },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(png|svg|gif)$/,
        use: { loader: 'url-loader' }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.less'],
    alias: {}
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.template.html',
      hash: true,
      minify: {
        collapseWhitespace: true
      },
      inject: 'head'
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/jquery/dist/jquery.min.js', to: 'js/' },
      {
        from: 'node_modules/jqwidgets-framework/jqwidgets/jqxcore.js',
        to: 'js/'
      },
      {
        from: 'node_modules/jqwidgets-framework/jqwidgets/jqx-all.js',
        to: 'js/'
      },
      {
        from: 'node_modules/jqwidgets-framework/jqwidgets/jqxangular.js',
        to: 'js/'
      },
      {
        from: 'node_modules/jqwidgets-framework/jqwidgets/styles/jqx.base.css',
        to: 'css/'
      },
      {
        from: 'node_modules/jqwidgets-framework/jqwidgets/styles/images/',
        to: 'css/images/',
        toType: 'dir',
        test: /icon-.+\.png$/
      }
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'js/jquery.min.js',
        'js/jqxcore.js',
        'js/jqx-all.js',
        'js/jqxangular.js'
      ],
      append: true
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['css/jqx.base.css'],
      append: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9003,
    hot: true
  }
};
