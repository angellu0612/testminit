/*
 * @Author: your name
 * @Date: 2021-07-14 10:42:14
 * @LastEditTime: 2021-07-14 14:52:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/model/index.js
 */

import { execute } from './execute';
import { isFunction } from '@/utils';
// 基类：操作中间件
export class Model {
  static execute = execute;

  // 创建中间件列表
  constructor() {
    this.middlewareStack = [];
  }
  // 添加中间件
  use(middleware) {
    if (!isFunction(middleware)) throw new Error('middleware must be a function');
    this.middlewareStack.push(middleware);
    return this;
  }
  // 执行所有中间件
  execute() {
    return Model.execute(this.middlewareStack);
  }
}
