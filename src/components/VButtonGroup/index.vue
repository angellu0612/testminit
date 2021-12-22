<!--
 * @Author: your name
 * @Date: 2021-08-13 09:14:19
 * @LastEditTime: 2021-08-13 09:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/components/VButtonGroup/index.vue
-->
<template>
  <ASpace :size="spaceSize">
    <template v-for="btn in buttons">
      <slot :name="btn.key" :btn="btn">
        <AButton
          v-if="!btn.isHide"
          :key="btn.key"
          :type="btn.type || 'default'"
          :icon="btn.icon"
          :disabled="btn.disabled || false"
          @click="handleAction(btn.key)"
        >
          {{ btn.title }}
        </AButton>
      </slot>
    </template>
  </ASpace>
</template>

<script>
export default {
  name: 'VButtonGroup',
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    spaceSize: {
      type: [String, Number],
      default: 'small',
    },
  },
  methods: {
    handleAction(key) {
      this.$emit('click', key);
    },
  },
};
</script>

<style></style>
