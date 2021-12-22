<!--
 * @Author: your name
 * @Date: 2021-07-08 11:34:36
 * @LastEditTime: 2021-07-09 11:21:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/layout/BasicLayout/SubMenu.vue
-->

<template functional>
  <ASubMenu :key="data.key" v-on="$listener">
    <template #title>
      <AIcon v-if="props.item.icon" :type="props.item.icon" />
      <span>{{ props.item.title }}</span>
    </template>
    <template v-for="item in props.item.children">
      <AMenuItem v-if="!item.children" :key="item.key">
        <AIcon v-if="item.icon" :type="item.icon" />
        <span>{{ item.title }}</span>
      </AMenuItem>
      <SubMenu v-else :key="item.key" :item="item" />
    </template>
  </ASubMenu>
</template>
