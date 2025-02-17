'use strict';

exports.__esModule = true;

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _postcss = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _plugin2.default)([_browsers.IE_5_5, _browsers.IE_6, _browsers.IE_7], [_postcss.DECL], function (decl) {
    var match = decl.value.match(/!\w/);
    if (match) {
        var hack = decl.value.substr(match.index, decl.value.length - 1);
        this.push(decl, {
            identifier: '!important',
            hack: hack
        });
    }
});
module.exports = exports['default'];