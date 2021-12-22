import { isString, hasOwn, isFunction, isEmptyObject, cache, deepEqual } from '@/utils';

export { isEmptyObject, hasOwn };

export const equal = deepEqual;

// match range e.g. [10] | ['key-x'] | .key | ^key
// not support: ['key.x'] | ['key[x]'] | .key-x
const REGEX_PROPERTY = /\[(?:(\d+)|['"]([^.[]+)['"])]|\.(\w+)|^(\w+)/g;

/**
 * Convert to a property path array.
 * @param {string} str
 * @return {string[]}
 */
const toPath = cache(str => {
  const result = [];
  str.replace(REGEX_PROPERTY, (...rest) => {
    // get token form capture groups
    const token = rest.slice(1, -2).find(Boolean);
    result.push(token);
  });
  return result;
});

export function getPropWith(handler, data) {
  if (isString(handler)) {
    const pathList = toPath(handler);
    return pathList.reduce((total, key) => total[key], data);
  }

  if (isFunction(handler)) return handler(data);
  return data;
}

export function slice(data, { current = 1, pageSize }) {
  const start = (current - 1) * pageSize;
  return data.slice(start, start + pageSize);
}

export function composeFunc(...funcList) {
  return function (...rest) {
    funcList.forEach(func => isFunction(func) && func(...rest));
  };
}

/**
 * 按数组对象中某个属性去重
 * @param {*} arr
 * @param {*} key
 */
export function unique(arr, key) {
  const map = new Map();
  return arr.filter(item => {
    const _item = item;
    return !map.has(_item[key]) && map.set(_item[key], 1);
  });
}
