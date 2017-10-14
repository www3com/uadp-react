/**
 * Created by wangjz on 2016/11/2.
 */
import React, { Component } from 'react';
import './style/index.less';
import assign from 'object-assign';

export default class Panel extends Component {

  static contextTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  static childContextTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  getChildContext() {
    return {
      width: this.context.width,
      height: this.context.height
    };
  }

  render() {
    let prefixCls = 'ant-panel';
    const {title, headerHeight, style, extra, bodyStyle, extraStyle, fit} = this.props;
    let head;
    if (!title) {
      head = null;
    } else {
      let headStyle;
      let _headerHeight = headerHeight != null ? headerHeight : 40;
      headStyle = {height: `${_headerHeight}px`, lineHeight: `${_headerHeight}px`};
      head = typeof title === 'string' ? (
        <div ref={(ref)=>this.header=ref} style={headStyle} className={`${prefixCls}-head`}>
          <h4 className={`${prefixCls}-head-title`}>{title}</h4>
        </div>
      ) : (
        <div ref={(ref)=>this.panel=ref} style={headStyle} className={`${prefixCls}-head`}>
          <div className={`${prefixCls}-head-title`}>{title}</div>
        </div>
      );
    }
    let assignBodyStyle = {};
    if(fit) {
      let panelHeight = this.context.height;//this.panel.clientHeight;
      let headerHeight = this.header? this.header.clientHeight: 0;
      assign(assignBodyStyle, {height: panelHeight - headerHeight});
    }
    assign(assignBodyStyle, bodyStyle);
    return (
      <div ref={(ref)=>this.panel=ref} style={assign({height:'100%'}, style)}  className={`${prefixCls}`}>
        {head}
        {extra ? <div className={`${prefixCls}-extra`} style={extraStyle}>{extra}</div> : null}
        <div className={`${prefixCls}-body`} style={assignBodyStyle}>{this.props.children}</div>
      </div>
    );
  }
}
