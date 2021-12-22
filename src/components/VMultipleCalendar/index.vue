<template>
  <ACalendar
    :value="calendarValue"
    v-bind="$attrs"
    class="calendar-wrapper"
    @select="select"
    @panelChange="changePanel"
  >
    <template v-if="$slots.headerRender" #headerRender="header">
      <slot name="headerRender" v-bind="header" />
    </template>
    <template #dateFullCellRender="date">
      <div class="cell-wrapper" :class="getCellClass(date)">
        <div :class="cellDateClass">
          <div :class="cellValueClass">{{ date.format('DD') }}</div>
        </div>
      </div>
    </template>
  </ACalendar>
</template>

<script>
export default {
  name: 'VMultipleCalendar',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    disabled: Boolean,
  },
  data() {
    return {
      localValue: [],
      calendarValue: undefined,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.localValue) this.localValue = [...val];
      },
      immediate: true,
    },
  },
  created() {
    const prefix = 'ant-fullcalendar';
    this.selectedClass = `${prefix}-selected-day`;
    this.cellDateClass = `${prefix}-date`;
    this.cellValueClass = `${prefix}-value`;
  },
  methods: {
    indexOf(date) {
      return this.localValue.findIndex(v => v === date || v.isSame(date, 'd'));
    },
    select(date) {
      if (this.disabled) return;
      const index = this.indexOf(date);
      const value = [...this.localValue];

      if (index > -1) value.splice(index, 1);
      else value.push(date);

      this.$emit('change', value);
    },
    changePanel(date) {
      this.calendarValue = date;
      this.$emit('panel-change', date);
    },
    getCellClass(date) {
      const selected = this.indexOf(date) > -1;
      return {
        [this.selectedClass]: selected,
        'calendar-cell-disabled': this.disabled,
      };
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/themes/theme-default.less';

@prefix: ~'ant-fullcalendar';

.calendar-wrapper {
  // 清除组件默认当前日期的高亮
  .@{prefix}-cell.@{prefix}-today .@{prefix}-value {
    box-shadow: none;
  }

  // 清除组件自身的选中
  .cell-wrapper:not(.@{prefix}-selected-day) {
    .@{prefix}-date {
      background: unset;
    }

    .@{prefix}-value {
      color: inherit;
      background: unset;

      &:hover {
        box-shadow: 0 0 0 1px @primary-color inset;
      }
    }
  }

  // 恢复不是当前月份的颜色
  .@{prefix}-last-month-cell,
  .@{prefix}-next-month-btn-day {
    .@{prefix}-value {
      color: @disabled-color !important;
    }
  }

  .calendar-cell-disabled {
    cursor: not-allowed;

    .@{prefix}-value {
      cursor: inherit;

      &:hover {
        box-shadow: none !important;
      }
    }
  }
}
</style>
