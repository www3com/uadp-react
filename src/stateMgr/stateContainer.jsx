/**
 * Created by wangjz on 2017/6/17.
 */
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import eventBus from '../eventBus';
import * as modelMgr from './modelMgr';

export default class stateContainer {

  model(model) {
    modelMgr.setModel(model);
  }

  debug(p) {
    modelMgr.debug(p);
  }

  ready(callback) {
    this._ready = callback;
  }

  start(WrappedComponent, wrapper) {
    let that = this;
    let proxyElement = function (WrappedComponent) {
        return class wrapper extends Component {
          componentWillMount(){
            eventBus.addEventListener('event', function(res) {
              modelMgr.dispatch(this, res);
            }.bind(this));
          }

          componentDidMount() {
            if(that._ready) {
              that._ready(function (action) {
                modelMgr.dispatch(this, action);
              }.bind(this));
            }
          }

          componentWillUnmount() {
            eventBus.removeEventListener('event');
          }

          render() {
            return <WrappedComponent/>
          }
        }
    }

    var d = React.createElement(proxyElement(WrappedComponent), null);
    render(d, document.getElementById(wrapper));
  }
}
