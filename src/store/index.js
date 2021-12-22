/*
 * @Author: your name
 * @Date: 2021-04-29 15:28:47
 * @LastEditTime: 2021-09-09 13:48:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/store/index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { IS_PRODUCTION } from '@/constants/index';

Vue.use(Vuex);

/*
 * directory: 说明需要检索的目录
 * useSubdirectories: 是否检索子目录
 * regExp: 匹配文件的正则表达式
 */
const files = require.context('./modules', false, /\.js$/);
console.log(files.keys());
const modules = files.keys().reduce((values, key) => {
  const name = key.replace(/^\.\/|\.js$/g, '');
  values[name] = files(key).default;
  return values;
}, {});

const plugins = [];
if (!IS_PRODUCTION) {
  const logger = Vuex.createLogger({ filter: ({ type }) => type !== 'app/addAlive' });
  plugins.push(logger);
}
const store = new Vuex.Store({ strict: !IS_PRODUCTION, modules, plugins });

export default store;
