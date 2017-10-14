/*
'use strict';
*/
/**
 * Created by wangjz on 2016/6/20.
 */
// 全局事件集合
let events = {};

//触发事件
const dispatch = (event, ...data) => {
  const fns = events[event];

  if (!fns || fns.length === 0) {
    return false;
  }
  // 如果存在对应方法，依次执行
  for (let i = 0; i <= fns.length - 1; i++) {
    fns[i](...data);
  }
};

//需要返回函数的触发事件
const dispatch_sync = (event, data, callback) => {
  const fns = events[event];

  if (!fns || fns.length === 0) {
    callback(false);
  }
  // 如果存在对应方法，依次执行
  for (let i = 0; i <= fns.length - 1; i++) {
    fns[i](...data);
  }
  callback(true)
};

//注册事件
const on = (event, fn) => {
  // 如果尚没有该事件，创建一个数组来存储对应的方法
  if (!events[event]) {
    events[event] = [];
  }
  events[event].push(fn);
};

// 取消注册事件
const off = (event, fn) => {
  const fns = events[event];

  if (!fns) {
    return false;
  }

  if(!fn && fns) {
    delete events[event];
    return false;
  }

  if (!fn && fns) {
    fns.length = 0;
  } else {  // 取消指定事件
    for (let i = fns.length - 1; i >= 0; i--) {
      if (fn === fns[i]) {
        fns.splice(i, 1);
      }
    }
  }
};

export default  {
  addEventListener: on,
  removeEventListener: off,
  dispatchEvent: dispatch,
  syncDispatchEvent: dispatch_sync
};
