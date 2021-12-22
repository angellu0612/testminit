export function treeData() {
  return [
    {
      name: '系统监控',
      key: '系统监控',
      scopedSlots: {title: "title"},
      children: [
        {
          name: '链路分类',
          key: '链路分类',
          scopedSlots: {title: "title"},
          children: [
            { name: 'link', key: 'link',scopedSlots:{title: "title"},children:[
              { name: '0-0-0-0-0', key: '0-0-0-0-0',scopedSlots:{title: "title"}, children:[
                  {name: '0-0-0-0-0-0', key: '0-0-0-0-0-0',scopedSlots:{title: "title"}},
                  {name: '0-0-0-0-0-1', key: '0-0-0-0-0-1',scopedSlots:{title: "title"}}
                ]},
              { name: '0-0-0-0-1', key: '0-0-0-0-1',scopedSlots:{title: "title"},children:[
                  { name: '0-0-0-0-1-0', key: '0-0-0-0-1-0',scopedSlots:{title: "title"}},
                  { name: '0-0-0-0-1-1', key: '0-0-0-0-1-1',scopedSlots:{title: "title"}}
                ]},
              { name: '0-0-0-0-2', key: '0-0-0-0-2',scopedSlots:{title: "title"} },
           ] },
            { name: '袔什站', key: '袔什站',scopedSlots:{title: "title"} },
            { name: '青岛站', key: '青岛站',scopedSlots:{title: "title"} },
          ],
        },
        {
          name: '微服务分类',
          key: '微服务分类',
          scopedSlots:{title: "title"},
          children: [
            { name: '微服务1', key: '微服务1',scopedSlots:{title: "title"} },
            { name: '微服务2', key: '微服务2',scopedSlots:{title: "title"} },
            { name: '微服务3', key: '微服务3',scopedSlots:{title: "title"} },
          ],
        },
        {
          name: '0-0-2',
          key: '0-0-2',
          scopedSlots: {title: "title"}
        },
      ],
    }
  ];
};
export function subjectNames() {
  return [
    {
      value: '链路',
      key: 1,
      title: 1
    },
    {
      value: 'lisi',
      key: 2,
      title: 2
    }
  ]
};
export function objectBasicInfo(){
  return [
    {
      displayName: '用户名',
      value: 'admin'
    },
    {
      displayName: '密码',
      value: 'admin'
    },
    {
      displayName: '消息中间件IP地址',
      value: '192.168.10.202'
    },
    {
      displayName: '消息中间件端口',
      value: '8080'
    },
    {
      displayName: '主题',
      value: 'bxlink'
    },
    {
      displayName: '超时时间(单位：秒)',
      value: '301'
    }
]
};
// 告警规则数据
export function alarmData(){
  return [
    {
      description:'磁盘使用告警',
      rules:'2条告警规则',
      trigerTime:'1',
      alarmMask:'1',
      key:'1',
      children:[
        {
          innerRule:'1重要告警规则',
          innerDes:'xxxxxxxxx',
          innerTime:'1',
          innerMask:'1',
          id:'1'
        },
        {
          innerRule:'1次要告警规则',
          innerDes:'xxxxxxxxx',
          innerTime:'1',
          innerMask:'1',
          id:'2'
        }
      ]
    },
    {
      description:'test',
      rules:'3条告警规则',
      trigerTime:'1',
      alarmMask:'1',
      key:'2',
      children:[
        {
          innerRule:'2重要告警规则1',
          innerDes:'xxxxxxxxx',
          innerTime:'1',
          innerMask:'1',
          id:'1'
        },
        {
          innerRule:'2次要告警规则1',
          innerDes:'xxxxxxxxx',
          innerTime:'1',
          innerMask:'1',
          id:'2'
        },
        {
          innerRule:'2告警1',
          innerDes:'xxxxxxxxx',
          innerTime:'1',
          innerMask:'1',
          id:'3'
        }
      ]
    },
    {
      description:'test1',
      rules:'1条告警规则',
      trigerTime:'1',
      alarmMask:'0',
      key:'3',
      children:[
        {
          innerRule:'3重要告警规则2',
          innerDes:'xxxxxxxxx',
          innerTime:'1',
          innerMask:'1',
          id:'1'
        }
      ]
    },
    {
      description:'test2',
      rules:'0条告警规则',
      trigerTime:'1',
      alarmMask:'0',
      key:'4',
      children:[
      ]
    }
  ]
}
// 告警规则详细数据废弃
export function innerData() {
  return [
    {
      innerRule:'重要告警规则',
      innerDes:'xxxxxxxxx',
      innerTime:'1',
      innerMask:'1',
    },
    {
      innerRule:'次要告警规则',
      innerDes:'xxxxxxxxx',
      innerTime:'1',
      innerMask:'1',
    },
    {
      innerRule:'告警',
      innerDes:'xxxxxxxxx',
      innerTime:'1',
      innerMask:'1',
    }
  ]
}
// 告警级别数据模拟
export function alarmLevelData(){
  return [
    {
      id:1,
      value:'严重告警'
    },
    {
      id:2,
      value:'重要告警'
    },
    {
      id:3,
      value:'次要告警'
    },
    {
      id:4,
      value:'告警'
    },
    {
      id:5,
      value:'待定告警'
    },
    {
      id:6,
      value:'故障告警'
    }
  ]
}