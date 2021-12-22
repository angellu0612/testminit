/*
 * @Author: your name
 * @Date: 2021-07-06 11:37:58
 * @LastEditTime: 2021-07-08 16:09:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/router/utils.js
 */

/*
 * 路由加载
 * @params: files文件，使用'require.context'获取
 * @return: 路由数组
 */
import { isObject } from '@/utils';
import store from '@/store';
export const loadRoutes = files =>
  files
    .keys()
    .reduce((arr, key) => (isObject(files(key).default) ? arr.concat(files(key).default) : arr), [])
    .sort((pre, cur) => (pre.sort ?? 0) - (cur.sort ?? 0));

/*
 * 添加组件缓存
 * @params: to {Route}
 * @return: void
 */
export const addAliveHook = to => {
  const length = to.matched.length;
  if (length <= 1) return;
  for (let i = length - 1; i > 0; i--) {
    const [cur, parent] = [to.matched[i], to.matched[i - 1]];
    if (!cur.meta?.notCache) {
      Object.keys(cur.components).forEach(key => {
        store.commit('app/addAlive', {
          page: parent.components.default.name,
          routerView: key,
          component: cur.components[key].name,
        });
      });
    }
  }
};

// 是否展示路由
const isVisible = route => !route.meta?.hideInMenu;
export const getRoutes = routes => {
  // 当前节点不存在
  if (!Array.isArray(routes)) return [];
  return routes.reduce((pre, cur) => {
    // 当前节点为有效节点
    if (isVisible(cur)) {
      const newNode = { meta: cur.meta, name: cur.name };
      const children = getRoutes(cur.children);
      const hasChild = !!cur.children,
        len = children.length;
      // 有子节点但子节点皆是无效子节点
      if (hasChild && !len) return pre;
      // 存在子节点
      if (len) newNode.children = children;
      return pre.concat(newNode);
    }
    // 当前节点为无效节点
    return pre;
  }, []);
};
