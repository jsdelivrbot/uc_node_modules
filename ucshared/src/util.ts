import {OfferV2Entity} from './api';
import * as moment from 'moment';

export function getTimeRemaining(offerDetail: OfferV2Entity) {
	if (offerDetail && offerDetail.expiryDate) {
		const now = moment();
		const expiryDate = moment(offerDetail.expiryDate);

		if (now.isBefore(expiryDate)) {
			const days = moment.duration(expiryDate.diff(now)).asDays();
			let hours = moment.duration(expiryDate.diff(now)).asHours();
			let minutes = moment.duration(expiryDate.diff(now)).asMinutes();
			let seconds = moment.duration(expiryDate.diff(now)).asSeconds();

			seconds -= Math.floor(minutes) * 60;
			minutes -= Math.floor(hours) * 60;
			hours -= Math.floor(days) * 24;

			return (
				(days > 0 ? days.toFixed(0) + 'd:' : '') +
				(hours > 0 ? hours.toFixed(0) + 'h:' : '') +
				(minutes > 0 ? minutes.toFixed(0) + 'm:' : '') +
				(seconds.toFixed(0) + 's'));
		} else {
			return 'Ending soon!';
		}
	} else {
		return '';
	}
}
