<!--
 * @Author: your name
 * @Date: 2021-07-07 16:29:31
 * @LastEditTime: 2021-09-09 16:59:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/layout/BasicLayout/Menu.vue
-->
<template>
  <AMenu v-bind="$attrs" class="v-menu" v-on="$listeners">
    <template v-for="item in menuData">
      <AMenuItem v-if="!item.children" :key="item.key">
        <AIcon v-if="item.icon" :type="item.icon" />
        <span>{{ item.title }}</span>
      </AMenuItem>
      <AMenuItem v-else-if="item.children.length === 1" :key="item.children[0].key">
        <AIcon v-if="item.icon" :type="item.icon" />
        <span>{{ item.children[0].title }}</span>
      </AMenuItem>
      <SubMenu v-else :key="item.key" :item="item" />
    </template>
  </AMenu>
</template>
<script>
import SubMenu from './SubMenu';
export default {
  name: 'Menu',
  components: { SubMenu },
  model: {
    prop: 'selectedKeys',
    event: 'selectChanged',
  },
  props: {
    menuData: {
      type: Array,
      required: true,
    },
  },
};
</script>
