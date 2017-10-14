"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by wangjz on 2016/6/20.
 */

//全局变量
var _map = {};

var put = function put(key, value) {
    _map[key] = value;
};

var get = function get(key) {
    return _map[key];
};

var GlobalMap = {
    put: put,
    get: get
};

exports.default = GlobalMap;
module.exports = exports['default'];