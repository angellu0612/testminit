/*
 * @Author: your name
 * @Date: 2021-08-12 09:49:09
 * @LastEditTime: 2021-08-26 15:25:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/main.js
 */
import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import plugins from './plugins';

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

Vue.config.productionTip = false;
// 开启后可观察组件性能
Vue.config.performance = false;

Vue.use(Antd);
Vue.use(plugins);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
