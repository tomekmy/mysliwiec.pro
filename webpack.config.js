const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

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
    'jquery-func.mini.js': code => require('uglify-es').minify(code).code,
    'ang-func.mini.js': code => require('uglify-es').minify(code, {mangle: false}).code
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
  entry: ['./src/js/main.js', './src/js/ang-func.js', './src/js/jquery-func.js', './src/sass/style.scss'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/js')
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
    }]
  },
  plugins: [
    extractSass,
    noBootstrap,
    copyImg,
    miniImg,
    friendlyErrors
  ]
};
