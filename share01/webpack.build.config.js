let path = require('path');
let webpack = require('webpack');

//插件
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

//本地服务
let ENV = process.env.NODE_ENV || 'development';
let isDev = ENV === 'development';
let port = 80;

function getyyyyMMdd(){
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1;
  var curr_year = d.getFullYear();
  String(curr_month).length < 2 ? (curr_month = "0" + curr_month): curr_month;
  String(curr_date).length < 2 ? (curr_date = "0" + curr_date): curr_date;
  var yyyyMMdd = curr_year + "" + curr_month +""+ curr_date;
  return yyyyMMdd;
}

const cssLoaders = function(options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }
  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

module.exports = {
  //基本目录，一个绝对路径
  context: path.resolve(__dirname, './src'),
  //入口文件
  entry: {main:'./index.js'},
  output: {
    //对应一个绝对路径 dist
    // path: path.join(__dirname, 'detail'),
    path: path.join(__dirname, 'v'+getyyyyMMdd()),
    //将输出文件写入到 dist 目录下
    filename: isDev ? '[name].js' : '[name].js',
    // publicPath: isDev ? '/dist/' : '//st-en.jd.com/st-m/detail/v'+getyyyyMMdd()+"/",
    //  publicPath: isDev ? '/dist/' : '//' + staticUrl+'/myCenter/v'+getyyyyMMdd()+"/",
    chunkFilename: isDev ? '[name].js' : '[name].js',
    sourceMapFilename: './map/[file].map'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: cssLoaders({
          sourceMap: true,
          extract: isDev ? false : true
        }),
        postcss: [autoprefixer({
          browsers: ['> 1%', 'last 10 versions']
        })],
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader?-autoprefixer','postcss-loader']
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader?-autoprefixer','postcss-loader','sass-loader']
      })
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(jpg|jpeg|gif|png)$/i,
      loader: 'file-loader?name=[name].[ext]'
    }, {
      test: /\.woff(2)?(\??.*)$/,
      loader: 'url-loader?limit=1000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\??.*)$/,
      loader: 'file-loader'
    }],
  },
  //解析：配置模块如何解析，import的文件后缀名
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'vuex$': 'vuex/dist/vuex.js',
      'vueRouter$': 'vue-router/dist/vue-router.js'
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: __dirname + '/static'
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: ENV === 'production' ? '[name].css' : '[name].css'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    //定义全局变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        mock: JSON.stringify(process.env.mock),
        pre: process.env.pre
      }
    }),
    //生成html
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ],
  devtool: isDev ? 'inline-source-map' : false,
  //本地开发server
  devServer: {
    host:'0.0.0.0',
    port: port,
    hot: true,
    https:false,
    disableHostCheck: true,
    proxy: {
      '/search': { // api表示当前项目请求的key
        target: 'http://m.joybuy.com/search',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/search' : ''}, // 重写路径
      }
    }
  }
}
