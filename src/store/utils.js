/*
 * @Author: your name
 * @Date: 2021-08-13 13:59:20
 * @LastEditTime: 2021-08-16 09:15:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/store/mockData.js
 */

const createObj = function (columns) {
  const res = {};
  columns.forEach(col => (res[col] = '我是假数据'));
  return res;
};

export function getMockData(columns) {
  const res = [];
  for (let i = 0; i < 50; i++) {
    res.push({ ...createObj(columns), id: i });
  }
  return res;
}
