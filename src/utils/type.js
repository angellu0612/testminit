/*
 * @Author: your name
 * @Date: 2021-08-12 11:09:32
 * @LastEditTime: 2021-08-13 14:50:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/src/utils/type.js
 */
export const toRawType = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase();

/** 是否是引用类型 (Note: 包含数组) */
export const isObject = val => val !== null && typeof val === 'object';

export const isFunction = val => typeof val === 'function';
export const isPromise = val => isObject(val) && isFunction(val.then) && isFunction(val.catch);
export const isArray = Array.isArray;
export const isString = val => typeof val === 'string';
export const isNumber = val => typeof val === 'number';

export const isNaN = val => val !== val;

export const isEmpty = val => val === undefined || val === null;

export const isEmptyObject = val => isObject(val) && !Object.keys(val).length;

export const isNode = val => val instanceof Node;
