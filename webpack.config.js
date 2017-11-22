const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
const UglifyES = require('uglify-es');

const extractSass = new ExtractTextPlugin({
  filename: '../css/style.mini.css',
  disable: false,
  allChunks: true
});

const noBootstrap = new MergeIntoSingleFilePlugin({
  files: {
    'jquery-func.mini.js': [
      './src/js/jquery-func.js'
    ],
    'ang-func.mini.js': [
      './src/js/ang-func.js'
    ]
  },
  transform: {
    'jquery-func.mini.js': code => UglifyES.minify(code).code,
    'ang-func.mini.js': code => UglifyES.minify(code, {mangle: false}).code
  }
});

const copyImg = new CopyWebpackPlugin([{
  from: './src/assets',
  to: '../img'
}]);

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

module.exports = {
  watch: true,
  entry: {
    index: './src/index.html',
    partials: ['./src/partials/about.html', './src/partials/contact.html', './src/partials/main.html', './src/partials/portfolio.html'],
    scripts: ['./src/js/main.js', './src/js/ang-func.js', './src/js/jquery-func.js', './src/sass/style.scss']
  },
  output: {
    filename: '[path][name].[ext]',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
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
    },
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
      test: /\.html$/,
      loaders: [
        'file-loader?publicPath=/,name=[path][name].[ext]',
        {
          loader: 'html-minify-loader',
          options: {
            quotes: true,
            dom: { lowerCaseTags: false },
            plugins: [{
              id: 'uglify-es',
              element: function element (node, next) {
                if (node.type === 'script' && node.children[0] !== undefined) {
                  let inlineJS = node.children[0].data;
                  inlineJS = UglifyES.minify(inlineJS);
                  // console.log(inlineJS.code);
                  node.children[0].data = inlineJS.code;
                }
                next();
              }
            }]
          }
        }
      ]
    }]
  },
  plugins: [
    extractSass,
    noBootstrap,
    copyImg,
    miniImg,
    new BitBarWebpackProgressPlugin(),
    friendlyErrors
  ]
};
