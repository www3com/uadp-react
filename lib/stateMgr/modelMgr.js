"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dispatch = undefined;
exports.setModel = setModel;
exports.debug = debug;
exports.getReducer = getReducer;
exports.getState = getState;
exports.setState = setState;

var _map = require("../map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var put = _map2.default.put; /**
                              * Created by wangjz on 2017/6/22.
                              */

var get = _map2.default.get;

function setModel(model) {
	if (model == null) {
		throw new Error("状态管理器缺少model");
	}

	var initSate = {};
	if (model.state != null) {
		initSate = model.state;
	}
	if (model.namespace == null) {
		model.namespace = "defaultNamespace";
	}
	put('storageName', model.namespace);
	put(model.namespace, { state: initSate, reducers: model.reducers });
}

function debug(flag) {
	put('_debug', true);
}

function getReducer(type) {
	var reducers = get(get('storageName')).reducers;
	if (reducers == null) {
		throw new Error("状态管理器缺少model");
	}
	var reducer = reducers[type];
	if (reducer == null) {
		throw new Error("模型未配置reducer:" + type);
	}
	return reducer;
}

function getState() {
	var state = get(get('storageName')).state;
	return state;
}

function setState(state) {
	var model = get(get('storageName'));
	model.state = state;
	put(get('storageName'), model);
}

function _dispatch(that, action) {
	var state = getState();
	var reducer = getReducer(action.type);
	var put = function put(res) {
		Object.assign(state, res);
		setState(state);
		if (get('_debug')) {
			console.log("状态发生变化，命名空间：" + get('storageName') + ",内容:", state);
		}
		that.setState({});
	};

	// let result = reducer(state, action.params, put, function(action) {
	//   dispatch(that, action);
	// });

	var result = reducer({ state: state, params: action.params, put: put, dispatch: function dispatch(action) {
			_dispatch(that, action);
		} });

	if (result != null) {
		put(result);
	}
}
exports.dispatch = _dispatch;