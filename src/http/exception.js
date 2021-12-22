/*
 * @Author: your name
 * @Date: 2021-07-14 16:15:24
 * @LastEditTime: 2021-07-14 16:32:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/exception.js
 */

export class Exception extends Error {
  static NETWORK_ERROR = 'NetworkError';
  static ABORT_ERROR = 'AbortError';
  static TIMEOUT_ERROR = 'TimeoutError';
  static HTTP_ERROR = 'HttpError';

  constructor(error, name, ctx) {
    super(error instanceof Error ? error.message : error);
    this.name = name;
    this.ctx = ctx;
  }
}
