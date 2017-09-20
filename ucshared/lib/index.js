"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./api"));
__export(require("./creditCard"));
__export(require("./defaults"));
__export(require("./error"));
__export(require("./states"));
__export(require("./validation"));
__export(require("./util"));
exports.URL_BASE = 'https://www.undergroundcellar.com/'; // TODO: Change this?
exports.WINE_IMG_URL_BASE = exports.URL_BASE + 'wine-img/'; // TODO: Change this?
exports.DETAIL_BASE_URL = '/wine-deals/';
exports.wineSizes = ['??', '375mL', '750mL', '100mL', '187mL', '1.5L', '1.0L', '3.0L'];
function getWineSize(id) {
    if (id > 0 && id < 8) {
        return exports.wineSizes[id];
    }
    else {
        return '750mL';
    }
}
exports.getWineSize = getWineSize;
;
//# sourceMappingURL=index.js.map