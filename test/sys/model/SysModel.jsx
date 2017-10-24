import * as service from '../service/Service';
import assign from 'object-assign';
export default {
  namespace:'user',
  state: {
    sysModalProps: {
      loading: false,
      visible: false,
      isNew: true,
      editData: {},
    }
  },
  reducers: {
    /*打开系统弹出窗口*/
    openSysModal: function (state, params, putState) {
      let sysModalProps = state.sysModalProps;
      assign(sysModalProps, params);
      return {sysModalProps};
    },
    /*关闭系统弹出窗口*/
    closeSysModal: function (state, params, putState) {
      let sysModalProps = state.sysModalProps;
      assign(sysModalProps, {visible: false});
      return {sysModalProps};
    },
    /*查询系统列表*/
    querySys: function (state, params, putState) {
      service.querySys(params, putState);
    },
    /*新增系统*/
    addSys: function (state, params, putState, dispatch) {
      service.addSys(state, params, putState, dispatch);
    },
    /*编辑系统*/
    editSys: function (state, params, putState, dispatch) {
      service.editSys(state, params, putState, dispatch);
    },
    /*删除系统*/
    deleteSys: function (state, params, putState, dispatch) {
      service.deleteSys(state, params, putState, dispatch);
    },
  }
}
