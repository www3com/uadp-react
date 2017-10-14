"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
'use strict';
*/
/**
 * Created by wangjz on 2016/6/20.
 */
// 全局事件集合
var events = {};

//触发事件
var dispatch = function dispatch(event) {
  for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }

  var fns = events[event];

  if (!fns || fns.length === 0) {
    return false;
  }
  // 如果存在对应方法，依次执行
  for (var i = 0; i <= fns.length - 1; i++) {
    fns[i].apply(fns, data);
  }
};

//需要返回函数的触发事件
var dispatch_sync = function dispatch_sync(event, data, callback) {
  var fns = events[event];

  if (!fns || fns.length === 0) {
    callback(false);
  }
  // 如果存在对应方法，依次执行
  for (var i = 0; i <= fns.length - 1; i++) {
    fns[i].apply(fns, _toConsumableArray(data));
  }
  callback(true);
};

//注册事件
var on = function on(event, fn) {
  // 如果尚没有该事件，创建一个数组来存储对应的方法
  if (!events[event]) {
    events[event] = [];
  }
  events[event].push(fn);
};

// 取消注册事件
var off = function off(event, fn) {
  var fns = events[event];

  if (!fns) {
    return false;
  }

  if (!fn && fns) {
    delete events[event];
    return false;
  }

  if (!fn && fns) {
    fns.length = 0;
  } else {
    // 取消指定事件
    for (var i = fns.length - 1; i >= 0; i--) {
      if (fn === fns[i]) {
        fns.splice(i, 1);
      }
    }
  }
};

exports.default = {
  addEventListener: on,
  removeEventListener: off,
  dispatchEvent: dispatch,
  syncDispatchEvent: dispatch_sync
};
module.exports = exports['default'];