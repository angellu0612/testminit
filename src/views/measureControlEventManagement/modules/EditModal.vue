<!--
 * @Author: your name
 * @Date: 2021-08-13 09:31:52
 * @LastEditTime: 2021-09-09 09:03:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/views/book/modules/EditModal.vue
-->
<template>
  <VModal
    :visible="visible"
    :title="'测试：' + title[type]"
    :confirm-loading="confirmLoading"
    @ok="submit"
    @cancel="cancel"
  >
    <VForm
      ref="ruleForm"
      :model="modelForm"
      :fields="fields"
      :column="1"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      class="v-form"
    />
  </VModal>
</template>

<script>
import { wxcksjpzAddApi, wxcksjpzUpdateApi } from '@/api';
export default {
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    visible: Boolean,
    type: String,
    params: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      confirmLoading: false,
      title: {
        add: '添加',
        edit: '编辑',
      },
      modelForm: {},
      rules: {
        mid: [{ required: true, message: '请输入卫星代号' }],
        cksjbh: [{ required: true, message: '请输入事件名称' }],
        jzsj: [{ required: true, message: '请输入基准时间' }],
        zxsj: [{ required: true, message: '请输入执行时机' }],
      },
    };
  },
  computed: {
    isDisabled() {
      return this.type === 'edit';
    },
    fields() {
      return [
        { tag: 'AInput', key: 'mid', label: '卫星代号' },
        { tag: 'AInput', key: 'cksjbh', label: '事件名称' },
        { tag: 'AInput', key: 'jzsj', label: '基准时间' },
        { tag: 'AInput', key: 'zxsj', label: '执行时机' },
        { tag: 'AInput', key: 'qyzt', label: '启用状态' },
      ];
    },
  },
  watch: {
    visible(visible) {
      if (!visible) return;
      // 此处使用vuex模拟的表格数据的增删改查故暂时注释，使用真实数据时需放开
      // this.$refs.ruleForm?.resetFields();
      this.modelForm = Object.assign({}, this.params);
    },
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate().then(() => {
        this.confirmLoading = true;
        if (this.type === 'add') {
          // 调用添加接口
          wxcksjpzAddApi(this.modelForm)
            .then(() => {
              this.$emit('save');
              this.$message.success('添加成功');
              this.cancel();
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        } else {
          // 调用编辑接口
          wxcksjpzUpdateApi(this.modelForm)
            .then(() => {
              this.$emit('save');
              this.$message.success('编辑成功');
              this.cancel();
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        }
      });
    },
    cancel() {
      this.$emit('change', false);
    },
  },
};
</script>
