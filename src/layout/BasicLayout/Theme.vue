<!--
 * @Author: your name
 * @Date: 2021-09-09 15:56:36
 * @LastEditTime: 2021-09-10 11:33:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/layout/BasicLayout/Theme.vue
-->
<template>
  <section style="margin-left: auto; margin-right: 16px">
    <AButton type="primary" ghost @click="showThemeBar">主题</AButton>
    <ADrawer title="主题切换" placement="right" :closable="false" :visible="visible" @close="close">
      <a-list :grid="{ column: 3 }" :data-source="data">
        <template #renderItem="item">
          <AListItem style="text-align: center">
            <ATag :color="item.color" class="tag" @click="changeTheme(item.name)" />
          </AListItem>
        </template>
      </a-list>
    </ADrawer>
  </section>
</template>
<script>
export default {
  name: 'Theme',
  data() {
    return {
      visible: false,
      data: [
        { name: 'default', color: '#1890ff' },
        { name: 'dark', color: '#176991' },
      ],
    };
  },
  methods: {
    showThemeBar() {
      this.visible = true;
    },
    // 切换主题：如需添加更多皮肤，请在@/assets/styles/themes目录下进行添加，
    // 命名格式为theme-主题名，添加完成后在@/assets/styles/theme.js中进行配置即可正常使用
    changeTheme(theme) {
      this.$store.commit('system/changeTheme', theme);
    },
    close() {
      this.visible = false;
    },
  },
};
</script>
<style scoped>
.tag {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 0;
  cursor: pointer;
}
</style>
