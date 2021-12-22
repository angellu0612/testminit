/*
 * @Author: your name
 * @Date: 2021-07-06 16:49:01
 * @LastEditTime: 2021-08-13 11:26:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/config/index.js
 */

import { PAGE_NAMES } from '@/constants';

const freeze = Object.freeze;

const config = freeze({
  title: '任务规划调度系统',
  mainName: PAGE_NAMES.MAIN,
  logo: require('../../public/logo.png'),
});

export default config;
