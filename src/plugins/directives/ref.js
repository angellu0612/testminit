export default {
  inserted(el, binding) {
    const callback = binding.value;
    callback?.(el);
  },
};
