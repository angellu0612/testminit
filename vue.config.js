/*
 * @Author: your name
 * @Date: 2021-08-12 10:15:38
 * @LastEditTime: 2021-09-09 15:49:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/vue.config.js
 */
const webpack = require('webpack');
const path = require('path');
const PACKAGE = require('./package.json');
const resolve = dir => path.join(__dirname, dir);

const isProduction = process.env.NODE_ENV === 'production';

// 换肤
const { getLess } = require('@zougt/some-loader-utils');
const ThemeCssExtractWebpackPlugin = require('@zougt/theme-css-extract-webpack-plugin');
const { multipleScopeVars } = require('./src/assets/styles/theme.js');

module.exports = {
  publicPath: isProduction ? './' : '/',
  productionSourceMap: false,

  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      less: {
        lessOptions: {
          modified: {},
          javascriptEnabled: true,
        },
        // 这里的选项会传递给 less-loader
        implementation: getLess({
          // getMultipleScopeVars优先于 lessOptions.multipleScopeVars
          getMultipleScopeVars: lessOptions =>
            multipleScopeVars.map(item => ({ ...item, path: path.resolve(item.path) })),
        }),
      },
    },
  },
  devServer: {
    port: 8000,
    hot: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  configureWebpack: {
    plugins: [
      // 精简 moment.js, 语言包只保留 zh-cn.js
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    ],
  },
  chainWebpack: config => {
    config.resolve.alias.set('@c', resolve('src/components'));

    const hasHtml = config.plugins.has('html');
    if (hasHtml) {
      config.plugin('html').tap(args => {
        args[0].title = PACKAGE.name;
        return args;
      });
    }

    const hasThemeCssExtractWebpackPlugin = config.plugins.has('ThemeCssExtractWebpackPlugin');
    if (hasThemeCssExtractWebpackPlugin) {
      config.plugin('ThemeCssExtractWebpackPlugin').use(ThemeCssExtractWebpackPlugin, [
        {
          multipleScopeVars,
          // extract: process.env.NODE_ENV === 'production',
          extract: false,
        },
      ]);
    }

    // 修改针对 svg 的 loader (file-loader -> vue-svg-loader)
    // 当引入 svg 文件加入`?inline`后缀时, 会处理成 vue 组件
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        // @see https://github.com/svg/svgo
        svgo: {
          plugins: [{ prefixIds: true }, { removeViewBox: false }, { removeDimensions: true }],
        },
      })
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({ name: 'assets/svg/[name].[hash:8].[ext]' });
  },
};
