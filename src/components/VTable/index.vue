<template>
  <div ref="ownTable" class="own-table">
    <ATable
      :columns="slotColumns"
      :data-source="tableData"
      :loading="loading"
      :pagination="pagination && { ...pagination, total, ...tableParams }"
      :row-key="rowKey"
      :row-selection="selection"
      :scroll="{ ...scrollY, ...scroll }"
      v-bind="$attrs"
      @change="setTableParams"
      v-on="$listeners"
    >
      <template v-for="headerSlot in headerRenderKeys" #[headerSlot]>
        <slot :name="headerSlot" />
      </template>
      <template v-for="nativeSlot in nativeRenderKeys" #[nativeSlot]="attrs">
        <slot :name="nativeSlot" v-bind="attrs" />
      </template>
      <!-- prettier-ignore -->
      <template v-for="columnSlot in customRenderKeys" #[columnSlot]="text, record, index">
        <slot :name="columnSlot" v-bind="{ row: record, index, value: text }">
          <span :key="`${columnSlot}-${index}`">{{ text }}</span>
        </slot>
      </template>
    </ATable>
  </div>
</template>

<script>
import tableMixin from './tableMixin';
import { isEmptyObject, equal, slice, getPropWith, composeFunc, unique } from './utils';

const SLOT_SERIAL_NUMBER = '__SLOT_SERIAL_NUMBER__';
const NATIVE_SLOTS = ['title', 'expandedRowRender', 'expandIcon', 'footer'];
const BAN_SLOTS = NATIVE_SLOTS.concat(SLOT_SERIAL_NUMBER);

export default {
  name: 'VTable',
  mixins: [tableMixin],
  inheritAttrs: false,
  data() {
    return {
      // 内部参数对象
      tableParams: {
        current: 1,
        pageSize: 10,
      },
      total: 0,
      selectedData: [],
      tableData: [],
      loading: false,
      scrollY: {}, // 表格适应高度
      reqLimit: false, // 限制请求发送，防止同时调用多次接口
    };
  },
  computed: {
    slotColumns() {
      return proxyColumns(this);
    },
    customRenderKeys() {
      const keys = this.slotColumns.map(v => v.scopedSlots.customRender).filter(v => this.$scopedSlots[v]);
      warn(keys, 'scopedSlots.customRender');
      return keys;
    },
    headerRenderKeys() {
      const keys = this.columns
        .map(v => v.slots?.title)
        .filter(Boolean)
        .filter(v => this.$scopedSlots[v]);
      warn(keys, 'slots.title');
      return keys;
    },
    nativeRenderKeys() {
      return BAN_SLOTS.filter(v => this.$scopedSlots[v]);
    },
    selection() {
      const selection = this.rowSelection;
      if (selection || this.selectedKeys) {
        return {
          // fixed: true,
          ...selection,
          // `rowSelection.selectedRowKeys` is invalid
          selectedRowKeys: this.selectedKeys,
          onChange: composeFunc(this.onSelectChange, selection?.onChange),
          // 如果有 'select' 事件，再绑定相应事件（很耗性能）
          onSelect: composeFunc(this.hasSelectAction && this.selectOne, selection?.onSelect),
          onSelectAll: composeFunc(this.hasSelectAction && this.selectAll, selection?.onSelectAll),
        };
      }

      return undefined;
    },
    isCompleteData() {
      // 不需要分页 | 开启内部分页 | 本地数据
      return !this.pagination || this.isPaging || Array.isArray(this.dataSource);
    },
  },
  beforeCreate() {
    // 开启表格选中时，选中发生切换的 rows 和 选中类型（增加|移除）
    this.changeRows = [];
    this.selected = false;
    // 缓存旧的查询参数对象
    this.cacheTableParams = {};
  },
  created() {
    // 是否有 `select` 事件 (前提是已绑定 selectedKeys)
    this.hasSelectAction = !!(Array.isArray(this.selectedKeys) && this.$listeners.select);
    if (this.hasSelectAction) {
      this.$watch('selectedKeys', keys => {
        const list = unique([...this.selectedData, ...this.tableData], this.rowKey);
        this.selectedData = list.filter(row => keys.includes(this.getKeyByRow(row)));
        this.$emit('select', this.selectedData, this.changeRows, this.selected);
      });
    }
    // 弹窗弹出时表格延时计算，防止高度获取失效
    if (this.isSelfHeight) {
      setTimeout(() => {
        this.scrollY = { y: this.$refs.ownTable.clientHeight - 100 };
      }, 100);
    }
  },
  mounted() {
    if (!this.lazy) this.setTableList();
    if (this.isSelfHeight) {
      this.scrollY = { y: this.$refs.ownTable.clientHeight - 100 };
    }
  },
  methods: {
    setTableParams({ current, pageSize }, filter, sorter) {
      if (this.tableParams.current !== current || this.tableParams.current !== pageSize) {
        this.$emit('change-params', { current, pageSize });
      }
      if (!equal(this.tableParams.filter, filter)) {
        this.updateForce();
        this.$emit('change-filter', filter);
      }
      if (!equal(this.tableParams.sorter, sorter)) {
        this.updateForce();
        this.$emit('change-sorter', sorter);
      }
      this.tableParams = { current, pageSize, filter, sorter };
      this.setTableList();
    },
    // 强制更新数据
    updateForce() {
      this.total = 0;
    },
    async setTableList() {
      if (!this.isReq) return;
      if (this.isLoading) this.loading = true;
      // 如果是完整数据
      if (this.isCompleteData) {
        // 如果总条数为 0 或强制更新数据，则重新拉取数据
        if (!this.total || this.isReload) {
          try {
            this.reqLimit = true;
            const { filter, sorter } = this.tableParams;
            const res = await this.getData({ filter, sorter, ...this.params });
            [this.total, this.tableData] = [res.total, res.data];
          } finally {
            this.reqLimit = false;
          }
        }
        this.$emit('change', slice(this.tableData, this.tableParams));
      } else {
        try {
          this.reqLimit = true;
          const res = await this.getData({ ...this.tableParams, ...this.params });
          [this.total, this.tableData] = [res.total, res.data];
          this.$emit('change', this.tableData);
        } finally {
          this.reqLimit = false;
        }
      }
      // 如果页码 > 1 且 表格数据为空，则回退到上一页
      if (this.tableParams.current > 1 && !this.tableData.length) {
        return await this.backLastPage();
      }
      // 通知已经刷新
      if (this.isReload) this.$emit('update:is-reload', false);
      this.loading = false;
    },

    backLastPage() {
      this.tableParams.current -= 1;
      return this.setTableList();
    },
    // 获取数据，包括本地数据、不分页请求、分页请求
    async getData(params) {
      if (Array.isArray(this.dataSource)) {
        return { data: this.dataSource, total: this.tableTotal || this.dataSource.length };
      }
      let res = {};
      try {
        res = await this.http(this.filterParams(params));
        res = { data: res.data, total: res.total };
      } catch (err) {
        res = { data: [], total: 0 };
        this.loading = false;
        if (process.env.NODE_ENV !== 'production') throw err;
      }
      return res;
    },
    filterParams({ filter, sorter, ...rest }) {
      if (!isEmptyObject(filter)) rest.filter = filter;
      if (!isEmptyObject(sorter)) rest.sorter = sorter;
      return rest;
    },

    onSelectChange(selectedRowKeys) {
      this.$emit('update:selected-keys', selectedRowKeys);
    },
    // 选择/取消选择所有列
    selectAll(selected, selectedRows, changeRows) {
      changeRows.forEach(record => this.changeSelection(record, selected));
      [this.changeRows, this.selected] = [changeRows, selected];
    },
    // 选择/取消选择某一列
    selectOne(record, selected) {
      this.changeSelection(record, selected);
      [this.changeRows, this.selected] = [[record], selected];
    },
    changeSelection(record, selected) {
      const val = this.getKeyByRow(record);
      const index = this.selectedData.findIndex(row => this.getKeyByRow(row) === val);
      if (selected) {
        if (index < 0) this.selectedData.push(record);
      } else {
        if (index > -1) {
          this.selectedData.splice(index, 1);
          this.changeSelection(record, false);
        }
      }
    },
    getKeyByRow(row) {
      return getPropWith(this.rowKey, row);
    },
  },
};

