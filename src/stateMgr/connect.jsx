import React, {Component, PropTypes} from 'react';
import map from '../map';
import eventBus from '../eventBus';
import * as modelMgr from './modelMgr';
import assign from 'object-assign';
const get = map.get;

function connect(mapStateToProps) {
  return function (WrappedComponent) {
    return class wrapper extends Component {
      dispatch(action) {
        if(action && action.scope && action.scope == 'self') {
          modelMgr.dispatch(this, action);
        }else {
          eventBus.dispatchEvent('event', action);
        }
      }

      componentDidMount(){
        super.componentDidMount && super.componentDidMount();
      }

      render() {
        let s = modelMgr.getState();

        let map = mapStateToProps(s);
        assign(map, {dispatch:this.dispatch.bind(this)}, this.props);
        return <WrappedComponent {...map}/>
      }
    }
  }
}
export default connect;


