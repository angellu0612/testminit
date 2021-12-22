/*
 * @Author: your name
 * @Date: 2021-08-12 11:02:15
 * @LastEditTime: 2021-08-12 16:43:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/plugins/wrapped.js
 */
// 请求参数改名 current -> page,
const renamed = ({ current, ...rest }) => ({ page: current, ...rest });
// 修改请求响应体
const transfer = ({ data = [], meta = {} } = {}) => ({ data, total: meta.total ?? data.length });
// 适配列表数据接口
export const adapterOfList = function (service) {
  if (typeof service !== 'function') return service;
  return (params = {}) => service(renamed(params)).then(transfer);
};

export const wrappedTable = function (component) {
  return {
    functional: true,
    props: {
      http: Function,
      rowKey: {
        type: [String, Function],
        default: 'id',
      },
    },
    render(h, context) {
      const [attrs, props, $store] = [context.data.attrs, context.props, context.parent.$store];
      const isNarrow = $store.state.app.screenType.level < 6;
      const isMobile = $store.getters['app/isMobileDevice'];
      attrs.size = 'middle';
      if (isNarrow) {
        attrs.size = 'middle';
      }
      if (isMobile) {
        attrs.size = 'small';
      }
      const options = {
        ...context.data,
        props: { http: adapterOfList(props.http), rowKey: props.rowKey },
      };
      return h(component, options, context.children);
    },
  };
};
