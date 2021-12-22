/*
 * @Author: your name
 * @Date: 2021-07-06 10:49:12
 * @LastEditTime: 2021-08-13 15:55:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/store/modules/app.js
 */

const app = {
  namespaced: true,
  state: {
    // 二级树结构，第一级key为缓存路由对应组件名称，第二级key为RouterView名称，value为许缓存的子路由对应的组件名称
    aliveList: {},
    screenType: {
      type: 'xl',
      level: 6,
    },
  },
  getters: {
    // 获取缓存列表
    getAlive:
      ({ aliveList }) =>
      (page, name = 'default') => {
        const map = aliveList[page];
        if (map) {
          const list = map[name];
          if (Array.isArray(list)) return list;
        }
        return [];
      },
    isMobile: ({ screenType }) => screenType.level < 3.8,
  },
  mutations: {
    /**
     * 添加页面缓存
     * @param state 全局状态
     * @param page 拥有 <RouterView> 标签的组件，被引用到路由中，在路由中的name，用于区分缓存列表
     * @param routerView 组件可以拥有多个 <RouterView> 时，需指定 name, 若只有一个，默认 'default'
     * @param component 需要被缓存的组件，其自身的 name
     */
    addAlive(state, { page, routerView = 'default', component }) {
      // 不存在当前页面的缓存列表
      if (!state.aliveList[page]) {
        state.aliveList = { ...state.aliveList, [page]: { [routerView]: [component] } };
      } else {
        // 不存在当前routerView的缓存列表
        if (!state.aliveList[page][routerView]) {
          state.aliveList[page] = { ...state.aliveList[page], [routerView]: [component] };
          // 当前routerView的缓存列表不包含传入组件
        } else if (!state.aliveList[page][routerView].includes(component)) {
          state.aliveList[page][routerView].push(component);
        }
      }
    },
    // 设置屏幕类型
    setScreenType(state, { type, level }) {
      [state.screenType.type, state.screenType.level] = [type, level];
    },
  },
  actions: {},
};

export default app;
