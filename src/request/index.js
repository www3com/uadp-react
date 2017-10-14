/**
 * Created by wangjz on 2016/5/26.
 */
import reqwest from 'reqwest';
import message from 'antd/lib/message';
let ajax = function (param) {
    var p = param;
    if (!p.error) p.error = defaultError;
    if (!p.method) p.method = 'get';
    if (!p.success) throw new Error("缺失ajax成功回调函数");
    if (!p.url) throw  new Error("缺失ajax必要参数url");
    reqwest(p);
}

let post = function (url, data, success, error) {
    let callback = (typeof data == 'function') ? data : success;
    if(typeof data == 'function' && typeof success == 'function') error = success;

    ajax({
        url: url,
        data: data,
        method: 'post',
        type: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: callback,
        error: error
    });
}

let get = function (url, data, success, error) {
    let callback = (typeof data == 'function') ? data : success;
    if(typeof data == 'function' && typeof success == 'function') error = success;
    ajax({
        url: url,
        data: data,
        method: 'get',
        type: 'json',
        contentType: 'application/x-www-form-urlencoded',
        success: callback,
        error: error
    });
}

let getp = function (url, data, success, error) {
    let callback = (typeof data == 'function') ? data : success;
    if(typeof data == 'function' && typeof success == 'function') error = success;

    ajax({
        url: url,
        data: data,
        method: 'get',
        type: 'jsonp',
        contentType: 'application/x-www-form-urlencoded',
        success: callback,
        error: error
    });
}


function defaultError(err) {
    message.error('请求数据发生错误！', 2);
    console.log(err);
}

let request = {ajax: ajax,
    get: get,
    post: post,
    getp: getp};

export default request;
