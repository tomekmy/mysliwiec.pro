'use strict';

// Add all required plugins
const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
const UglifyES = require('uglify-es');
const WebpackCleanPlugin = require('webpack-clean');

// SASS post processor configuration
const extractSass = new ExtractTextPlugin({
  filename: '../css/style.mini.css',
  disable: false,
  allChunks: true
});

// Process and minify scripts files
const noBootstrap = new MergeIntoSingleFilePlugin({
  files: {
    'ownScriptsBundle.min.js': [
      './src/js/jquery-func.js',
      './src/js/ang-func.js'
    ],
    'localDependencyBundle.min.js': [
      './src/js/jquery-ui.min.js',
      './src/js/jquery.lettering-0.6.1.min.js',
      './src/js/jquery.textillate.js',
      './src/js/enter-view.min.js'
    ]
  },
  transform: {
    'ownScriptsBundle.min.js': code => UglifyES.minify(code).code,
    'localDependencyBundle.min.js': code => UglifyES.minify(code).code
  }
});

// Copy and process image files
const copyFiles = new CopyWebpackPlugin([
  {
    from: './src/assets',
    to: '../img'
  }
]);

// Image mini plugin configuration
const miniImg = new ImageminPlugin({
  test: /\.(jpe?g|png|gif|svg)$/i,
  minFileSize: 50000,
  optipng: {
    optimizationLevel: 7
  },
  pngquant: {
    quality: '65-90'
  }
});

// Display friendly errors plugin configuration
const friendlyErrors = new FriendlyErrorsWebpackPlugin({
  compilationSuccessInfo: {
    messages: ['You application is ready!'],
    notes: ['No additionnal notes.']
  },
  onErrors: function (severity, errors) {
    // You can listen to errors transformed and prioritized by the plugin
    // severity can be 'error' or 'warning'
  },
  // should the console be cleared between each compilation?
  // default is true
  clearConsole: true,

  // add formatters and transformers (see below)
  additionalFormatters: [],
  additionalTransformers: []
});

// Delete unnecessary files after compile
const cleanFiles = new WebpackCleanPlugin(['main.js'], path.join(__dirname, 'dist/js'));

// Webpack 2 modules, loaders and plugins call
module.exports = {
  watch: true,
  entry: ['./src/index.html', './src/partials/about.html', './src/partials/contact.html', './src/partials/main.html', './src/partials/portfolio.html', './src/js/main.js', './src/js/ang-func.js', './src/js/jquery.textillate.js', './src/js/jquery-func.js', './src/sass/style.scss'],
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist/js')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
          }
        }]
      },
      {
        test: /\\index.html$/,
        loaders: [
          'file-loader?publicPath=/,name=../[name].[ext]',
          {
            loader: 'html-minifier-loader',
            options: {
              removeComments: false,
              minifyCSS: true,
              minifyJS: true
            }
          }
        ]
      },
      {
        test: path.resolve(__dirname, './src/partials'),
        loaders: [
          'file-loader?publicPath=/,name=../partials/[name].[ext]',
          {
            loader: 'html-minifier-loader',
            options: {
              removeComments: false,
              minifyCSS: true,
              minifyJS: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              url: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: { url: false }
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader'
      }]
  },
  plugins: [
    extractSass,
    noBootstrap,
    copyFiles,
    miniImg,
    new BitBarWebpackProgressPlugin(),
    cleanFiles,
    friendlyErrors
  ]
};
