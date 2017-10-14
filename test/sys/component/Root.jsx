/**
 * Created by wangjz on 2016/5/24.
 */
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import Layout from '../../../src/layout/Layout';
import connect from '../../../src/stateMgr/connect';
import {Button, Table, Input} from 'antd';
import SysModal from './SysModal';
const Box = Layout.Box;
const Search = Input.Search;

function Root({dispatch, sysList, sysModalProps}) {

    function onOK(isAdd, values) {
      if(isAdd) {
        dispatch('addSys', values);
      }else {
        dispatch('editSys', values);
      }
    }

    let columns = [
      {title: '系统标识', dataIndex: 'id', key: 'id', width: 250},
      {title: '系统名称', dataIndex: 'name', key: 'name', width: 350},
      {title: '前缀路径', dataIndex: 'prefixUrl', key: 'prefixUrl', width: 200},
      {title: '系统描述', dataIndex: 'remark', key: 'remark', width: 350},
      {title: '是否模拟登陆', dataIndex: 'isCheckedLogin', key: 'isCheckedLogin', width: 350, render: function(text, record, index){
        return record.isCheckedLogin ? "是" : "否";
      }},{
        title: '操作', width: 100, render: function (text, record, index) {
          let disabled = record.isFixed ? 'disabled' : null;
          return (<span>
              <Button title='修改' onClick={e=>dispatch('openSysModal',{isNew: false, visible:true, editData: record})} size={'small'} type="ghost" shape="circle"
                      icon="edit" disabled={disabled} style={{marginRight:2}}/>
            <Button title='删除' onClick={e=>dispatch('deleteSys',record)} size={'small'} type="ghost" shape="circle"
                    icon="close" disabled={disabled}/>
            </span>);
        }.bind(this)
      }];

    return (
      <Layout>
        <Box region="north" style={{height: 40, paddingTop: 5}}>
          <Button type='primary' icon="plus" onClick={()=>dispatch('openSysModal',{editData:{}, visible:true})}>新增</Button>
          <div style={{float: 'right', paddingBottom: 3, paddingRight:10}}>
            <Search placeholder="系统名称" style={{width: 200}} onSearch={(name)=>dispatch('querySys', {name:name})}/>
          </div>
        </Box>
        <Box region="center">
          <Table rowKey="id" size={'middle'} bordered={true} dataSource={sysList} columns={columns} pagination={false}></Table>
          <SysModal {...sysModalProps} onOk={onOK} onClose={()=>dispatch('closeSysModal')}/>
        </Box>
      </Layout>
    );
}

function mapStateToProps(state) {
  return {
    sysModalProps: state.sysModalProps,
    sysList: state.sysList,
  };
}
export default connect(mapStateToProps)(Root);
