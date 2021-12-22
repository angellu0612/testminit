/*
 * @Author: your name
 * @Date: 2021-07-06 16:37:29
 * @LastEditTime: 2021-07-06 17:02:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/router/progress.js
 */
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
  easing: 'ease-in-out',
});

export const startProgressGuard = (_, __, next) => {
  NProgress.start();
  next();
};

export const endProgressHook = () => {
  setTimeout(() => NProgress.done(), 100);
};