const proxyColumns = ({ columns, series, tableParams: { current, pageSize } }) => {
  const _columns = columns.filter(v => filterColumn(v, 'table')).map(initColumn);
  const serialKey = SLOT_SERIAL_NUMBER;
  if (series && _columns.length && _columns[0].key !== (series.key ?? serialKey)) {
    const serialColumn = {
      key: serialKey,
      title: '序号',
      width: 96,
      align: 'center',
      customRender: getSerialRender(current, pageSize),
      ...series,
    };
    _columns.unshift(initColumn(serialColumn));
  }
  return _columns;
};

const filterColumn = ({ visible = true }, type) => visible === true || visible === type;

// 将 key, dataIndex, scopedSlots 合并
const initColumn = column => {
  const { key, dataIndex, scopedSlots, title, ...rest } = column;
  return {
    key: key ?? dataIndex,
    dataIndex: dataIndex ?? key,
    scopedSlots: scopedSlots ?? { customRender: dataIndex ?? key },
    title: column.slots?.title ? undefined : title,
    align: 'center',
    ...rest,
  };
};

const getSerialRender = (current, pageSize) => (text, record, index) => (current - 1) * pageSize + index + 1;

const generate = (slot, position) =>
  `[table]: the key '${slot}' have been banned, and you can set the new key with '${position}'.`;

const warn = (keys, position) => {
  if (process.env.NODE_ENV === 'production') return;
  // eslint-disable-next-line
  return BAN_SLOTS.forEach(slot => keys.includes(slot) && console.error(generate(slot, position)));
};
</script>

<style lang="less" scoped>
.own-table {
  height: 100%;

  /deep/ .ant-table-wrapper {
    height: 100%;
  }

  /deep/ .ant-table-body {
    // min-height: 90px;
    overflow-y: scroll !important;
  }

  /deep/ .ant-table {
    .ant-table-thead > tr > th,
    .ant-table-row > td {
      @media screen {
        @media (max-width: 768px) {
          white-space: nowrap;
        }
        @media (max-width: 992px) {
          word-break: keep-all;
        }
      }
    }
    .ant-divider.ant-divider-vertical {
      margin: 0;
    }
  }

  /deep/ .ant-table-placeholder {
    border-bottom: 0;
    // margin-top: -90px;
    opacity: unset;
  }
}
</style>
