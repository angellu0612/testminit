/*
 * @Author: your name
 * @Date: 2021-08-13 08:54:38
 * @LastEditTime: 2021-09-09 09:01:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/api/module/test.js
 */

import { getBaseUrl } from '../config';
import http from '@/http';
import store from '@/store';

const prefixName = '';
const Api = {
  CKSJGL_LIST_API: getBaseUrl(prefixName) + '/cksj/list_page',
};

/**
 * 测控事件管理：分页查询列表
 */
export function cksjglListApi(params = {}) {
  return Promise.resolve({
    data: store.state.mock.cksjglListData,
  });
  // return http.get(Api.CKSJGL_LIST_API, {
  //   data: { params },
  // });
}

/**
 * 测控事件管理：分页查询列表
 */
export function wxcksjpzUpdateApi(params = {}) {
  store.commit('mock/editCKSJ', params);
  return Promise.resolve();
  // return http.post(Api.CKSJGL_LIST_API, {
  //   data: { data: params },
  // });
}

/**
 * 测控事件管理：分页查询列表
 */
export function wxcksjpzAddApi(params = {}) {
  store.commit('mock/addCKSJ', params);
  return Promise.resolve();
  // return http.post(Api.CKSJGL_LIST_API, {
  //   data: { data: params },
  // });
}

/**
 * 测控事件管理：分页查询列表
 */
export function cksjglDeleteApi(params = {}) {
  store.commit('mock/deleteCKSJ', params);
  return Promise.resolve();
  // return http.post(Api.CKSJGL_LIST_API, {
  //   data: { data: params },
  // });
}
