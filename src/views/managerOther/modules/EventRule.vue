<template>
  <div class="EventRule">
    <!-- 添加模态框 -->
    <AddEventRule/>
    <!-- 事件规则表格 -->
    <a-table 
      class="alarmTable" 
      size="small" 
      :columns="alarmColumns" 
      :data-source="alarmData" 
      :expandIconAsCell="false" 
      :expandIconColumnIndex="1"
      :expandIcon="expandIcon"
      @expand="expand"
      :expandedRowKeys ="expandedRowKeys"
    >
    <!--:expandIconAsCell="false"和 :expandIconColumnIndex="1"//展开图标放在第几列 -->
    <!-- :expandIcon="expandIcon"控制展开图标的样式 -->
    <!--  @expand="expand" :expanded-row-keys.sync="expandedRowKeys"展开图标触发 -->
      <!-- 屏蔽开关 -->
        <template slot="alarmMask" slot-scope="alarmMask">
          <span v-if="alarmMask === '1'">
              <a-switch size="small" default-checked :disabled="disabled"/>
          </span>
          <span v-if="alarmMask === '0'">
              <a-switch size="small" :disabled="disabled"/>
          </span>
        </template>
        <!-- 规则加下拉按钮 -->
        <template slot="rules" slot-scope="rules">
          <span>{{rules}}</span>
          <!-- <span style="margin-left:5px"  @click="showInnerTable()">
            <a-icon type="down-square" />
          </span> -->
        </template>
        <!-- 嵌套另一个表格 -->
        <a-table
          size="small"
          slot="expandedRowRender"
          slot-scope=""
          :rowKey="record => record.id"
          :columns="innerColumns"
          :data-source="innerData"
          :pagination="false"
        >
          <a class="innerOperat" slot="innerOperat" slot-scope="text, record" href="javascript:;">
            <span @click="onDelete(record.id)">删除</span>
          </a>
        </a-table>
        <!-- 操作 -->
        <a class="operat" slot="operate" slot-scope="text, record" href="javascript:;">
          <span>编辑</span>
          <span @click="onDeleteOut(record.key)">删除</span>
        </a>
    </a-table>
  </div>
</template>

<script>
import { alarmData, innerData} from '../data.js'
import AddEventRule from './AddEventRule.vue'
export default {
  name:'AlarmRule',
  components:{
    alarmData,
    innerData,
    AddEventRule,
  },
  data(){
    return {
      alarmData:alarmData(),//告警规则数据
      disabled:true,//告警开关
      innerData:[],//告警规则详情
      innerShow:false,
      expandedRowRender:false,
      alarmColumns: [
         {
            title: '告警描述',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: '告警规则',
            dataIndex: 'rules',
            key: 'rules',
            width: 150,
            scopedSlots: { customRender: 'rules' },
          },
          {
            title: '触发次数',
            dataIndex: 'trigerTime',
            key: 'trigerTime',
            ellipsis: true,
          },
          {
            title: '告警屏蔽',
            dataIndex: 'alarmMask',
            key: 'alarmMask',
            ellipsis: true,
            scopedSlots: { customRender: 'alarmMask' },
          },
          {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            scopedSlots: { customRender: 'operate' },
          }
      ],
      innerColumns:[
         {
            title: '告警规则',
            dataIndex: 'innerRule',
            key: 'innerRule',
          },{
            title: '描述',
            dataIndex: 'innerDes',
            key: 'innerDes',
          },{
            title: '触发次数',
            dataIndex: 'innerTime',
            key: 'innerTime',
          },
          {
            title: '触发屏蔽',
            dataIndex: 'innerMask',
            key: 'innerMask',
          },
          {
            title: '操作',
            dataIndex: 'innerOperat',
            key: 'innerOperat',
            scopedSlots: { customRender: 'innerOperat' },
          }
      ],
      expandedRowKeys:[]//展开子表格
	  }
  },
  methods:{
    // 展开图标的配置
    expandIcon(props) {
        console.log(props);
        if(props.record.children.length > 0){
          if (props.expanded) {//有数据-展开时候图标
            return (
              <a
                style="color: 'black',margin-right:0px"
                onClick={(e) => {
                  props.onExpand(props.record, e);
                }}
              >
                <a-icon type="up" />{" "}
              </a>
            );
          } else {//有数据-未展开时候图标
            return (
              <a
                style="color: 'black' ,margin-right:0px"
                onClick={(e) => {
                  props.onExpand(props.record, e);
                }}
              >
                <a-icon type="down" />
              </a>
            );
          } 
        }else{
          return (
            <span style="margin-right:0px">
              <a-icon type="smile" />
            </span>
          );
        }
        // if (props.record.fileInfoList.length > 0) {
        //   if (props.expanded) {//有数据-展开时候图标
        //     return (
        //       <a
        //         style="color: 'black',margin-right:0px"
        //         onClick={(e) => {
        //           props.onExpand(props.record, e);
        //         }}
        //       >
        //         <a-icon type="down" />{" "}
        //       </a>
        //     );
        //   } else {//有数据-未展开时候图标
        //     return (
        //       <a
        //         style="color: 'black' ,margin-right:0px"
        //         onClick={(e) => {
        //           props.onExpand(props.record, e);
        //         }}
        //       >
        //         <a-icon type="right" />
        //       </a>
        //     );
        //   }
        // } else {//无数据-图标
        //   return (
        //     <span style="margin-right:0px">
        //       <a-icon type="smile" />
        //     </span>
        //   );
        // }
    },
    // 展开图标触发
    expand(expanded, record){
      this.expandedRowKeys =[]
      if(expanded){
        this.expandedRowKeys.push(record.key)
        this.innerData =[]
        this.innerData = record.children
        // let key = this.expandedRowKeys.pop()
        // this.expandedRowKeys1 = []
        // this.expandedRowKeys1.push(key)
        // 根据选中的数据查询接口
        // const data = {
        //   variablesGroupId: record.id
        // }
        // variableList(data).then(res => {
        //   this.variableInnerData = res.result.records
        // })
      }
    },
    //表格删除当前行
    // deleteRecord = (id) => {
    //     let newData = this.state.dataSources.filter(function (item) {
    //         return item.id !== id//返回你选中删除之外的所有数据
    //     })
    //     this.setState({
    //         dataSources: newData
    //     })
    // }
    //删除子表格
    onDelete(id){
      const innerData = [...this.innerData];
      this.innerData = innerData.filter(item => item.id !== id);
    },
    //删除父表格
    onDeleteOut(key){
      const alarmData = [...this.alarmData];
      this.alarmData = alarmData.filter(item => item.key !== key);
    }
  }

}  
</script>

<style lang="less" scoped>
.EventRule{
  .operat span{
    font-size: 12px;
    margin-right: 10px;
  }
  .EventRuleModol{
    height: 600px;
    overflow: scroll;
  }
  .innerOperat{
    font-size: 12px;
  }
}

</style>