"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cc = require("credit-card-type");
var _ = require("underscore");
function isEmpty(str) {
    if (typeof str === 'undefined') {
        return true;
    }
    if (str === null) {
        return true;
    }
    if (typeof str === 'string') {
        if (str.trim().length < 1) {
            return true;
        }
    }
    return str.length === 0;
}
exports.isEmpty = isEmpty;
function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
exports.isValidEmail = isValidEmail;
function formatCurrency(input) {
    var s1 = '$' + parseFloat(input).toFixed(2).toString();
    if (s1.lastIndexOf('.00') === s1.length - 3) {
        s1 = s1.substring(0, s1.length - 3);
    }
    return s1;
}
exports.formatCurrency = formatCurrency;
function sortOffers(offers) {
    return offers.sort(function (a, b) {
        var price = function (x) { return x.retailPrice || x.displayPrice || x.groupValue; };
        if (price(a) < price(b)) {
            return 1;
        }
        if (price(a) > price(b)) {
            return -1;
        }
        return 0;
    });
}
exports.sortOffers = sortOffers;
function object2formData(object) {
    var result = [];
    var keys = Object.keys(object);
    for (var key in keys) {
        if (keys.hasOwnProperty(key)) {
            result.push({ name: key, value: object[key] });
        }
    }
    return result;
}
exports.object2formData = object2formData;
exports.validationTypes = {
    NOT_EMPTY: 'NOT_EMPTY',
    IS_EMAIL: 'IS_EMAIL',
    IS_PHONE_NUMBER: 'IS_PHONE_NUMBER',
    IS_ZIP_CODE: 'IS_ZIP_CODE',
    IS_CC_NUMBER: 'IS_CC_NUMBER',
    IS_CCV_CODE: 'IS_CCV_CODE',
    IS_EXPIRY_DATE: 'IS_EXPIRY_DATE',
};
exports.validationPatterns = {
    IS_EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    IS_PHONE_NUMBER: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    IS_ZIP_CODE: /^\d{5}(?:[-\s]\d{4})?$/,
    IS_CCV_CODE: /^[0-9]{3,4}$/,
};
function formatPhone(value) {
    return value.replace(/^(\+(\d{1,2})\s)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/g, '$2 ($3) $4-$5').trim();
}
exports.formatPhone = formatPhone;
function dedupeAddressList(addressList) {
    var aList = [];
    var result = [];
    for (var i = 0; i < addressList.length; ++i) {
        var a = addressList[i];
        a.firstName = (a.firstName || '').trim();
        a.lastName = (a.lastName || '').trim();
        a.address1 = (a.address1 || '').trim();
        a.address2 = (a.address2 || '').trim();
        a.city = (a.city || '').trim();
        a.state = (a.state || '').trim();
        a.zip = (a.zip || '').trim();
        a.phone = (a.phone || '').trim();
        var hash = JSON.stringify([a.firstName, a.lastName, a.address1, a.address2, a.city, a.state, a.zip, a.phone]).toLowerCase();
        if (aList.indexOf(hash) < 0) {
            aList.push(hash);
            result.push(a);
        }
    }
    return result;
}
exports.dedupeAddressList = dedupeAddressList;
function formIsValid(formData, requiredFields) {
    var validity = { invalidFields: [], isValid: true };
    formData.map(function (field) {
        var reqField = _.find(requiredFields, function (req) {
            return req.name === field.name;
        });
        var invalid = false;
        if (reqField) {
            switch (reqField.validIf) {
                case exports.validationTypes.NOT_EMPTY:
                    if (field.value === '') {
                        invalid = true;
                    }
                    break;
                case exports.validationTypes.IS_CC_NUMBER:
                    var val = (field.value || '');
                    var temp = val.replace(/ /g, '').toString();
                    var ct = cc(temp);
                    if (!ct || ct.length < 1) {
                        invalid = true;
                        break;
                    }
                    var regex = new RegExp(ct[0] ? ct[0].exactPattern.toString() : '');
                    if (field.value === '' || !regex.test(field.value.replace(/ /g, ''))) {
                        invalid = true;
                    }
                    break;
                case exports.validationTypes.IS_EXPIRY_DATE:
                    var match = field.value.match(/^(\d\d)\s*\/\s*(\d\d(\d\d)?)$/);
                    if (match) {
                        var month = parseInt(match[1], 10);
                        var year = parseInt(match[2], 10);
                        if (year < 100) {
                            year += 2000;
                        }
                        if (!(month >= 1 && month <= 12)) {
                            invalid = true;
                        }
                        else if (year < new Date().getFullYear() ||
                            (year === new Date().getFullYear() &&
                                month < new Date().getMonth() + 1)) {
                            invalid = true;
                        }
                    }
                    else {
                        invalid = true;
                    }
                    break;
                case exports.validationTypes.IS_EMAIL:
                case exports.validationTypes.IS_PHONE_NUMBER:
                case exports.validationTypes.IS_ZIP_CODE:
                case exports.validationTypes.IS_CCV_CODE:
                    if (!exports.validationPatterns[reqField.validIf].test(field.value)) {
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
exports.formIsValid = formIsValid;
var ExpiryDate = (function () {
    function ExpiryDate() {
    }
    ExpiryDate.getValidValue = function (value) {
        var match = value.match(/^(\d\d)\s*\/\s*(\d\d(\d\d)?)$/);
        return match ? match[1] + '/' + match[2] : '';
    };
    ExpiryDate.getFormatted = function (str) {
        var digits = str.replace(/[^\d]/g, '');
        var endsWithSlash = str.substring(str.length - 1) === '/';
        if (digits.length === 0) {
            return '';
        }
        else if (digits.length === 1) {
            if (digits[0] === '0') {
                return '0';
            }
            else if (digits[0] === '1') {
                return endsWithSlash ? '01 / ' : '1';
            }
            else {
                return '0' + digits[0] + ' / ';
            }
        }
        else if (digits.length >= 2) {
            if (digits[0] === '0') {
                if (digits[1] === '0') {
                    return '0';
                }
                else {
                    return digits.substring(0, 2) + ' / ' + digits.substring(2);
                }
            }
            else if (digits[0] === '1') {
                if (parseInt(digits[1], 10) <= 2) {
                    return digits.substring(0, 2) + ' / ' + digits.substring(2);
                }
                else {
                    return '0' + digits[0] + ' / ' + digits.substring(1);
                }
            }
            else if (parseInt(digits[0], 10) >= 2) {
                return '0' + digits[0] + ' / ' + digits.substring(1);
            }
        }
    };
    return ExpiryDate;
}());
exports.ExpiryDate = ExpiryDate;
//# sourceMappingURL=validation.js.map