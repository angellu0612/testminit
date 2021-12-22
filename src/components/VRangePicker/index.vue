<template>
  <AInputGroup compact class="range-picker-layout">
    <ASelect v-model="type" :options="options" class="type-select" @change="clearValue" />
    <template v-if="type === TimeType.GREGORIAN">
      <ARangePicker
        :value="[start, end].map(createMoment)"
        :placeholder="placeholder"
        v-bind="$attrs"
        class="range-picker"
        @change="changeRange"
      />
    </template>
    <template v-if="type === TimeType.JULIAN">
      <AInputNumber
        v-model="start"
        :min="0"
        :placeholder="placeholder[0]"
        class="time-picker"
        @change="emitChangeEvent"
      />
      <AInputNumber
        v-model="end"
        :min="start"
        :placeholder="placeholder[1]"
        class="time-picker"
        @change="emitChangeEvent"
      />
    </template>
  </AInputGroup>
</template>

<script>
import moment from 'moment';
import { formatRangeDate } from '@/utils';

const TimeType = Object.freeze({
  GREGORIAN: 'gregorian',
  JULIAN: 'julian',
});

const options = [
  { label: '公历', value: TimeType.GREGORIAN },
  { label: '儒略日', value: TimeType.JULIAN },
];

export default {
  name: 'VRangePicker',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: Object,
    placeholder: {
      type: Array,
      default: () => ['开始日期', '结束日期'],
    },
  },
  data() {
    return {
      options,
      type: TimeType.GREGORIAN,
      start: undefined,
      end: undefined,
    };
  },
  watch: {
    value: {
      handler() {
        this.syncValue();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.TimeType = TimeType;
  },
  methods: {
    syncValue() {
      const value = this.value ?? {};
      this.type = value.type ?? TimeType.GREGORIAN;
      this.start = value.start;
      this.end = value.end;
    },
    createMoment(val) {
      return val == null ? val : moment(val);
    },
    clearValue() {
      this.start = undefined;
      this.end = undefined;
      this.emitChangeEvent();
    },
    changeRange(val) {
      [this.start, this.end] = formatRangeDate(val);
      this.emitChangeEvent();
    },
    emitChangeEvent() {
      this.$emit('change', { type: this.type, start: this.start, end: this.end });
    },
  },
};
</script>

<style lang="less" scoped>
.range-picker-layout {
  @select-width: 90px;

  .type-select {
    width: @select-width;
  }

  .time-picker {
    width: calc(50% - @select-width / 2);
  }

  /deep/ .ant-input-number-input:placeholder-shown {
    text-overflow: ellipsis;
    text-align: center;
  }
}
</style>
