<template>
  <div ref="ManagerTree1" class="ManagerTree1">
    <a-input-search v-model="searchStr" placeholder="输入搜选项"  @change="onSearch"></a-input-search>
    <!-- selectedKeys是选中项key的集合，expandedKeys是展开项key的集合 -->
    <div class="treeBox">
      <a-tree
        v-model="checkedKeys"
        :treeData="treeData"
        :selectedKeys="selectedKeys"
        :expandedKeys="expandedKeys"
        @expand="onExpand"
        :autoExpandParent="autoExpandParent"
        :replaceFields="replaceFields"
        @select="onSelect"
      >
        <template slot='title' slot-scope={name}>
          <span v-html="name.replace(new RegExp(searchValue,'g'),'<span style=color:#f50>'+ searchValue +'</span>')"></span>
        </template>
        <!-- 操作按钮 -->
        <!-- <template slot="title" slot-scope="item">
          <a-icon type="plus-circle"  @click="()=> append(item)"/>
          <a-icon type="info-circle" @click="()=> edit(item)"/>
          <a-icon type="delete" @click="(e)=> remove(item)"/>
        </template> -->
      </a-tree>
    </div>
  </div>
</template>
<script>
import { treeData } from '../data.js'

  export default {
    data() {
      return {
        replaceFields:{title:'name'},
        expandedKeys: [],
        backupsExpandedKeys: [],
        autoExpandParent: false,
        checkedKeys: [],
        selectedKeys: [],
        searchValue: '',
        treeData:treeData(),
        searchStr: ''
      };
    },
    methods: {
      onSearch(){
        var vm=this;
        //添加这行代码是为了只点击搜索才触发
        vm.searchValue = vm.searchStr;
        //如果搜索值为空，则不展开任何项，expandedKeys置为空
        //如果搜索值不位空，则expandedKeys的值要为搜索值的父亲及其所有祖先
        if(vm.searchValue === ''){
          vm.expandedKeys = [];
        }else{
          //首先将展开项与展开项副本置为空
          vm.expandedKeys = [];
          vm.backupsExpandedKeys = [];
          //获取所有存在searchValue的节点
          let candidateKeysList = vm.getkeyList(vm.searchValue,vm.treeData,[]);
          //遍历满足条件的所有节点
          candidateKeysList.map(
            item=>{
              //获取每个节点的母亲节点
              var key=vm.getParentKey(item,vm.treeData);
              //当item是最高一级，父key为undefined，将不放入到数组中
              //如果母亲已存在于数组中，也不放入到数组中
              if(key && !vm.backupsExpandedKeys.some(item=>item===key))
                vm.backupsExpandedKeys.push(key);
            }
          )
          let length=this.backupsExpandedKeys.length;
          for(let i=0;i<length;i++){
            vm.getAllParentKey(vm.backupsExpandedKeys[i],vm.treeData)
          }
          vm.expandedKeys = vm.backupsExpandedKeys.slice();
        }
      },
      //获取节点中含有value的所有key集合
      getkeyList(value,tree,keyList){
        //遍历所有同一级的树
        for(let i=0;i<tree.length;i++){
          let node = tree[i];
          //如果该节点存在value值则push
          if(node.name.indexOf(value)>-1){
            keyList.push(node.key);
          }
          //如果拥有孩子继续遍历
          if(node.children){
              this.getkeyList(value,node.children,keyList);
          }
        }
        //因为是引用类型，所有每次递归操作的都是同一个数组
        return keyList;
      },
      //该递归主要用于获取key的父亲节点的key值
      getParentKey(key,tree){
        let parentKey,temp;
        //遍历同级节点
        for(let i=0;i<tree.length;i++){
          const node=tree[i];
          if(node.children){
            //如果该节点的孩子中存在该key值，则该节点就是我们要找的父亲节点
            //如果不存在，继续遍历其子节点
            if(node.children.some(item=>item.key===key)){
              parentKey = node.key;
            }else if(temp=this.getParentKey(key,node.children)){
              //parentKey = this.getParentKey(key,node.children)
              //改进，避免二次遍历
              parentKey = temp;
            }
          }
        }
        return parentKey;
      },
      //获取该节点的所有祖先节点
      getAllParentKey(key,tree){
        var parentKey;
        if(key){
          //获得父亲节点
          parentKey = this.getParentKey(key,tree);
          if(parentKey){
          	//如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
            if(!this.backupsExpandedKeys.some(item=>item===parentKey)){
              this.backupsExpandedKeys.push(parentKey);
            }
            //继续向上查找祖先节点
            this.getAllParentKey(parentKey,tree)
          }
        }
      },
      onExpand(expandedKeys) {
        //用户点击展开时，取消自动展开效果
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
      //操作
      // 递归查找
    searchOption (option, arr, type = 'delect') {
      console.log(option, arr)
      for (let s = 0; s < arr.length; s++) {
        console.log(arr[s].key, option.key)
        if (arr[s].key === option.key) {
          if (type === 'delect') {
            arr.splice(s, 1)
          } else {
          //这是模拟数据编辑数据
            this.$set(arr, s, {
              title: '12121212',
              key: '12121212',
              scopedSlots: { title: 'custom' }
            })
          }
          break
        } else if (arr[s].children && arr[s].children.length > 0) { // 递归条件
          this.searchOption(option, arr[s].children)
        } else {
          continue
        }
      }
    },
    append (data) {
    //模拟添加
      const newChild = { title: 'ceshi1',
        key: 'ceshi1',
        scopedSlots: { title: 'custom' },
        children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove (data) {
    	//先请求后端接口，删除成功后执行
      this.searchOption(data, this.treeData)
    },
    edit (data) {
    	//先请求后端接口，编辑成功后执行
      this.searchOption(data, this.treeData, 'edit')
    },
    },
  };
</script>
<style scope>
.ManagerTree1{
  border: 1px solid #999;
  height: calc(100vh - 90px);
}
.treeBox{
  border: 1px solid #999;
  height: calc(70vh);
  background-color:#eee;
}
  /* .but_type {
    position: absolute;
    right: 0;
  } */
</style>
