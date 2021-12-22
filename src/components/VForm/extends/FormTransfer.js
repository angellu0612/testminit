const transfer = v => ({ label: v.title, value: v.key, ...v });

export default {
  name: 'FormTransfer',
  functional: true,
  model: {
    prop: 'targetKeys',
    event: 'change',
  },
  props: {
    options: Array,
    dataSource: Array,
    render: {
      type: Function,
      default: transfer,
    },
  },
  render(h, ctx) {
    const options = ctx.props.options?.map(v => ({ title: v.label, key: v.value, ...v }));
    const dataSource = ctx.props.dataSource ?? options;
    const render = ctx.props.render;
    ctx.data.attrs = { render, dataSource, ...ctx.data.attrs };
    return h('ATransfer', ctx.data, ctx.children);
  },
};
