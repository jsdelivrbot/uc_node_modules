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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = require("prop-types");
/**
 * Register the component styles.
 * @param styles The styles you want to assign.
 * @return {(target:any)=>void} A function that wraps the target with the provided styles.
 */
function WithStyles(styles) {
    return function (Component) {
        // Add context types
        var ComponentWithStyles = (function (_super) {
            __extends(ComponentWithStyles, _super);
            function ComponentWithStyles() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ComponentWithStyles.prototype.componentWillMount = function () {
                if (this.context.insertCss) {
                    this.removeCss = this.context.insertCss(styles);
                }
                // Call the original function
                var componentWillMount = _super.prototype['componentWillMount'];
                componentWillMount && componentWillMount.bind(this)();
            };
            ComponentWithStyles.prototype.componentWillUnmount = function () {
                // Call the original function
                var componentWillUnmount = _super.prototype['componentWillUnmount'];
                componentWillUnmount && componentWillUnmount.bind(this)();
                // Remove the css
                setTimeout(this.removeCss, 0);
            };
            return ComponentWithStyles;
        }(Component));
        ComponentWithStyles.contextTypes = __assign({}, Component['contextTypes'] || {}, { insertCss: PropTypes.func });
        // Set the old class name
        Object.defineProperty(ComponentWithStyles, 'name', {
            value: Component['name'],
            writable: false
        });
        return ComponentWithStyles;
    };
}
exports.WithStyles = WithStyles;
