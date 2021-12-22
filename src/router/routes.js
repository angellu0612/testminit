/*
 * @Author: your name
 * @Date: 2021-07-06 11:34:12
 * @LastEditTime: 2021-08-13 11:41:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/router/routes.js
 */

/**
 * path: string               仅第一级路径 path 前面加 '/'
 * meta: {
 *   title: string           显示在侧边栏的文字
 *   hideInMenu: (false)     true: 在菜单不会显示该页面选项, **及其嵌套的子路由页面**
 *   notCache: (false)       true: 页面在切换标签后, **及其嵌套的子路由页面不会缓存**
 *   icon: string            该页面在菜单处显示的图标
 * }
 */

import { loadRoutes } from './utils';
import { PAGE_NAMES } from '@/constants/page';
const routes = [
  {
    path: '/',
    name: PAGE_NAMES.MAIN,
    meta: { title: '首页' },
    component: () => import('@/layout/BasicLayout'),
    redirect: { name: PAGE_NAMES.PROGRAMME_CONFIGURATION },
    children: loadRoutes(require.context('./BasicLayout', false, /\.js$/)),
  },
];
export default routes;
