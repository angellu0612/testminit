/*
 * @Author: your name
 * @Date: 2021-07-14 17:28:42
 * @LastEditTime: 2021-07-14 17:39:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/model/httpClient.js
 */

import { Core } from './request';

export class HttpClient extends Core {
  get baseURL() {
    return this.defaults.baseURL;
  }
  set baseURL(url) {
    this.defaults.baseURL = url;
  }

  setHeaders(key, value, scopes) {
    const headers = this.defaults.headers;
    if (Array.isArray(scopes)) {
      scopes.forEach(scope => (headers[scope][key] = value));
    } else {
      headers.common[key] = value;
    }
  }
}
