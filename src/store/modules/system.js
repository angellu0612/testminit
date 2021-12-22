/*
 * @Author: your name
 * @Date: 2021-07-27 11:15:07
 * @LastEditTime: 2021-09-09 16:47:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/store/modules/system.js
 */

const system = {
  namespaced: true,
  state: {
    theme: 'default',
  },
  mutations: {
    changeTheme(state, payload) {
      state.theme = payload;
      document.documentElement.className = 'theme-' + state.theme;
    },
  },
};

export default system;
