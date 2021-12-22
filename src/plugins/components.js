/*
 * @Author: your name
 * @Date: 2021-08-12 11:02:15
 * @LastEditTime: 2021-08-13 09:21:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/plugins/components.js
 */
import { wrappedTable } from './wrapped';

export default {
  VTable: wrappedTable(() => import(/* webpackChunkName: "VTable" */ '@c/VTable')),
  VForm: () => import(/* webpackChunkName: "VForm" */ '@c/VForm'),
  VModal: () => import(/* webpackChunkName: "VModal" */ '@c/VModal'),
  VRangePicker: () => import(/* webpackChunkName: "VRangePicker" */ '@c/VRangePicker'),
  VMultipleCalendar: () => import(/* webpackChunkName: "VMultipleCalendar" */ '@c/VMultipleCalendar'),
  VButtonGroup: () => import(/* webpackChunkName: "VButtonGroup" */ '@c/VButtonGroup'),
};
