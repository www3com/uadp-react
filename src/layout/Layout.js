/**
 * Created by wangjz on 2016/10/16.
 */
import React, { Component } from 'react';
import assign from 'object-assign';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.borderWidth = 1;
    this.borderStyle = this.borderWidth + 'px solid #e9e9e9';
    this.state ={
      north:{position:'absolute', top:0, left:0, width:0, height:0, padding:1, zIndex:99, borderBottom: this.borderStyle},
      south:{position:'absolute', bottom:0, left:0, width:0, height:0, padding:1, zIndex:100, borderTop: this.borderStyle},
      west:{position:'absolute', top:0, left:0, width:0, height:0, padding:1, zIndex:99, borderRight: this.borderStyle},
      east:{position:'absolute', top:0, right:0, width:0, height:0, padding:1, zIndex:99, borderLeft: this.borderStyle},
      center:{position:'absolute', top:0, left:0, width:0, height:0, padding:1, zIndex:0, overflow:'auto'},
      layout:{position:'relative', width: '0', height: '0'}
    };
  }
  static Box;

  static contextTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  static childContextTypes = {
    regions: React.PropTypes.object
  }


  getChildContext() {
    return {regions: this.state};
  }

  componentWillMount() {
    if(!Object.prototype.toString.call(this.props.children) == "[object Array]") {
      throw new Error("组件Layout的子元素至少有2个.");
    }
    this.props.children.map(function(child) {
      if(child.props["region"] == null) {
        throw new Error("组件Layout的子元素缺少属性：region。");
      }
    }.bind(this));
    //读取组件的高度和宽度
    let w=0,h=0;
    this.props.children.map(function(child) {
      if(child.props.style && child.props.style.width) {
        w = child.props.style.width;
      } else {
        w = child.props.width?child.props.width:0;
      }
      this.state[child.props["region"]].width = w;
      if(child.props.style && child.props.style.height) {
        h = child.props.style.height;
      } else {
        h = child.props.height?child.props.height:0;
      }
      this.state[child.props["region"]].height = h;
    }.bind(this));
  }

  componentDidMount() {
    if(this.layout.parentNode.id=='root') {
      window.addEventListener('resize', this.handleResize.bind(this));
      window.addEventListener('load', this.handleResize.bind(this));
      this.renderRegions.bind(this)();
    }
  }

  componentWillUnmount() {
    if(this.layout.parentNode.id=='root') {
      window.removeEventListener('resize', this.handleResize);
      window.addEventListener('load', this.handleResize.bind(this));
    }
  }

  handleResize(e) {
    this.renderRegions.bind(this)();
  }

  renderRegions() {
    let layoutHeight = document.body.clientHeight;
    let layoutWidth = document.body.clientWidth;
    this.setState({width: layoutWidth, height: layoutHeight});
  }

  render() {
    let layoutHeight = this.state.height ? this.state.height:this.context.height;
    let layoutWidth = this.state.width ? this.state.width:this.context.width;

      if(layoutHeight == null) {
        layoutHeight = 0;
      }

      if(layoutWidth == null) {
        layoutWidth = 0;
      }

    let bordered = null;
    if(this.props.bordered != null && !this.props.bordered) {
      bordered = {border:0};
      this.borderWidth = 0;
    }

    //重新计算组件的高度和宽度
    assign(this.state.north, {width: layoutWidth - 2*this.borderWidth}, bordered);
    assign(this.state.south, {width:  layoutWidth - 2*this.borderWidth}, bordered);
    assign(this.state.west, {top:this.state.north.height, height: layoutHeight - this.state.north.height - this.state.south.height}, bordered);
    assign(this.state.east, {top:this.state.north.height, height: layoutHeight - this.state.north.height - this.state.south.height}, bordered);
    assign(this.state.center, {left: this.state.west.width, top: this.state.north.height,
      height: layoutHeight - this.state.north.height - this.state.south.height,
      width: layoutWidth - this.state.west.width - this.state.east.width}, bordered);
    assign(this.state.layout, {width: layoutWidth, height:layoutHeight});

    let classes = [];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div ref={(ref) => this.layout = ref} className={classes.join(' ')} style={assign({},this.state.layout, this.props.style)}>{this.props.children}</div>
    );
  }
}
