'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by wangjz on 2016/5/26.
 */
var ajax = function ajax(param) {
    var p = param;
    if (!p.error) p.error = defaultError;
    if (!p.method) p.method = 'get';
    if (!p.success) throw new Error("缺失ajax成功回调函数");
    if (!p.url) throw new Error("缺失ajax必要参数url");
    var sourceCallback = p.success;
    var callback = function callback(result) {
        if (!result.success && result.code == 'sessionExpire') {
            _message2.default.info('session过期，请重新登录！', 3);
        } else {
            sourceCallback(result);
        }
    };
    p.success = callback;

    (0, _reqwest2.default)(p);
};

var post = function post(url, data, success, error) {
    var callback = typeof data == 'function' ? data : success;
    if (typeof data == 'function' && typeof success == 'function') error = success;

    ajax({
        url: url,
        data: data,
        method: 'post',
        type: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: callback,
        error: error
    });
};

var get = function get(url, data, success, error) {
    var callback = typeof data == 'function' ? data : success;
    if (typeof data == 'function' && typeof success == 'function') error = success;
    ajax({
        url: url,
        data: data,
        method: 'get',
        type: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: callback,
        error: error
    });
};

var getp = function getp(url, data, success, error) {
    var callback = typeof data == 'function' ? data : success;
    if (typeof data == 'function' && typeof success == 'function') error = success;

    ajax({
        url: url,
        data: data,
        method: 'get',
        type: 'jsonp',
        contentType: 'application/x-www-form-urlencoded',
        success: callback,
        error: error
    });
};

function defaultError(err) {
    _message2.default.error('请求数据发生错误！', 2);
    console.log(err);
}

var request = { ajax: ajax,
    get: get,
    post: post,
    getp: getp };

exports.default = request;
module.exports = exports['default'];