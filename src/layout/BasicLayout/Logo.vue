<!--
 * @Author: your name
 * @Date: 2021-07-07 16:29:53
 * @LastEditTime: 2021-09-10 11:10:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/layout/BasicLayout/Logo.vue
-->
<template>
  <section :class="['logo-vertical']">
    <img v-once :src="logoPath" alt="图标" width="36" height="36" />
    <h1 v-show="title" class="title">{{ title }}</h1>
  </section>
</template>
<script>
import config from '@/config';
export default {
  name: 'Logo',
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      title: config.title,
    };
  },
  watch: {
    collapsed(bool) {
      if (bool) return (this.title = null);
      setTimeout(() => (this.title = config.title), 168);
    },
  },
  created() {
    this.logoPath = config.logo;
  },
};
</script>
<style lang="less" scoped>
@import '@/assets/styles/themes/theme-default.less';
.logo-layout() {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.logo {
  &-vertical {
    .logo-layout();
    height: @layout-header-height;

    .title {
      font-size: 18px;
      margin: 0 0 2px 12px;
    }
  }
}
</style>
