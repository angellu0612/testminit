/*
 * @Author: your name
 * @Date: 2021-08-13 09:07:54
 * @LastEditTime: 2021-08-16 09:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/views/book/data.js
 */
/**
 * 查询条件
 */
export function getFields() {
  return [
    { tag: 'ASelect', key: 'mid', label: '卫星代号', attrs: { allowClear: true } },
    { tag: 'ASelect', key: 'jzsj', label: '基准时间', attrs: { allowClear: true } },
    { tag: 'ASelect', key: 'cksjbh', label: '测控事件', attrs: { allowClear: true } },
    { tag: 'ASelect', key: 'qyzt', label: '启用状态', attrs: { allowClear: true } },
    { tag: 'VRangePicker', key: 'date', label: '日期', attrs: { allowClear: true } },
  ];
}

/**
 * 表头
 */
export function getColumns() {
  return [
    { key: 'id', title: '序号', width: 96, align: 'center', ellipsis: true },
    { key: 'mid', title: '卫星代号', width: 120, align: 'center', ellipsis: true },
    { key: 'cksjbh', title: '事件名称', width: 80, align: 'center', ellipsis: true },
    { key: 'jzsj', title: '基准时间', width: 120, align: 'center', ellipsis: true },
    { key: 'zxsj', title: '执行时机', width: 120, align: 'center', ellipsis: true },
    { key: 'qyzt', title: '状态', width: 120, align: 'center', ellipsis: true },
    { key: 'actions', title: '操作', align: 'center', width: 200 },
  ];
}

/**
 * 操作按钮集合
 */
export function getButtons() {
  return [
    {
      type: 'primary',
      key: 'add',
      title: '添加',
      icon: 'file-add',
    },
  ];
}
