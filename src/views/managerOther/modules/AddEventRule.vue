<template>
  <div class="addEvent">
    <a-button class="alarmRuleAdd" type="primary" @click="showEventModal">添加</a-button>
    <!-- 弹框 -->   
    <a-modal :width='width' class="EventRuleModol" v-model="Eventvisible" title="新增告警规则" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>
      <div>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col='labelCol'
          :wrapper-col="wrapperCol"
        >
          <!-- //不需要增减的表单项  
          设置display:flex属性 可让表单显示在一行 /layout="inline" 水平一行-->
          <!-- // prop 表单域的model字段 -->
            <a-form-model-item  label="告警名称"  prop="alramName"  ref="alramName">
              <a-input v-model="form.alramName"></a-input>
            </a-form-model-item>  
            <a-form-model-item label="统一告警描述"  prop="alarmDesc"  ref="alarmDesc">
              <a-textarea v-model="form.alarmDesc" placeholder="输入告警描述" :auto-size="{minRows:2,maxRows:6}">
              </a-textarea>
            </a-form-model-item>
            <a-form-model-item label="告警级别选择"  prop="alarmDesc"  ref="alarmDesc">
              <a-select
                v-model="alarmLevelvalue"
                mode="multiple"
                style="width: 100%"
                placeholder="选择告警级别"
                option-label-prop="label"
                @change="alarmLevelvalueChange"
              >
                <a-select-option v-for="(item,index) in alarmLevelData" :key="index" :value="item.value" :label="item.value">
                  {{item.value}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- 告警规则配置 -->
            <a-form-model-item v-for="(item,index) in alarmLevelSelt" :key="index" :label="item.value + '规则'">
              <div v-for="(tab,index1) in item.tabs" :key="index1">
                <div style="display:flex ;margin-top:10px" class="params" ref="alarmsParams">
                  <!-- 参数 -->
                  <a-select
                  v-model="tab.parameterDataValue"
                  style="width: 100%"
                  placeholder="参数"
                >
                    <a-select-option v-for="(item,index) in parameterData" :key="index" :value="item.value" :label="item.value">
                      {{item.value}}
                    </a-select-option>
                  </a-select>
                  <!-- 操作符 -->
                  <a-select
                    v-model="tab.operatorvalue"
                    style="width: 100%"
                    placeholder="操作符"
                    option-label-prop="label"
                  >
                    <a-select-option v-for="(item,index) in operatorData" :key="index" :value="item.value" :label="item.value">
                      {{item.value}}
                    </a-select-option>
                  </a-select>
                  <!-- 数字 -->
                  <a-select
                    v-model="tab.numbervalue"
                    style="width: 100%"
                    placeholder="数字"
                    option-label-prop="label"
                  >
                    <a-select-option v-for="(item,index) in numberData" :key="index" :value="item.value" :label="item.value">
                      {{item.value}}
                    </a-select-option>
                  </a-select>
                  <a-button  @click="removeRow(tab)" v-if="index1 !== 0">
                    <a-icon type="minus-circle"/>
                  </a-button>
                </div>
                <a-button @click="addRow(index)" v-if="index1 == item.tabs.length-1">
                  <a-icon type="plus-circle" />
                </a-button>
              </div>
              <div style="display:flex margin-left:-200px">
                <span>{{item.value}}规则描述：</span>
                <a-textarea v-model="description" placeholder="输入告警描述" :auto-size="{minRows:2,maxRows:6}">
                </a-textarea>
              </div>
            </a-form-model-item>
            <!-- //这里你可以写多组表单项
            ...         
            //需要动态增减的表单行
            //InfoList就是我们每次添加表单时要push对象的数组 -->            
            <div v-for="(item,index) in form.InfoList" :key="item.index" style="display:flex">
              <a-form-model-item 
                label="工作" 
                :prop=" 'InfoList.' + index + '.work' "    
                :rules="rules.work"
              >
                <!-- //rules在这里单独为表单项绑定校验规则 -->
                <a-input v-model="item.work"></a-input>
              </a-form-model-item>              
              <a-form-model-item
                label="等级" 
                :prop=" 'InfoList.' + index + '.level' "        
                :rules="rules.level"
                >
                <!-- //rules在这里单独为表单项绑定一个校验规则
                //input需要绑定到InfoList中的元素 -->
                <a-input v-model="item.level"></a-input>
              </a-form-model-item>
              <!-- //如果你要保留最开始的表单行  可在删除icon上添加v-if="index !== 0" index为0时不显示删除icon -->
              <a-form-model-item  v-if="index !== 0">
                <a-button  @click="removeRow(item)">
                  <a-icon type="minus-circle"/>
                </a-button>
              </a-form-model-item>  
              <a-form-model-item>
                <a-button @click="addRow">
                  <a-icon type="plus-circle" />
                </a-button>
              </a-form-model-item>            
            </div>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { alarmLevelData } from '../data'
export default {
  name:'AddEventRule',
  components:{
    alarmLevelData,
  },
  data(){
    return {
      // form:{
      //   layout:'horizontal',
      // },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      Eventvisible:false,//弹出框
      loading:false,
      width:1000,
      form: {
        alramName: '',
        alarmDesc: '',
        //如果刚开始不需要增减的表单项，数组置为空 ，后边向数组push对象 
        InfoList:[
        {
          work: '',
          level: '',
        }		
        ]
		  },
      // 告警级别
      alarmLevelvalue:[],
      tempAlarmLevelvalue:[],
      //你的校验规则
      rules:{
        name: [{}],
        age: [{}],
        work: [{}],
        level: [{}],
      },
      alarmLevelData:alarmLevelData(),
      alarmLevelSelt:[],
      // 参数
      parameterData:[
        {
          id:1,
          value:'系统名称'
        },
        {
          id:2,
          value:'实例数量'
        },
      ],
      parameterDataValue:[],
      //操作符
      operatorData:[
        {
          id:'1',
          value:'&&'
        },{
          id:'2',
          value:'||'
        }
      ],
      operatorvalue:[],
      //数字
      numberData:[
        {
          id:'1',
          value:'0'
        },{
          id:'2',
          value:'1'
        }
      ],
      numbervalue:[],
      description:'',
      formData: {
        tabs:[
          {
            tabId: "",
            fieldId: "",
            parameterDataValue:[],
            operatorvalue:[],
            numbervalue:[],
          }
        ]
      }
    }
  },
  methods:{
    showEventModal() {
      console.log(1111)
      this.Eventvisible = true
    },
    showModal() {
      this.Eventvisible = true;
    },
    handleCancel(){
      this.Eventvisible = false;
    },
    handleOk(e) {
      this.Eventvisible = true;
      this.loading = true;
      setTimeout(() => {
        this.Eventvisible = false;
        this.loading = false;
      }, 3000);
    },
    //增加表单行  为添加按钮绑定一个 添加事件  向数组里push 对象
    addRow(index) {
      // this.form.InfoList.push({
      //   work: '',
      //   level: '',
      // })
      this.alarmLevelSelt[index].tabs.push({
          tabId: "",
          fieldId: "",
          parameterDataValue:[],
          operatorvalue:[],
          numbervalue:[],
      });
    },
    removeRow(tab) {
      this.alarmLevelSelt.forEach((item) =>{
        let index = item.tabs.indexOf(tab)
        if(index !== -1) {
        item.tabs.splice(index, 1);
        }
      })
    },
    // 数组去重
    unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
　　　　　　　console.log(hash);
        }
    }
    return result;
    },

    alarmLevelvalueChange(val){
      if(val.length > this.alarmLevelSelt.length){
        let obj = {
          id:val.length,
          value:val[val.length -1],
          tabs:[
            {
            tabId: val.length,
            fieldId: "",
            parameterDataValue:[],
            operatorvalue:[],
            numbervalue:[],
            }
          ]
        }
        this.alarmLevelSelt.push(obj)
        this.alarmLevelvalue = val
      }
      if(val.length < this.alarmLevelSelt.length){
        console.log(111)
        let that = this.alarmLevelSelt
        that.forEach(function(item,index){
          if(val.indexOf(item.value) ==-1){
            that.splice(index,1)
          }
        })
        this.alarmLevelSelt = that
      }
        // var isAdd = val.length > this.tempAlarmLevelvalue.length
        // var tempAlarmLevelSelt =this.alarmLevelSelt
        // var it 
        // if (isAdd) {
        //   it = val[val.length-1]
        //   let obj = {
        //     id:this.alarmLevelSelt.length,
        //     value:it,
        //     tabs:[
        //       {
        //       tabId: "",
        //       fieldId: "",
        //       parameterDataValue:[],
        //       operatorvalue:[],
        //       numbervalue:[],
        //       }
        //     ]
        //   }
        //   tempAlarmLevelSelt.push(obj)
        // }else{
        //   this.tempAlarmLevelvalue.forEach((item,index) => {
        //     var i = val.indexOf(item)
        //     console.log('this.i',i)
        //     if(i==-1){
        //       it = item
        //     }
        //   })

        //   this.alarmLevelSelt.forEach((item,index) => {
        //   if(item.value == it){
        //     tempAlarmLevelSelt.splice(index,1)
        //   }
        // })
        // }
      
        // this.alarmLevelSelt=tempAlarmLevelSelt
        // this.tempAlarmLevelvalue = val;
        // console.log('this.alarmLevelSelt',this.alarmLevelSelt)
        // console.log('this.tempAlarmLevelvalue',this.tempAlarmLevelvalue)
      //}
    }
  },
}
</script>

<style lang="less" scoped>
.addEvent{
  display: flex;
  flex-direction: column;
  align-items: flex-end;//这三个属性是flex靠右
  .alarmRuleAdd{
      margin-bottom: 10px;
      font-size:12px;
      line-height: 24px;
      height: 24px;
  }
}

</style>