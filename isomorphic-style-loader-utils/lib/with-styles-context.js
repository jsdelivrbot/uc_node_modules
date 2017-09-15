"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var WithStylesContextProps = (function () {
    function WithStylesContextProps() {
    }
    return WithStylesContextProps;
}());
exports.WithStylesContextProps = WithStylesContextProps;
var WithStylesContext = (function (_super) {
    __extends(WithStylesContext, _super);
    function WithStylesContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WithStylesContext.prototype.getChildContext = function () {
        return { insertCss: this.props.onInsertCss };
    };
    WithStylesContext.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    return WithStylesContext;
}(React.Component));
WithStylesContext.childContextTypes = {
    insertCss: PropTypes.func.isRequired,
};
exports.WithStylesContext = WithStylesContext;
