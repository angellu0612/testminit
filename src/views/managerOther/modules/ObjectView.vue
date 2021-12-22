<template>
  <div ref="ObjectView" class="ObjectView">
    <a-row :gutter='[6,6]' class="objectTitle">
      <a-col :span='24'>
        <span>监控对象类型：</span>
        <!-- 下拉框/输入框 -->
        <!-- 或者可以把 :default-value="subjectNamesSelect" 改成 v-model="subjectNamesSelect"-->
        <a-select style="width:200px" :default-value="subjectNamesSelect" disabled="disabled">
          <a-select-option v-for='(item, index) in subjectNames' :key="index">
            {{item.value}}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span='24'>
        <!-- 折叠框 -->
        <div class="basicInformation">
          <a-collapse v-model="basicActiveKey">
            <a-collapse-panel key="1" header="基本信息">
              <!-- 基本信息描述列表插件 -->
              <div>
                <a-button class="basicEdit" type="primary">编辑</a-button>
                <!-- title="User Info" -->
                <a-descriptions> 
                  <a-descriptions-item label="编号">
                    {{basicName}}
                  </a-descriptions-item>
                  <a-descriptions-item label="展示名称">
                    {{dispalyName}}
                  </a-descriptions-item>
                  <a-descriptions-item v-for="(item,index) in objectBasicInfo" :key="index" :label="item.displayName">
                    {{item.value}}
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="告警规则" :disabled="false">
              <AlarmRule/>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="事件规则">
              <div>
                <!-- 事件规则 -->
                <EventRule/>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {subjectNames, objectBasicInfo, alarmData, innerData} from '../data.js'
import EventRule from './EventRule.vue'
import AlarmRule from './AlarmRule.vue'
export default {
  name:'ObjectView',
  components:{
    EventRule,
    AlarmRule
  },
  data(){
    return{
      subjectNames:subjectNames(),//下拉框
      subjectNamesSelect:subjectNames()[0].value,//下拉框默认第一个
      basicActiveKey:['1','2','3'],
      objectBasicInfo: objectBasicInfo(),//通道参数
      basicName: 'link',
      dispalyName: 'link',
      disabled:true,//告警开关
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
          }
      ]

    }
  },
  methods:{
     handleMenuClick(e) {
      console.log('click', e);
    },
    showInnerTable(){
      debugger
      this.expandedRowRender = true
    },
  },
  watch:{
    basicActiveKey(key){
      console.log(key)
    }
  }
}
</script>

<style lang="less" scoped>
.ObjectView{
  width: calc(100vw -10px);
  height: calc(100vh - 90px);
  border: 1px solid #999;
  padding: 10px;
  overflow: scroll;
  .alarmRuleAdd{
    margin-bottom: 10px;
  }
  .basicEdit, .alarmRuleAdd{
    float: right;
    font-size:12px;
    line-height: 24px;
    height: 24px;

  }
  .operat span{
    font-size:12px;
    margin-right: 10px;
  }
  .ant-table-row-expand-icon-cell{
    position: absolute;
    left: 230px;
    z-index: 99;
  }
}
</style>