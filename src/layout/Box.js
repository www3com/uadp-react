/**
 * Created by wangjz on 2016/10/29.
 */
import React, { Component, PropTypes} from 'react';
import assign from 'object-assign';
export default class Box extends Component {
  static childContextTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  static contextTypes = {
    regions: React.PropTypes.object
  }

  getChildContext() {
    let regions = this.context.regions;
    return {
      width: regions[this.props.region].width,
      height: regions[this.props.region].height
    };
  }

  render() {
    let regions = this.context.regions;
    let style = assign({}, regions[this.props.region], this.props.style);

    let classes = [];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div data-option="box" className={classes.join(' ')} style={style}>
        {this.props.children}
      </div>
    );
  }
}

Box.propTypes = {
  region: PropTypes.string.isRequired
}
