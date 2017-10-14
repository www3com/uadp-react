'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created by wangjz on 2016/10/16.
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = (_temp = _class = function (_Component) {
  _inherits(Layout, _Component);

  function Layout(props) {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

    _this.borderWidth = 1;
    _this.borderStyle = _this.borderWidth + 'px solid #e9e9e9';
    _this.state = {
      north: { position: 'absolute', top: 0, left: 0, width: 0, height: 0, padding: 1, zIndex: 99, borderBottom: _this.borderStyle },
      south: { position: 'absolute', bottom: 0, left: 0, width: 0, height: 0, padding: 1, zIndex: 100, borderTop: _this.borderStyle },
      west: { position: 'absolute', top: 0, left: 0, width: 0, height: 0, padding: 1, zIndex: 99, borderRight: _this.borderStyle },
      east: { position: 'absolute', top: 0, right: 0, width: 0, height: 0, padding: 1, zIndex: 99, borderLeft: _this.borderStyle },
      center: { position: 'absolute', top: 0, left: 0, width: 0, height: 0, padding: 1, zIndex: 0, overflow: 'auto' },
      layout: { position: 'relative', width: '0', height: '0' }
    };
    return _this;
  }

  _createClass(Layout, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { regions: this.state };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!Object.prototype.toString.call(this.props.children) == "[object Array]") {
        throw new Error("组件Layout的子元素至少有2个.");
      }
      this.props.children.map(function (child) {
        if (child.props["region"] == null) {
          throw new Error("组件Layout的子元素缺少属性：region。");
        }
      }.bind(this));
      //读取组件的高度和宽度
      var w = 0,
          h = 0;
      this.props.children.map(function (child) {
        if (child.props.style && child.props.style.width) {
          w = child.props.style.width;
        } else {
          w = child.props.width ? child.props.width : 0;
        }
        this.state[child.props["region"]].width = w;
        if (child.props.style && child.props.style.height) {
          h = child.props.style.height;
        } else {
          h = child.props.height ? child.props.height : 0;
        }
        this.state[child.props["region"]].height = h;
      }.bind(this));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.layout.parentNode.id == 'root') {
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleResize.bind(this));
        this.renderRegions.bind(this)();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.layout.parentNode.id == 'root') {
        window.removeEventListener('resize', this.handleResize);
        window.addEventListener('load', this.handleResize.bind(this));
      }
    }
  }, {
    key: 'handleResize',
    value: function handleResize(e) {
      this.renderRegions.bind(this)();
    }
  }, {
    key: 'renderRegions',
    value: function renderRegions() {
      var layoutHeight = document.body.clientHeight;
      var layoutWidth = document.body.clientWidth;
      this.setState({ width: layoutWidth, height: layoutHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var layoutHeight = this.state.height ? this.state.height : this.context.height;
      var layoutWidth = this.state.width ? this.state.width : this.context.width;

      if (layoutHeight == null) {
        layoutHeight = 0;
      }

      if (layoutWidth == null) {
        layoutWidth = 0;
      }

      var bordered = null;
      if (this.props.bordered != null && !this.props.bordered) {
        bordered = { border: 0 };
        this.borderWidth = 0;
      }

      //重新计算组件的高度和宽度
      (0, _objectAssign2.default)(this.state.north, { width: layoutWidth - 2 * this.borderWidth }, bordered);
      (0, _objectAssign2.default)(this.state.south, { width: layoutWidth - 2 * this.borderWidth }, bordered);
      (0, _objectAssign2.default)(this.state.west, { top: this.state.north.height, height: layoutHeight - this.state.north.height - this.state.south.height }, bordered);
      (0, _objectAssign2.default)(this.state.east, { top: this.state.north.height, height: layoutHeight - this.state.north.height - this.state.south.height }, bordered);
      (0, _objectAssign2.default)(this.state.center, { left: this.state.west.width, top: this.state.north.height,
        height: layoutHeight - this.state.north.height - this.state.south.height,
        width: layoutWidth - this.state.west.width - this.state.east.width }, bordered);
      (0, _objectAssign2.default)(this.state.layout, { width: layoutWidth, height: layoutHeight });

      var classes = [];
      if (this.props.className) {
        classes.push(this.props.className);
      }
      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this2.layout = _ref;
          }, className: classes.join(' '), style: (0, _objectAssign2.default)({}, this.state.layout, this.props.style) },
        this.props.children
      );
    }
  }]);

  return Layout;
}(_react.Component), _class.contextTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number
}, _class.childContextTypes = {
  regions: _react2.default.PropTypes.object
}, _temp);
exports.default = Layout;
module.exports = exports['default'];