/*
 * @Author: your name
 * @Date: 2021-08-13 08:52:17
 * @LastEditTime: 2021-08-13 14:14:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/api/config.js
 */

import { gServe } from '../../public/serve.config.js';

// 获取基础服务地址
export function getBaseUrl(prefixName = '') {
  return gServe.BASE_URL + prefixName;
}
