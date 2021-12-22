<!--
 * @Author: your name
 * @Date: 2021-07-06 14:50:50
 * @LastEditTime: 2021-09-10 11:09:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/layout/BasicLayout.vue
-->
<template>
  <ALayout class="container vertical">
    <ALayoutSider v-model="collapsed" collapsible breakpoint="xl" :width="siderWidth" class="layout-sider">
      <Logo :collapsed="collapsed" />
      <Menu
        :menu-data="menuList"
        :selected-keys="currentName"
        :open-keys.sync="openKeys"
        :class="['menu']"
        mode="inline"
        @click="navigate"
      />
    </ALayoutSider>
    <ALayout :class="['layout-main']">
      <ALayoutHeader :class="['layout-main-header']">
        <div class="trigger">
          <AIcon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse" />
        </div>
        <Breadcrumb v-if="!isMobile" />
        <Theme />
      </ALayoutHeader>
      <ALayoutContent :class="['layout-main-content']">
        <KeepAlive :include="getAlive('BasicLayout')">
          <RouterView />
        </KeepAlive>
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>
<script>
import Logo from './BasicLayout/Logo';
import Menu from './BasicLayout/Menu';
import Breadcrumb from './BasicLayout/Breadcrumb';
import Theme from './BasicLayout/Theme';
import screenMixin from './mixins/screenMixin';
import { mapGetters } from 'vuex';
import config from '@/config';
import { walkTree, getParentsFromTree, cutNodeOfOneSon } from '@/utils';
import { getVisibleTree } from './utils';
export default {
  name: 'BasicLayout',
  components: { Logo, Menu, Breadcrumb, Theme },
  mixins: [screenMixin],
  data() {
    return {
      // 侧边栏是否折叠
      collapsed: false,
      // 菜单列表
      // menuList: [],
      // 选中项
      currentName: [this.$route.name],
      // 展开项
      openKeys: [],
      // 展开项缓存，方便侧边栏隐藏、展开时切换
      cacheOpenKeys: [],
      // 手动点击跳转和路由的跳转，互斥。true为手动点击，false为路由跳转，路由跳转时需计算openKeys
      isOpenKeysLock: false,
    };
  },
  computed: {
    ...mapGetters('app', ['getAlive', 'isMobile']),
    siderWidth() {
      const minWidth = this.isMobile ? 0 : 80;
      const maxWidth = Math.max(this.screenLevel, 5) * 16 + 120;
      return this.collapsed ? minWidth : maxWidth;
    },
  },
  watch: {
    '$route.name': {
      handler(name) {
        const selectedKey = name;
        this.currentName.splice(0, 1, selectedKey);
        if (this.isOpenKeysLock) return (this.isOpenKeysLock = false);
        this.openKeys = this.getOpenKeys(selectedKey);
      },
      immediate: true,
    },
    collapsed() {
      [this.cacheOpenKeys, this.openKeys] = [this.openKeys, this.cacheOpenKeys];
    },
  },
  // created() {
  //   this.openKeys = this.getOpenKeys(this.$route.name);
  // },
  beforeCreate() {
    // 获取菜单列表
    const transfer = v => ({ key: v.name, title: v.meta?.title, icon: v.meta?.icon });
    this.menuList = cutNodeOfOneSon(walkTree(transfer, getVisibleTree(config.mainName)));
  },
  methods: {
    // 点击导航时触发路由跳转
    navigate({ key }) {
      this.$router
        .push({ name: key })
        .catch(() => {})
        .finally(() => (this.isOpenKeysLock = true));
    },
    // 通过js进行路由跳转时获取openKeys
    getOpenKeys(name) {
      const list = getParentsFromTree(v => v.key === name, this.menuList).map(v => v.key);
      return list.length ? list : [];
    },
    // 跳转侧边栏是否展开
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
<style lang="less" scoped>
@import '@/assets/styles/themes/theme-default.less';

.hidden-scrollbar() {
  // Firefox
  scrollbar-width: none;

  // Chrome
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.row-flex-center() {
  display: flex;
  align-items: center;
}
.container {
  height: 100vh;
}
.vertical {
  .layout-sider {
    overflow-y: auto;
    overflow-x: hidden;
    .hidden-scrollbar();
    .menu {
      margin-bottom: @layout-trigger-height;
      border-right: none;
    }
  }
  .layout-main {
    transition: all 0.2s;
    &-header {
      padding: 0;
      .row-flex-center();
      .trigger {
        font-size: 20px;
        padding: 0 20px;
      }
    }
    &-content {
      margin: 16px 16px 0;
    }
  }
}
</style>
