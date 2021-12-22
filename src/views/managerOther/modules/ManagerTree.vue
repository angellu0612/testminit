<template>
  <div ref="ManagerTree" class="ManagerTree">
    <!-- 树搜索 -->
    <a-input-search placeholder="搜索" class="treeSearch" @search="treeSearch" />
    <!-- 树 -->
      <a-tree
        v-model="checkedKeys"
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        :show-line="showLine"
        :show-icon="showIcon"
        @expand="onExpand"
        @select="onSelect"
      >
        <!-- <a-icon slot='icon' type="carry-out"></a-icon> -->
      </a-tree>
  </div>
</template>

<script>
import { treeData } from '../data.js'
export default {
  name:"ManagerTree",
  components:{
    treeData,
  },
  data(){
    return {
      expandedKeys: [],//['0-0-0']自动展开父级
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],//不需要选中
      treeData:treeData(),//树的数据
      showLine:true,//连接线
      showIcon:true
      
    }
  },
  methods: {
    // 树搜索
    treeSearch(value) {
      console.log(value);
    },
    //树
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info);
      this.selectedKeys = selectedKeys;
    },
  },
   watch: {
    checkedKeys(val) {
      console.log('onCheck', val);
    },
  },
}
</script>

<style lang="less" scoped>
.ManagerTree{
  border:1px solid #666;
  .treeSearch{
    width:100%;
    border: none;
  }
}
</style>