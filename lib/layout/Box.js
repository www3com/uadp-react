'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by wangjz on 2016/10/29.
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Box = (_temp = _class = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
  }

  _createClass(Box, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var regions = this.context.regions;
      return {
        width: regions[this.props.region].width,
        height: regions[this.props.region].height
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var regions = this.context.regions;
      var style = (0, _objectAssign2.default)({}, regions[this.props.region], this.props.style);

      var classes = [];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      return _react2.default.createElement(
        'div',
        { 'data-option': 'box', className: classes.join(' '), style: style },
        this.props.children
      );
    }
  }]);

  return Box;
}(_react.Component), _class.childContextTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number
}, _class.contextTypes = {
  regions: _react2.default.PropTypes.object
}, _temp);
exports.default = Box;


Box.propTypes = {
  region: _react.PropTypes.string.isRequired
};
module.exports = exports['default'];