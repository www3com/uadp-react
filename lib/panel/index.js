'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by wangjz on 2016/11/2.
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/index.less');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = (_temp = _class = function (_Component) {
  _inherits(Panel, _Component);

  function Panel() {
    _classCallCheck(this, Panel);

    return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
  }

  _createClass(Panel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        width: this.context.width,
        height: this.context.height
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var prefixCls = 'ant-panel';
      var _props = this.props,
          title = _props.title,
          headerHeight = _props.headerHeight,
          style = _props.style,
          extra = _props.extra,
          bodyStyle = _props.bodyStyle,
          extraStyle = _props.extraStyle,
          fit = _props.fit;

      var head = void 0;
      if (!title) {
        head = null;
      } else {
        var headStyle = void 0;
        var _headerHeight = headerHeight != null ? headerHeight : 40;
        headStyle = { height: _headerHeight + 'px', lineHeight: _headerHeight + 'px' };
        head = typeof title === 'string' ? _react2.default.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this2.header = _ref;
            }, style: headStyle, className: prefixCls + '-head' },
          _react2.default.createElement(
            'h4',
            { className: prefixCls + '-head-title' },
            title
          )
        ) : _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this2.panel = _ref2;
            }, style: headStyle, className: prefixCls + '-head' },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-head-title' },
            title
          )
        );
      }
      var assignBodyStyle = {};
      if (fit) {
        var panelHeight = this.context.height; //this.panel.clientHeight;
        var _headerHeight2 = this.header ? this.header.clientHeight : 0;
        (0, _objectAssign2.default)(assignBodyStyle, { height: panelHeight - _headerHeight2 });
      }
      (0, _objectAssign2.default)(assignBodyStyle, bodyStyle);
      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref3) {
            return _this2.panel = _ref3;
          }, style: (0, _objectAssign2.default)({ height: '100%' }, style), className: '' + prefixCls },
        head,
        extra ? _react2.default.createElement(
          'div',
          { className: prefixCls + '-extra', style: extraStyle },
          extra
        ) : null,
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-body', style: assignBodyStyle },
          this.props.children
        )
      );
    }
  }]);

  return Panel;
}(_react.Component), _class.contextTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number
}, _class.childContextTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number
}, _temp);
exports.default = Panel;
module.exports = exports['default'];