"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
function getTimeRemaining(offerDetail) {
    if (offerDetail && offerDetail.expiryDate) {
        var now = moment();
        var expiryDate = moment(offerDetail.expiryDate);
        if (now.isBefore(expiryDate)) {
            var days = moment.duration(expiryDate.diff(now)).asDays();
            var hours = moment.duration(expiryDate.diff(now)).asHours();
            var minutes = moment.duration(expiryDate.diff(now)).asMinutes();
            var seconds = moment.duration(expiryDate.diff(now)).asSeconds();
            seconds -= Math.floor(minutes) * 60;
            minutes -= Math.floor(hours) * 60;
            hours -= Math.floor(days) * 24;
            return ((days > 0 ? days.toFixed(0) + 'd:' : '') +
                (hours > 0 ? hours.toFixed(0) + 'h:' : '') +
                (minutes > 0 ? minutes.toFixed(0) + 'm:' : '') +
                (seconds.toFixed(0) + 's'));
        }
        else {
            return 'Ending soon!';
        }
    }
    else {
        return '';
    }
}
exports.getTimeRemaining = getTimeRemaining;
//# sourceMappingURL=util.js.map