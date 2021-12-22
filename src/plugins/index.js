import { defineReadonly } from '@/utils';
import properties from './properties';
import components from './components';
import directives from './directives';

const addProperties = (value, Ctor) => {
  const vm = new Ctor();
  const proto = Ctor.prototype;

  const vmProperties = Object.keys(proto).concat(Object.keys(vm));
  Object.entries(value).forEach(([key, property]) => {
    if (vmProperties.includes(key)) {
      throw new Error(`property '${key}' had existed!`);
    }
    defineReadonly(proto, key, property);
  });
};

const addComponents = (value, Ctor) => {
  Object.entries(value).forEach(([key, component]) => {
    if (Ctor.component(key)) {
      throw new Error(`component '${key}' had existed!`);
    }
    Ctor.component(key, component);
  });
};

const addDirectives = (value, Ctor) => {
  Object.entries(value).forEach(([key, directive]) => Ctor.directive(key, directive));
};

export default {
  async install(Vue) {
    // 扩展组件
    addProperties(properties, Vue);
    addComponents(components, Vue);
    addDirectives(directives, Vue);
  },
};
