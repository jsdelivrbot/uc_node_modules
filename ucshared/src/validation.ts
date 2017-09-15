import * as cc from 'credit-card-type';
import * as Api from './api';
import * as _ from 'underscore';

export interface IFormDataItem {
	name: string;
	value: string;
}

export interface IValidation {
	name: string;
	validIf: string;
}

export function isEmpty(str: string|any[]) {
	if (typeof str === 'undefined') { return true; }
	if (str === null) { return true; }
	if (typeof str === 'string') {
		if (str.trim().length < 1) { return true; }
	}
	return str.length === 0;
}

export function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export function formatCurrency(input: any): string {
	let s1 = '$' + parseFloat(input).toFixed(2).toString();
	if (s1.lastIndexOf('.00') === s1.length - 3) {
		s1 = s1.substring(0, s1.length - 3);
	}
	return s1;
}

export function sortOffers(offers) {
	return offers.sort((a, b) => {
		const price = (x) => x.retailPrice || x.displayPrice || x.groupValue;
		if (price(a) < price(b)) {
			return 1;
		}
		if (price(a) > price(b)) {
			return -1;
		}
		return 0;
	});
}

export function object2formData(object: any): IFormDataItem[] {
	const result = [];
	const keys = Object.keys(object);
	for (const key in keys) {
		if (keys.hasOwnProperty(key)) {
			result.push({name: key, value: object[key]});
		}
	}
	return result;
}

export const validationTypes = {
	NOT_EMPTY: 'NOT_EMPTY',
	IS_EMAIL: 'IS_EMAIL',
	IS_PHONE_NUMBER: 'IS_PHONE_NUMBER',
	IS_ZIP_CODE: 'IS_ZIP_CODE',
	IS_CC_NUMBER: 'IS_CC_NUMBER',
	IS_CCV_CODE: 'IS_CCV_CODE',
	IS_EXPIRY_DATE: 'IS_EXPIRY_DATE',
}

export const validationPatterns = {
	IS_EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	IS_PHONE_NUMBER: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
	IS_ZIP_CODE: /^\d{5}(?:[-\s]\d{4})?$/,
	IS_CCV_CODE: /^[0-9]{3,4}$/,
}

export function formatPhone(value: string) {
	return value.replace(/^(\+(\d{1,2})\s)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/g, '$2 ($3) $4-$5').trim();
}

export function dedupeAddressList(addressList: Api.NhAddressModel[]): Api.NhAddressModel[] {
	const aList: string[] = [];
	const result: Api.NhAddressModel[] = [];
	for (let i = 0; i < addressList.length; ++i) {
		const a = addressList[i];
		a.firstName = (a.firstName || '').trim();
		a.lastName = (a.lastName || '').trim();
		a.address1 = (a.address1 || '').trim();
		a.address2 = (a.address2 || '').trim();
		a.city = (a.city || '').trim();
		a.state = (a.state || '').trim();
		a.zip = (a.zip || '').trim();
		a.phone = (a.phone || '').trim();
		const hash = JSON.stringify([a.firstName, a.lastName, a.address1, a.address2, a.city, a.state, a.zip, a.phone]).toLowerCase();
		if (aList.indexOf(hash) < 0) {
			aList.push(hash);
			result.push(a);
		}
	}
	return result;
}

export function formIsValid(formData: IFormDataItem[], requiredFields: IValidation[]) {
	const validity = {invalidFields: [], isValid: true};

	formData.map((field) => {
		const reqField = _.find(requiredFields, (req: IValidation) => {
			return req.name === field.name;
		});
		let invalid = false;

		if (reqField) {
			switch (reqField.validIf) {
				case validationTypes.NOT_EMPTY:
					if (field.value === '') {
						invalid = true;
					}
					break;
				case validationTypes.IS_CC_NUMBER:
					const val = (field.value || '');
					const temp: string = val.replace(/ /g, '').toString();
					const ct = cc(temp);
					if (!ct || ct.length < 1) {
						invalid = true;
						break;
					}
					const regex = new RegExp(ct[0] ? ct[0].exactPattern.toString() : '');
					if (field.value === '' || !regex.test(field.value.replace(/ /g, ''))) {
						invalid = true;
					}
					break;
				case validationTypes.IS_EXPIRY_DATE:
					const match = field.value.match(/^(\d\d)\s*\/\s*(\d\d(\d\d)?)$/);
					if (match) {
						const month = parseInt(match[1], 10);
						let year = parseInt(match[2], 10);
						if (year < 100) {
							year += 2000;
						}
						if (!(month >= 1 && month <= 12)) {
							invalid = true;
						} else if (
							year < new Date().getFullYear() ||
							(
								year === new Date().getFullYear() &&
								month < new Date().getMonth() + 1
							)
						) {
							invalid = true;
						}
					} else {
						invalid = true;
					}
					break;
				case validationTypes.IS_EMAIL:
				case validationTypes.IS_PHONE_NUMBER:
				case validationTypes.IS_ZIP_CODE:
				case validationTypes.IS_CCV_CODE:
					if (!validationPatterns[reqField.validIf].test(field.value)) {
						invalid = true;
					}
					break;
			}

			if (invalid) {
				validity.invalidFields.push(field.name);
				validity.isValid = false;
				invalid = false;
			}
		}
	});

	return validity;
}

export class ExpiryDate {

	public static getValidValue(value) {
		const match = value.match(/^(\d\d)\s*\/\s*(\d\d(\d\d)?)$/);
		return match ? match[1] + '/' + match[2] : '';
	}

	public static getFormatted(str) {
		const digits = str.replace(/[^\d]/g, '');
		const endsWithSlash = str.substring(str.length - 1) === '/';
		if (digits.length === 0) {
			return '';
		} else if (digits.length === 1) {
			if (digits[0] === '0') {
				return '0';
			} else if (digits[0] === '1') {
				return endsWithSlash ? '01 / ' : '1';
			} else {
				return '0' + digits[0] + ' / ';
			}
		} else if (digits.length >= 2) {
			if (digits[0] === '0') {
				if (digits[1] === '0') {
					return '0';
				} else {
					return digits.substring(0, 2) + ' / ' + digits.substring(2);
				}
			} else if (digits[0] === '1') {
				if (parseInt(digits[1], 10) <= 2) {
					return digits.substring(0, 2) + ' / ' + digits.substring(2);
				} else {
					return '0' + digits[0] + ' / ' + digits.substring(1);
				}
			} else if (parseInt(digits[0], 10) >= 2) {
				return '0' + digits[0] + ' / ' + digits.substring(1);
			}
		}
	}
}
