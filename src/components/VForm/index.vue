<template>
  <AFormModel
    ref="formModel"
    :model="formValue"
    :rules="rules"
    :layout="layoutConfig.layout"
    v-bind="$attrs"
    :class="['form-grid', { 'form-inline': isInline }]"
    :style="{ gridTemplateColumns: `repeat(${autoColumn}, ${gridTrack})` }"
    @submit.prevent="submit"
    @validate="emitValidate"
  >
    <template v-for="field in formFields">
      <!-- <slot :name="field.key" :field="field"> -->
      <AFormModelItem
        v-if="!field.isHide"
        :key="field.key"
        :prop="field.key"
        :style="getItemStyle(field)"
        v-bind="filterAttrs(field)"
      >
        <slot :name="field.key" :field="field">
          <component :is="field.tag" v-model.trim="formValue[field.key]" v-bind="field.attrs" v-on="field.on" />
        </slot>
      </AFormModelItem>
      <!-- </slot> -->
    </template>
    <slot name="extra">
      <template v-if="hasActions">
        <AFormModelItem key="form-actions" class="form-actions">
          <AButton type="primary" icon="search" :loading="loading" html-type="submit" class="btn-spacing">查询</AButton>
          <AButton icon="rest" :loading="loading" class="btn-spacing" @click="reset">重置</AButton>
          <slot name="actions" />
        </AFormModelItem>
      </template>
    </slot>
  </AFormModel>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';
import { createValidateAsync } from './utils';
import { COMPONENT_BASE_WIDTH, TagMap } from './constants';

export default {
  name: 'VForm',
  components: {
    FormTransfer: () => import('./extends/FormTransfer'),
  },
  inheritAttrs: false,
  // `model` 属性是引用类型, 子属性经 `v-model` 绑定，值会发生变化
  // 为了符合 Vue 编程直觉，可使用 `v-model` 指令
  // 实际上不存在对应的 `event` 事件
  model: {
    prop: 'model',
    event: '',
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    model: {
      type: Object,
      default: () => ({}),
    },
    rules: Object,
    column: Number,
    loading: Boolean,
    layout: String,
  },
  data() {
    return {
      formWidth: 0,
      gridTrack: 'minmax(max-content, 1fr)',
    };
  },
  computed: {
    // mutating a prop (`model`) locally is considered an anti-pattern.
    // use computed property to avoid eslint warning
    formValue() {
      return this.model;
    },
    formFields() {
      return this.fields.map(field => {
        const tag = TagMap[field.tag] ?? field.tag;
        return { ...field, tag };
      });
    },
    isInline() {
      return this.layout === 'inline' || !!this.$listeners.search;
    },
    layoutConfig() {
      const layout = this.layout ?? (this.isInline ? 'inline' : undefined);
      return { layout };
    },
    autoColumn() {
      return this.column ?? this.getColumn();
    },
    hasActions() {
      if (this.$scopedSlots.actions) return true;
      const { search, submit, reset } = this.$listeners;
      return !!(search || (submit && reset));
    },
    totalCol() {
      return this.fields.reduce((total, field) => total + (field.colSpan ?? 1), this.hasActions ? 1 : 0);
    },
  },
  created() {
    this.$nextTick(() => {
      this.formWidth = this.$parent.$el?.getBoundingClientRect()?.width ?? 0;
    });
  },
  mounted() {
    this.formModel = this.$refs.formModel;
    this.validateField = createValidateAsync(this.formModel.validateField);
    this.resetFields = this.formModel.resetFields;
    this.observeFormSize();
  },
  methods: {
    // 观察组件尺寸变化
    observeFormSize() {
      const container = this.$el ?? (this.formModel ?? this.$parent ?? this.$root).$el;
      const observer = new ResizeObserver(entries => {
        const { width } = entries[0].contentRect;
        if (this.formWidth !== width) this.formWidth = width;
      });

      observer.observe(container);

      this.$on('hook:activated', () => observer.observe(container));
      // 停止观测
      this.$on('hook:deactivated', () => observer.disconnect());
      this.$on('hook:beforeDestroy', () => observer.unobserve(container));
    },
    // 没有参数，统一使用 Promise 方式执行
    validate() {
      return this.formModel
        .validate()
        .then(() => ({ ...this.model }))
        .catch(() => Promise.reject({ ...this.model }));
    },
    emitValidate(...args) {
      this.$emit('validate', ...args);
    },
    submit() {
      if (this.rules != null) {
        this.submitWithValidate();
      } else {
        const data = { ...this.model };
        this.$emit('submit', data);
        this.$emit('search', data);
      }
    },
    submitWithValidate() {
      this.$emit('update:loading', true);
      this.validate()
        .then(data => {
          this.$emit('submit', data);
          this.$emit('search', data);
        })
        .catch(() => {
          this.$emit('error');
        })
        .finally(() => {
          this.$emit('update:loading', false);
        });
    },
    reset() {
      this.formModel.resetFields();
      this.$emit('reset');
      this.$emit('search', { ...this.model });
    },
    // eslint-disable-next-line
    filterAttrs({ tag, attrs, on, width, colSpan, rowSpan, ...filed }) {
      return filed;
    },
    getColumn() {
      const width = this.formWidth;
      if (!width) return 1;
      const col = Math.max(Math.floor(width / COMPONENT_BASE_WIDTH), 1);
      if (col < 3) return col;
      const num = this.totalCol;
      if (num <= col) return col;
      if (num % col === 1) return col + 1;
      return col;
    },

    getItemStyle({ width, colSpan, rowSpan, ...field }) {
      const style = {};
      if (width != null) style.width = `${width}px`;
      if (colSpan != null) style.gridColumnEnd = `span ${colSpan}`;
      if (rowSpan != null) style.gridRowEnd = `span ${rowSpan}`;
      return { ...style, ...field.style };
    },
  },
};
</script>

<style lang="less" scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 24px;

  /deep/ .ant-form-item {
    display: flex;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: auto;
    flex-grow: 1;
  }

  /deep/ .ant-form-item-children {
    /* 修复部分组件长度未占满父级容器 */
    > .ant-input-number,
    > .ant-calendar-picker {
      width: 100%;
    }
  }

  .btn-spacing {
    margin-right: 16px;
  }
}

.form-inline {
  gap: 8px 0;

  /deep/ .ant-form-item {
    display: flex;
  }

  /deep/ .ant-form-item-with-help {
    margin-bottom: 0;

    .ant-form-explain {
      position: absolute;
      margin-top: -6px;
    }
  }
}
</style>
