export function outerData(){
  return [
    {
      "success": true,
      "code": "200",
      "message": "分页查询成功",
      "data": [{
        "dict_id": 1,
        "dict_code": "common_org_type",
        "dict_name": "机构类别",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": "机构类别"
      }, {
        "dict_id": 2,
        "dict_code": "common_user_type",
        "dict_name": "人员类别",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": "人员类别"
      }, {
        "dict_id": 48,
        "dict_code": "cdsfcsdcf",
        "dict_name": "修改属性1",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": ""
      }, {
        "dict_id": 49,
        "dict_code": "bugbugbug",
        "dict_name": "有字典id",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": ""
      }, {
        "dict_id": 50,
        "dict_code": "1",
        "dict_name": "名称",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": "1"
      }, {
        "dict_id": 51,
        "dict_code": "1",
        "dict_name": "1",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": null
      }, {
        "dict_id": 52,
        "dict_code": "1",
        "dict_name": "1",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": null
      }, {
        "dict_id": 53,
        "dict_code": "1",
        "dict_name": "1",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": null
      }, {
        "dict_id": 54,
        "dict_code": "1",
        "dict_name": "1",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": ""
      }, {
        "dict_id": 55,
        "dict_code": "dbhasuiuh",
        "dict_name": "测试字典1",
        "dict_pid": null,
        "dict_status": 1,
        "dict_remark": "备注"
      }],
      "totalCount": 11,
      "pageNo": 1,
      "pageSize": 10,
      "totalTag": 1
    }
  ]
}
export function innerData(){
  return [
    {
      "success": true,
      "code": "200",
      "message": "查询成功",
      "data": [{
        "item_id": 2,
        "dict_id": 1,
        "item_text": "外部",
        "item_value": "2",
        "item_status": 1,
        "item_sort": 2,
        "item_remark": null,
        "item_checked": 1,
        "editable": 0 // 写死就行了  一定要有  用于内部表格编辑功能
      }, {
        "item_id": 1,
        "dict_id": 1,
        "item_text": "内部",
        "item_value": "1",
        "item_status": 1,
        "item_sort": 1,
        "item_remark": "1",
        "item_checked": 1,
        "editable": 0
      }]
    }
  ]
}
