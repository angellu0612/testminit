import { defineGet } from './object';

/**
 * 防抖
 * @param {Function} func the function to debounce
 * @param {number} [wait] milliseconds to delay
 * @return {Function} the new debounced function
 */
export function debounce(func, wait) {
  // `callTime`: save external call time
  let args, context, result, timerId, callTime;

  const abort = () => {
    if (timerId) clearTimeout(timerId);
    args = context = callTime = timerId = undefined;
  };

  const canInvoke = () => {
    const timeDiff = Date.now() - callTime;
    return callTime === undefined || timeDiff >= (wait ?? 0) || timeDiff < 0;
  };

  // recalculate the waiting time by `callTime`
  const remainingWait = () => {
    if (wait == null) return;
    const interval = Date.now() - callTime;
    return wait - interval;
  };

  const invokeFunc = () => {
    const isInvoking = canInvoke();
    if (isInvoking) {
      timerId = undefined;
      if (args) result = func.apply(context, args);
      args = context = undefined;
      return;
    }

    // restart the time when triggered within the waiting time
    timerId = setTimeout(invokeFunc, remainingWait());
  };

  function debounced(...rest) {
    args = rest;
    context = this;
    callTime = Date.now();

    if (timerId === undefined) {
      timerId = setTimeout(invokeFunc, wait);
    }
    return result;
  }

  debounced.abort = abort;
  defineGet(debounced, 'pending', () => timerId != null);

  return debounced;
}

/**
 * 节流
 * @param {Function} func the function to throttle
 * @param {number} [wait] milliseconds to delay
 * @return {Function} the new throttled function
 */
export function throttle(func, wait) {
  // `invokeTime`: save internal execution time
  let invokeTime, args, context, result, timerId;

  const invokeFunc = () => {
    timerId = undefined;
    if (args) {
      invokeTime = Date.now();
      result = func.apply(context, args);
    }
    args = context = undefined;
  };

  // recalculate the waiting time by `invokeTime`
  const remainingWait = () => {
    if (wait == null) return;
    // run immediately when `invokeTime` is undefined
    if (invokeTime === undefined) return 0;
    const interval = Date.now() - invokeTime;
    return wait - interval;
  };

  const abort = () => {
    if (timerId) clearTimeout(timerId);
    args = context = timerId = invokeTime = undefined;
  };

  function throttled(...rest) {
    args = rest;
    context = this;

    if (timerId === undefined) {
      timerId = setTimeout(invokeFunc, remainingWait());
    }

    return result;
  }

  throttled.abort = abort;
  defineGet(throttled, 'pending', () => timerId != null);

  return throttled;
}

/**
 * 缓存(记忆)函数
 * @param {Function} func 需要缓存的函数
 * @param {Function} [transfer] 参数转换
 * @return {Function} 新函数
 */
export function cache(func, transfer) {
  let cacheMap = Object.create(null);

  const cached = function (...params) {
    const key = transfer ? transfer.apply(this, params) : String(params);
    const hit = cacheMap[key];
    return hit ?? (cacheMap[key] = func.apply(this, params));
  };

  cached.clear = () => (cacheMap = Object.create(null));
  defineGet(cached, 'size', () => Object.keys(cacheMap).length);

  return cached;
}

// 柯里化
export function curry(func) {
  const funcLength = func.length;

  return function curried(...args) {
    if (args.length < funcLength) {
      return function (...rest) {
        return curried.apply(null, args.concat(rest));
      };
    }
    return func.apply(null, args);
  };
}

export function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
