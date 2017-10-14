'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by wangjz on 2017/6/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _eventBus = require('../eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

var _modelMgr = require('./modelMgr');

var modelMgr = _interopRequireWildcard(_modelMgr);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stateContainer = function () {
  function stateContainer() {
    _classCallCheck(this, stateContainer);
  }

  _createClass(stateContainer, [{
    key: 'model',
    value: function model(_model) {
      modelMgr.setModel(_model);
    }
  }, {
    key: 'debug',
    value: function debug(p) {
      modelMgr.debug(p);
    }
  }, {
    key: 'ready',
    value: function ready(callback) {
      this._ready = callback;
    }
  }, {
    key: 'start',
    value: function start(WrappedComponent, wrapper) {
      var that = this;
      var proxyElement = function proxyElement(WrappedComponent) {
        return function (_Component) {
          _inherits(wrapper, _Component);

          function wrapper() {
            _classCallCheck(this, wrapper);

            return _possibleConstructorReturn(this, (wrapper.__proto__ || Object.getPrototypeOf(wrapper)).apply(this, arguments));
          }

          _createClass(wrapper, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
              _eventBus2.default.addEventListener('event', function (res) {
                modelMgr.dispatch(this, res);
              }.bind(this));
            }
          }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
              if (that._ready) {
                that._ready(function (action) {
                  modelMgr.dispatch(this, action);
                }.bind(this));
              }
            }
          }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
              _eventBus2.default.removeEventListener('event');
            }
          }, {
            key: 'render',
            value: function render() {
              return _react2.default.createElement(WrappedComponent, null);
            }
          }]);

          return wrapper;
        }(_react.Component);
      };

      var d = _react2.default.createElement(proxyElement(WrappedComponent), null);
      (0, _reactDom.render)(d, document.getElementById(wrapper));
    }
  }]);

  return stateContainer;
}();

exports.default = stateContainer;
module.exports = exports['default'];