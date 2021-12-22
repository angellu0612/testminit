/*
 * @Author: your name
 * @Date: 2021-07-14 11:08:52
 * @LastEditTime: 2021-07-14 17:52:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/model/middleware.js
 */

import { notification } from 'ant-design-vue';
import { Exception } from './exception';

export const responseMiddleware = (ctx, next) =>
  next()
    .then(() => ctx.data)
    .catch(() => Promise.reject(ctx.data));

const httpExceptionMap = new Map([
  [400, { message: '发出的请求有错误，服务器没有新建或修改数据的操作' }],
  [401, { message: '用户尚未认证授权' }],
  [403, { message: '用户已认证，但被禁止访问' }],
  [404, { message: '请求的资源不存在，服务器没有进行任何操作' }],
  [405, { message: '请求方法错误' }],
  [406, { message: '请求的资源格式错误' }],
  [408, { message: '请求超时' }],
  [410, { message: '请求的资源已被永久删除' }],
  [422, { message: '数据验证错误' }],
  [500, { message: '服务器发生错误，请检查服务器' }],
  [502, { message: '网关错误' }],
  [503, { message: '服务不可用，服务器暂时过载或维护中' }],
  [504, { message: '网关超时' }],
]);

// 错误提示
function notice(message, description) {
  Promise.resolve().then(() => notification.error({ message, description }));
}

// 报错信息处理中间件
export const noticeMiddleware = (ctx, next) =>
  next().catch(error => {
    if (error instanceof Exception) {
      switch (error.name) {
        case Exception.HTTP_ERROR: {
          const status = ctx.status;
          const exception = httpExceptionMap.get(status) ?? {};
          const errorText = ctx.statusText ?? exception.message;
          notice(`${status}：${ctx.url}`, errorText);
          break;
        }
        case Exception.TIMEOUT_ERROR:
          notice('网络连接超时');
          break;
        case Exception.NETWORK_ERROR:
          notice('网络异常', '您的网络发生异常，无法连接服务器');
          break;
      }
    }
    return Promise.reject(error);
  });
