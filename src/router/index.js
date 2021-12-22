/*
 * @Author: your name
 * @Date: 2021-04-29 15:28:47
 * @LastEditTime: 2021-07-07 11:42:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/router/index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import { addAliveHook, getRoutes } from './utils';
import { startProgressGuard, endProgressHook } from './progress';
import config from '@/config';

Vue.use(VueRouter);

const vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default vueRouter;

const resetDocumentHook = to => {
  const title = config.title;
  const page = to.meta?.title;
  window.document.title = page ? `${page}-${title}` : title;
  window.scrollTo(0, 0);
};

// 路由切换时添加进度条
vueRouter.beforeEach(startProgressGuard);

// 添加缓存列表
vueRouter.afterEach(addAliveHook);
// 关闭进度条
vueRouter.afterEach(endProgressHook);
// 重置页面位置
vueRouter.afterEach(resetDocumentHook);

// 获取可见路由
export const getVisibleRoutes = () => getRoutes(routes);
