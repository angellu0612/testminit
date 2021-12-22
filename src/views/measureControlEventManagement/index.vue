<!--
 * @Author: your name
 * @Date: 2021-08-12 11:04:29
 * @LastEditTime: 2021-09-10 10:11:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/views/book/BookInfo.vue
-->
<template>
  <div class="v-page-container">
    <ARow :gutter="[0, 16]" class="v-page-contant">
      <ACol :span="24">
        <ACard  size="small">
          <VForm :model="modelForm" :fields="fields" @search="search" />
        </ACard>
      </ACol>
      <ACol :span="24" flex="auto">
        <ACard size="small" title="测控事件管理">
          <template #extra>
            <VButtonGroup :buttons="buttons" @click="handleAction" />
          </template>
          <VTable
            rowKey="id"
            :columns="columns"
            :dataSource="data"
            :params="params"
            :is-reload.sync="isReload"
            :selected-keys.sync="test"
          >
            <template #expandedRowRender="record">
              {{ record }}
            </template>
            <template #actions="{ row }">
              <ASpace>
                <AButton type="primary" title="编辑" @click="handleEdit(row)">编辑</AButton>
                <AButton type="danger" title="删除" @click="handleDelete(row)">删除</AButton>
              </ASpace>
            </template>
          </VTable>
        </ACard>
      </ACol>
    </ARow>

    <EditModal v-model="visible" :type="type" :params="selectedRow" @save="handleAction('reload')" />
  </div>
</template>
<script>
import EditModal from './modules/EditModal.vue';
import { getFields, getColumns, getButtons } from './data';
import { cksjglListApi, cksjglDeleteApi } from '@/api';
import { PAGE_NAMES } from '@/constants/page';
export default {
  name: PAGE_NAMES.MEASURE_CONTROL_EVENT_MANAGEMENT,
  components: { EditModal },
  data() {
    return {
      test: [],
      data:[],
      modelForm: {
        mid: undefined,
        jzsj: undefined,
        cksjbh: undefined,
        qyzt: undefined,
      },
      fields: getFields(),
      columns: getColumns(),
      buttons: getButtons(),
      params: {},
      visible: false,
      type: 'add',
      selectedRow: {},
      isReload: false,
    };
  },
  mounted(){
    this.fun()
  },
  methods: {
    fun(){
      cksjglListApi().then(res=>{
        this.data = res.data.pageData
      })
    },
    cksjglListApi,
    search(params) {
      this.params = params;
    },
    handleAction(key) {
      switch (key) {
        case 'add':
          [this.visible, this.type, this.selectedRow] = [true, 'add', {}];
          break;
        case 'reload':
          this.isReload = true;
          break;
      }
    },
    // 编辑
    handleEdit(row) {
      [this.visible, this.type, this.selectedRow] = [true, 'edit', row];
    },
    // 删除
    handleDelete({ id }) {
      this.$confirm({
        title: '提示',
        content: `确认要删除第${id}条数据吗？`,
        onOk: () => {
          cksjglDeleteApi({ id }).then(() => {
            this.$message.success('删除成功');
            this.isReload = true;
          });
        },
        type: 'warning',
      });
    },
  },
};
</script>
