import React, {Component} from 'react';
import {Button, Modal, Form, Input, Card, Switch, Icon} from 'antd';
const FormItem = Form.Item;

function SysModal ({form, isNew, editData, visible, loading, onOk, onClose}) {
  function onConfirm() {
    form.validateFields((err, values) => {
      if (err) return;
      onOk(isNew, values);
    });
  }

  function afterClose() {
    form.resetFields();
  }

  let { getFieldDecorator} = form;
  let formItemLayout = {
    labelCol: { span: 8},
    wrapperCol: { span: 14},
    style: {marginBottom:5}
  };

  let title = (isNew ? '新增系统': '编辑系统');
  return (<Modal title={title} width={620} okText="保存" cancelText="返回" visible = {visible} confirmLoading={loading} onOk={e=>onConfirm()} onCancel={()=>onClose()} afterClose={afterClose}>
    <Form >
      <Card title="基本信息" bordered={false} style={{marginBottom:10}}>
        <FormItem {...formItemLayout} label="系统标识" >
          {getFieldDecorator('id', {
            initialValue: editData.id,
            rules: [{
              required: true, message: '请输入系统标识！',
            }]
          })(
            <Input autoComplete="off" disabled={isNew?false:true}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="系统名称" >
          {getFieldDecorator('name', {
            initialValue: editData.name,
            rules: [{
              required: true, message: '请输入系统名称！',
            }]})(<Input autoComplete="off"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="前缀路径" >
          {getFieldDecorator('prefixUrl',
            {initialValue: editData.prefixUrl})(<Input autoComplete="off"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="系统描述" >
          {getFieldDecorator('remark',
            {initialValue: editData.prefixUrl})(<Input type="textarea" autosize autoComplete="off"/>)}
        </FormItem>
      </Card>

      <Card title="模拟登陆" bordered={false} extra={
        getFieldDecorator('isCheckedLogin', {initialValue:false})(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} onChange={function(checked) {
          form.setFieldsValue({loginUrl:'', loginUsername:'', loginPassword:''});
        }.bind(this)}/>)}>
        <FormItem {...formItemLayout} label="登陆地址" >
          {getFieldDecorator('loginUrl',
            {initialValue: editData.loginUrl})(<Input autoComplete="off" disabled={!editData.isCheckedLogin}></Input>)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户名" >
          {getFieldDecorator('loginUsername',
            {initialValue: editData.loginUsername})(<Input autoComplete="off" disabled={!editData.isCheckedLogin}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码" >
          {getFieldDecorator('loginPassword',
            {initialValue: editData.loginUsername})(<Input type="password" autoComplete="off" disabled={!editData.isCheckedLogin}/>)}
        </FormItem>
      </Card>
    </Form>
  </Modal>);
}

export default Form.create()(SysModal);
