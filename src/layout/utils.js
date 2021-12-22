/*
 * @Author: your name
 * @Date: 2021-07-07 17:28:55
 * @LastEditTime: 2021-07-07 17:38:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/layout/utils.js
 */

import { findNode } from '@/utils';
import { getVisibleRoutes } from '@/router';

export const getVisibleTree = name => {
  const visibleRoutes = getVisibleRoutes();
  const target = findNode(v => v.name === name, visibleRoutes);
  return target?.children ?? [];
};
