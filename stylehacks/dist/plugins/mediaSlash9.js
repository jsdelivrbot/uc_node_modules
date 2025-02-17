'use strict';

exports.__esModule = true;

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _plugin2.default)([_browsers.IE_5_5, _browsers.IE_6, _browsers.IE_7], [_postcss.ATRULE], function (rule) {
    var params = rule.params.trim();
    if (params === 'screen\\9') {
        this.push(rule, {
            identifier: _identifiers.MEDIA_QUERY,
            hack: params
        });
    }
});
module.exports = exports['default'];