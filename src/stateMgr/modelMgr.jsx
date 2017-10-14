/**
 * Created by wangjz on 2017/6/22.
 */
import map from '../map';
const put = map.put;
const get = map.get;

export function setModel(model) {
  if(model == null) {
    throw new Error("状态管理器缺少model");
  }

  let initSate = {};
  if(model.state != null) {
    initSate = model.state;
  }
  put('storageName', model.namespace);
  put(model.namespace, {state: initSate, reducers: model.reducers});
}

export function debug(flag) {
  put('_debug', true);
}

export function getReducer(type) {
  let reducers = get(get('storageName')).reducers;
  if(reducers == null) {
    throw new Error("状态管理器缺少model");
  }
  let reducer = reducers[type];
  if(reducer == null) {
    throw new Error("模型未配置reducer:" + type);
  }
  return reducer;
}

export function getState() {
  let state = get(get('storageName')).state;
  return state;
}

export function setState(state) {
  let model = get(get('storageName'));
  model.state = state;
  put(get('storageName'), model);
}

export function dispatch(that, action) {
  let state = getState();
  let reducer = getReducer(action.type);
  var put = function(res) {
    Object.assign(state, res);
    setState(state);
    if(get('_debug')) {
      console.log("状态发生变化，命名空间：" + get('storageName') + ",内容:", state);
    }
    that.setState({});
  };

  let result = reducer(state, action.params, put, function(action) {
    dispatch(that, action);
  });

  if(result != null) {
    put(result);
  }
}
