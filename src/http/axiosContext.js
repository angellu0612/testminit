/*
 * @Author: your name
 * @Date: 2021-07-14 15:17:14
 * @LastEditTime: 2021-07-14 17:04:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/axiosContext.js
 */

export class AxiosContext {
  constructor(url, options) {
    this.request = { url, ...options };
    this.response = undefined;
  }

  get url() {
    return this.request.url;
  }
  get method() {
    return this.request.method;
  }
  get status() {
    return this.response?.status;
  }
  get statusText() {
    return this.response?.statusText;
  }
  get responseHeaders() {
    return this.response?.headers;
  }
  get data() {
    return this.response?.data;
  }
}
