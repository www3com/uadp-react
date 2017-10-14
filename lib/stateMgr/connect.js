'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _map = require('../map');

var _map2 = _interopRequireDefault(_map);

var _eventBus = require('../eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

var _modelMgr = require('./modelMgr');

var modelMgr = _interopRequireWildcard(_modelMgr);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var get = _map2.default.get;

function connect(mapStateToProps) {
  return function (WrappedComponent) {
    return function (_Component) {
      _inherits(wrapper, _Component);

      function wrapper() {
        _classCallCheck(this, wrapper);

        return _possibleConstructorReturn(this, (wrapper.__proto__ || Object.getPrototypeOf(wrapper)).apply(this, arguments));
      }

      _createClass(wrapper, [{
        key: 'dispatch',
        value: function dispatch(action) {
          if (action && action.scope && action.scope == 'self') {
            modelMgr.dispatch(this, action);
          } else {
            _eventBus2.default.dispatchEvent('event', action);
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          _get(wrapper.prototype.__proto__ || Object.getPrototypeOf(wrapper.prototype), 'componentDidMount', this) && _get(wrapper.prototype.__proto__ || Object.getPrototypeOf(wrapper.prototype), 'componentDidMount', this).call(this);
        }
      }, {
        key: 'render',
        value: function render() {
          var s = modelMgr.getState();

          var map = mapStateToProps(s);
          (0, _objectAssign2.default)(map, { dispatch: this.dispatch.bind(this) }, this.props);
          return _react2.default.createElement(WrappedComponent, map);
        }
      }]);

      return wrapper;
    }(_react.Component);
  };
}
exports.default = connect;
module.exports = exports['default'];