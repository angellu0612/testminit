/*
 * @Author: your name
 * @Date: 2021-07-14 11:15:25
 * @LastEditTime: 2021-07-22 16:16:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/model/execute.js
 */
export const execute = stack => (ctx, next) => {
  let count = -1;

  const step = i => {
    if (i <= count) return Promise.reject(new Error('next() should not be called more than once in a middleware'));
    count = i;
    const func = stack[i] ?? next;
    if (!func) return Promise.resolve();

    try {
      return Promise.resolve(func(ctx, () => step(i + 1)));
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return step(0);
};
