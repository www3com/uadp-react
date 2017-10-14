"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitObject;
/**
 * Created by wangjz on 2016/11/4.
 */
function splitObject(obj, parts) {
  var left = {};
  var right = {};
  Object.keys(obj).forEach(function (k) {
    if (parts.indexOf(k) !== -1) {
      right[k] = obj[k];
    } else {
      left[k] = obj[k];
    }
  });
  return [left, right];
}
module.exports = exports['default'];