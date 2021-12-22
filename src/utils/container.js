/*
 * @Author: your name
 * @Date: 2021-07-06 15:33:26
 * @LastEditTime: 2021-07-06 15:43:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/utils/container.js
 */

/**
 * 空白容器组件，用于含有子路由的路由页面
 * @param {string} name 组件名
 * @param {boolean} [bool=true] 是否缓存，默认开启缓存
 * @return {Object}
 */
import { mapGetters } from 'vuex';
export const createBlankPage = (name, cache = true) => ({
  name,
  render(h) {
    const routeView = h('RouterView');
    if (!cache) return routeView;
    const aliveList = this.getAlive(name);
    return h('KeepAlive', { props: { include: aliveList } }, [routeView]);
  },
  computed: {
    ...mapGetters('app', ['getAlive']),
  },
});
