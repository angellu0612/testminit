/*
 * @Author: your name
 * @Date: 2021-07-06 15:24:03
 * @LastEditTime: 2021-09-10 09:26:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/router/BasicLayout/book.js
 */

import { PAGE_NAMES } from '@/constants/page';
import { createBlankPage } from '@/utils/container';
export default {
  path: 'programme',
  name: PAGE_NAMES.PROGRAMME_CONFIGURATION,
  meta: { title: '规划配置', icon: 'setting' },
  component: createBlankPage(PAGE_NAMES.PROGRAMME_CONFIGURATION),
  redirect: { name: PAGE_NAMES.MEASURE_CONTROL_EVENT_MANAGEMENT },
  sort: 100,
  children: [
    {
      path: 'measure-control-event-management',
      name: PAGE_NAMES.MEASURE_CONTROL_EVENT_MANAGEMENT,
      meta: { title: '测控事件管理' },
      component: () => import('@/views/measureControlEventManagement'),
    },
    {
      path: '/subjectManager/subject',
      name: 'subject',
      meta: { title: '监控对象管理' },
      component: () => import('@/views/managerOther'),
    },
    {
      path: 'tabletest',
      name: 'tabletest',
      meta: { title: '表格' },
      component: () => import('@/views/tableTest'),
    },
  ],
};
