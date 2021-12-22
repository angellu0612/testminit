import { isObject } from './type';

export function defineGet(target, property, fn) {
  Object.defineProperty(target, property, {
    configurable: false,
    enumerable: false,
    get: fn,
  });
}

export function defineReadonly(target, property, value) {
  Object.defineProperty(target, property, {
    configurable: false,
    enumerable: true,
    writable: false,
    value,
  });
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (obj, key) => hasOwnProperty.call(obj, key);

/**
 * 对象深度冻结，会修改原数据，注: 不支持 Map | Set 等类似数据类型
 * @param {Object} obj 需要冻结的数据
 * @returns {Object} 冻结后的数据
 */
export function deepFreeze(obj) {
  if (isObject(obj) && !Object.isFrozen(obj)) {
    Object.freeze(obj);
    Object.keys(obj).forEach(property => deepFreeze(obj[property]));
  }
  return obj;
}
