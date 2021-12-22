import { isFunction } from '@/utils';
import DragObserver from './DragObserver';

const getDragTarget = (el, node) => {
  if (node == null) return el;
  if (isFunction(node)) return node(el);
  return node;
};

class DragMap extends WeakMap {
  create(el, options) {
    this.destroy(el);
    const observer = new DragObserver(null, options);
    observer.observe(getDragTarget(el, options.node));
    this.set(el, observer);
  }

  destroy(el) {
    const observer = this.get(el);
    if (observer) {
      observer.unobserve();
      this.delete(el);
    }
  }
}

const dragMap = new DragMap();

const initOptions = (value = {}) => ({ enable: true, ...value });

const draggable = {
  inserted(el, binding) {
    const options = initOptions(binding.value);
    if (options.enable) dragMap.create(el, options);
  },

  update(el, binding) {
    const value = initOptions(binding.value);
    const oldValue = initOptions(binding.oldValue);
    if (value.enable === oldValue.enable) return;

    if (value.enable) dragMap.create(el, value);
    else dragMap.destroy(el);
  },

  unbind(el) {
    dragMap.destroy(el);
  },
};

export default draggable;
