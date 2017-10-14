/**
 * Created by wangjz on 2016/6/20.
 */

//全局变量
let _map = {};

const put = (key, value) => {
    _map[key] = value;
}

const get = (key) => {
    return _map[key];
}

const GlobalMap = {
    put: put,
    get: get
};

export default GlobalMap;