'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scrollBehavior = require('scroll-behavior');

var _scrollBehavior2 = _interopRequireDefault(_scrollBehavior);

var _StateStorage = require('./StateStorage');

var _StateStorage2 = _interopRequireDefault(_StateStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  shouldUpdateScroll: _propTypes2.default.func,
  routerProps: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.element.isRequired
};

var childContextTypes = {
  scrollBehavior: _propTypes2.default.object.isRequired
};

var ScrollBehaviorContext = function (_React$Component) {
  _inherits(ScrollBehaviorContext, _React$Component);

  function ScrollBehaviorContext(props, context) {
    _classCallCheck(this, ScrollBehaviorContext);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _initialiseProps.call(_this);

    var routerProps = props.routerProps;
    var router = routerProps.router;


    _this.scrollBehavior = new _scrollBehavior2.default({
      addTransitionHook: router.listenBefore,
      stateStorage: new _StateStorage2.default(router),
      getCurrentLocation: function getCurrentLocation() {
        return _this.props.routerProps.location;
      },
      shouldUpdateScroll: _this.shouldUpdateScroll
    });

    _this.scrollBehavior.updateScroll(null, routerProps);
    return _this;
  }

  ScrollBehaviorContext.prototype.getChildContext = function getChildContext() {
    return {
      scrollBehavior: this
    };
  };

  ScrollBehaviorContext.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var routerProps = this.props.routerProps;

    var prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    this.scrollBehavior.updateScroll(prevRouterProps, routerProps);
  };

  ScrollBehaviorContext.prototype.componentWillUnmount = function componentWillUnmount() {
    this.scrollBehavior.stop();
  };

  ScrollBehaviorContext.prototype.render = function render() {
    return this.props.children;
  };

  return ScrollBehaviorContext;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
    var shouldUpdateScroll = _this2.props.shouldUpdateScroll;

    if (!shouldUpdateScroll) {
      return true;
    }

    // Hack to allow accessing scrollBehavior._stateStorage.
    return shouldUpdateScroll.call(_this2.scrollBehavior, prevRouterProps, routerProps);
  };

  this.registerElement = function (key, element, shouldUpdateScroll) {
    _this2.scrollBehavior.registerElement(key, element, shouldUpdateScroll, _this2.props.routerProps);
  };

  this.unregisterElement = function (key) {
    _this2.scrollBehavior.unregisterElement(key);
  };
};

ScrollBehaviorContext.propTypes = propTypes;
ScrollBehaviorContext.childContextTypes = childContextTypes;

exports.default = ScrollBehaviorContext;
module.exports = exports['default'];