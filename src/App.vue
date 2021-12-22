<!--
 * @Author: your name
 * @Date: 2021-08-12 09:49:09
 * @LastEditTime: 2021-08-26 15:25:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/App.vue
-->
<template>
  <div id="app">
    <AConfigProvider :locale="zh_CN">
      <RouterView />
    </AConfigProvider>
  </div>
</template>
<script>
import zh_CN from 'ant-design-vue/es/locale/zh_CN';

export default {
  data() {
    return {
      zh_CN,
    };
  },
};
</script>
<style lang="less">
@import './assets/styles/index.less';
</style>
