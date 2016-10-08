// var autoprefixer = require('autoprefixer');
var webpack = require("webpack");
var path = require("path");

// https://github.com/petehunt/webpack-howto
// https://github.com/ruanyf/webpack-demos/blob/master/README.md#demo09-environment-flags-source
// more the latter

var envVar = new webpack.DefinePlugin({

  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'none'),


  // __STAGING__: JSON.stringify(JSON.parse(process.env.STAGING || false)),
  // __PROD__: JSON.stringify(JSON.parse(process.env.PROD || false))
});

// on multiple loaders
// https://github.com/gaearon/react-hot-loader/issues/141

module.exports = {
  // entry: "./dev/js/calculator.js",
  entry: {
    // calculator: ['./dev/js/calculator.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://0.0.0.0:3000'],
    calculator: ['./dev/js/calculator.js', 'webpack/hot/only-dev-server'],
    localWeather: ['./dev/js/localWeather.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://0.0.0.0:3000'],
    randomQuotes: ['./dev/js/randomQuotes.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://0.0.0.0:3000'],
    pomodoroClock: ['./dev/js/pomodoroClock.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://0.0.0.0:3000'],
    barChart: ['./dev/js/barChart.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://0.0.0.0:3000']
    
    // calculator: './dev/js/calculator.js',
    // localWeather: './dev/js/localWeather.js',
    // pomodoroClock: './dev/js/pomodoroClock.js',
    // randomQuotes: './dev/js/randomQuotes.js'
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
    publicPath: "/js/"

    // filename: "/local/bundle.js",
    // filename: "bundle.js",
    // path: __dirname + 'local/js'
    // path: path.resolve(__dirname, "local")
    // publicPath: "/assets/",
  // }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
  //     {
  //       test: /\.scss/,
  //       loader: 'style!css!postcss!sass'
  //     }
  //     // 
  //     // {
  //     //   test: /\.svg/,
  //     //   loader: 'file'
  //     // }
    ]
  },
  plugins: [envVar]
  // postcss: function () {
  //   return [autoprefixer];
  // }
}