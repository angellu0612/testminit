/*
 * @Author: your name
 * @Date: 2021-08-13 11:50:06
 * @LastEditTime: 2021-08-16 08:53:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/store/modules/mock.js
 */

import { getMockData } from '../utils';
import { isEmpty } from '@/utils/type';
const mock = {
  namespaced: true,
  state: {
    cksjglListData: getMockData(['mid', 'cksjbh', 'jzsj', 'zxsj', 'qyzt']),
  },
  mutations: {
    editCKSJ(state, payload) {
      const { id } = payload;
      if (!isEmpty(id)) state.cksjglListData.splice(id, 1, payload);
    },
    addCKSJ(state, payload) {
      payload.id = state.cksjglListData.length;
      state.cksjglListData.push(payload);
    },
    deleteCKSJ(state, payload) {
      const { id } = payload;
      debugger;
      if (!isEmpty(id)) state.cksjglListData.splice(id, 1);
    },
  },
};

export default mock;
