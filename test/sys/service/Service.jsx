import {request} from '../../../src/request';
import {Modal,message} from 'antd';
import assign from 'object-assign';
const confirm = Modal.confirm;

/**
 * 查询系统列表
 */
export function querySys(params, putState) {
  /*request.post('querySys.do', params, function(res) {
    putState({sysList: res});
  });*/
}

/**
 * 保存系统信息
 */
export function addSys(state, params, putState, dispatch) {
  let sysModalProps = state.sysModalProps;
  assign(sysModalProps, {loading: true});
  putState(sysModalProps);
  request.post('addSys.do', params, function() {
    assign(sysModalProps, {loading: false, visible: false});
    putState(sysModalProps);
    dispatch('querySys', {name:''});
  });
}

/**
 * 编辑系统信息
 */
export function editSys(state, params, putState, dispatch) {
  let sysModalProps = state.sysModalProps;
  assign(sysModalProps, {loading: true});
  putState(sysModalProps);
  request.post('updateSys.do', values, function() {
    assign(sysModalProps, {loading: false, visible: false});
    putState(sysModalProps);
    dispatch('querySys', {name:''});
  },function (err) {
    assign(sysModalProps, {loading: false});
    putState(sysModalProps);
  });
}

export function deleteSys(state, params, putState, dispatch) {
  confirm({
    title: '确认删除这条记录吗？',
    onOk() {
      request.get('deleteSys.do', {id:params.id}, function(res) {
        message.success('删除功能模块成功！');
        dispatch('querySys', {name:''});
      });
    }
  });
}
