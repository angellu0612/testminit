/*
 * @Author: your name
 * @Date: 2021-07-14 14:52:09
 * @LastEditTime: 2021-09-07 11:39:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/model/request.js
 */

import { Model } from './model';
import axios from 'axios';
import { AxiosContext } from './axiosContext';
import { message } from 'ant-design-vue';
import { Exception } from './exception';

const getErrorType = error =>
  error.message === 'Network Error'
    ? Exception.NETWORK_ERROR
    : axios.isCancel(error)
    ? Exception.ABORT_ERROR
    : error.code === 'ECONNABORTED'
    ? Exception.TIMEOUT_ERROR
    : Exception.HTTP_ERROR;

// 请求中间件
export class Core extends Model {
  constructor(config) {
    super();
    this.requestMiddleware = this.requestMiddleware.bind(this);
    this.instance = axios.create(config);

    // 封装方法
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];
    methods.forEach(method => {
      this[method] = (url, options) => this.request(url, { method, ...options });
    });
  }

  get defaults() {
    return this.instance.defaults;
  }

  // 请求发送中间件
  async requestMiddleware(ctx) {
    try {
      const res = await this.instance.request(ctx.request);
      const { config, request, ...response } = res;
      ctx.response = response;
      const { code, msg } = response.data;
      if (![200].includes(code)) {
        message.warning(msg);
        return Promise.reject(response.data);
      } else {
        return Promise.resolve(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        const { config, request, ...response } = error;
        ctx.response = response;
        return Promise.reject(new Exception(error, getErrorType(error), ctx));
      }
      return Promise.reject(error);
    }
  }

  // 请求方法
  request(url, options) {
    this.middlewareStack.push(this.requestMiddleware);
    const ctx = new AxiosContext(url, options);
    return this.execute()(ctx);
  }
}
