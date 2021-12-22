<template>
  <div ref="manageOne" class="manageOne">
    <a-row :gutter=[10,10]>
      <a-col :span="6">
        <!-- 树组件 -->
        <!-- <ManagerTree/> -->
        <ManagerTree1/>
      </a-col>
      <a-col :span="17">
        <!-- 对象详情展示 -->
        <ObjectView/>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import ManagerTree from './modules/ManagerTree'
import ManagerTree1 from './modules/ManagerTree1'
import ObjectView from './modules/ObjectView.vue'
export default {
  name:"nanagerOne",
  components:{
    ManagerTree,
    ManagerTree1,
    ObjectView
  },
  data(){
    return{

    }
  },

}
</script>

<style>

</style>