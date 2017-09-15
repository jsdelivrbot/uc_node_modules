"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultFormat = /(\d{1,4})/g;
var CardUtility = (function () {
    function CardUtility() {
    }
    CardUtility.cardFromNumber = function (num) {
        var card, p, pattern, _i, _j, _len, _len1, _ref;
        num = (num + '').replace(/\D/g, '');
        for (_i = 0, _len = exports.cards.length; _i < _len; _i++) {
            card = exports.cards[_i];
            _ref = card.patterns;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                pattern = _ref[_j];
                p = pattern + '';
                if (num.substr(0, p.length) === p) {
                    return card;
                }
            }
        }
    };
    CardUtility.cardFromType = function (type) {
        var card, _i, _len;
        for (_i = 0, _len = exports.cards.length; _i < _len; _i++) {
            card = exports.cards[_i];
            if (card.type === type) {
                return card;
            }
        }
    };
    ;
    CardUtility.luhnCheck = function (num) {
        var digit, digits, odd, sum, _i, _len;
        odd = true;
        sum = 0;
        digits = (num + '').split('').reverse();
        for (_i = 0, _len = digits.length; _i < _len; _i++) {
            digit = digits[_i];
            digit = parseInt(digit, 10);
            if ((odd = !odd)) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };
    ;
    CardUtility.replaceFullWidthChars = function (str) {
        var chars, chr, fullWidth, halfWidth, idx, value, _i, _len;
        if (str == null) {
            str = '';
        }
        fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
        halfWidth = '0123456789';
        value = '';
        chars = str.split('');
        for (_i = 0, _len = chars.length; _i < _len; _i++) {
            chr = chars[_i];
            idx = fullWidth.indexOf(chr);
            if (idx > -1) {
                chr = halfWidth[idx];
            }
            value += chr;
        }
        return value;
    };
    ;
    CardUtility.reFormatNumeric = function (inputValue) {
        var value = inputValue;
        value = CardUtility.replaceFullWidthChars(value);
        value = value.replace(/\D/g, '');
        return value;
    };
    ;
    CardUtility.reFormatCardNumber = function (value) {
        value = CardUtility.replaceFullWidthChars(value);
        value = CardUtility.formatCardNumber(value, '');
        return value;
    };
    ;
    CardUtility.formatCardNumber = function (value, digit) {
        var card, length, re, upperLength;
        // digit = String.fromCharCode(e.which);
        // if (!/^\d+$/.test(digit)) {
        // 	return value;
        // }
        card = CardUtility.cardFromNumber(value + digit);
        length = (value.replace(/\D/g, '') + digit).length;
        upperLength = 16;
        if (card) {
            upperLength = card.length[card.length.length - 1];
        }
        if (length >= upperLength) {
            return value;
        }
        if (card && card.type === 'amex') {
            re = /^(\d{4}|\d{4}\s\d{6})$/;
        }
        else {
            re = /(?:^|\s)(\d{4})$/;
        }
        if (re.test(value)) {
            return (value + ' ' + digit);
        }
        else if (re.test(value + digit)) {
            return (value + digit + ' ');
        }
        else {
            return value;
        }
    };
    ;
    CardUtility.handleCCNumberInput = function (event) {
        var target = event.currentTarget, targetVal = target.value, charCode = String.fromCharCode(event.which), charCodeLen = (targetVal.replace(/\D/g, '') + charCode).length, card = CardUtility.cardFromNumber(targetVal + charCode), maxLength = 16;
        // if (CardUtility.state.cardNumber.length >= 2)
        // 	CardUtility.setState({cardType: card.type});
        if (card && (maxLength = card.length), !/^\d+$/.test(charCode) || charCodeLen > maxLength) {
            return void event.preventDefault();
        }
        var cardTest = card && "amex" === card.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/;
        return cardTest.test(targetVal) && target.selectionStart === targetVal.length ?
            (event.preventDefault(), void (target.value = targetVal + " " + charCode)) : void 0;
    };
    CardUtility.formatBackCardNumber = function (value) {
        // if (e.which !== 8) {
        // 	return;
        // }
        // if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
        // 	return;
        // }
        if (/\d\s$/.test(value)) {
            // e.preventDefault();
            // return setTimeout(function() {
            // 	return $target.val(value.replace(/\d\s$/, ''));
            // });
            return value.replace(/\d\s$/, '');
        }
        else if (/\s\d?$/.test(value)) {
            // e.preventDefault();
            // return setTimeout(function() {
            // 	return $target.val(value.replace(/\d$/, ''));
            // });
            return value.replace(/\d$/, '');
        }
        else {
            return value;
        }
    };
    ;
    CardUtility.reFormatExpiry = function (value) {
        value = CardUtility.replaceFullWidthChars(value);
        value = CardUtility.formatExpiry(value, '');
        return value;
    };
    ;
    CardUtility.formatExpiry = function (val, digit) {
        // var $target, digit, val;
        // digit = String.fromCharCode(e.which);
        // if (!/^\d+$/.test(digit)) {
        // 	return;
        // }
        // $target = e.currentTarget;
        // val = $target.value + digit;
        val = val + digit;
        if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
            return "0" + val + " / ";
            // e.preventDefault();
            // return setTimeout(function() {
            // 	return $target.val("0" + val + " / ");
            // });
        }
        else if (/^\d\d$/.test(val)) {
            // e.preventDefault();
            // return setTimeout(function() {
            var m1 = void 0, m2 = void 0;
            m1 = parseInt(val[0], 10);
            m2 = parseInt(val[1], 10);
            if (m2 > 2 && m1 !== 0) {
                return ("0" + m1 + " / " + m2);
            }
            else {
                return ("" + val + " / ");
            }
            // });
        }
    };
    ;
    CardUtility.reFormatCVC = function (value) {
        value = CardUtility.replaceFullWidthChars(value);
        value = value.replace(/\D/g, '').slice(0, 4);
        return value;
    };
    ;
    CardUtility.restrictNumeric = function (e) {
        var input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    };
    ;
    CardUtility.restrictCardNumber = function (e) {
        var $target, card, digit, value;
        $target = e.currentTarget;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        value = ($target.value + digit).replace(/\D/g, '');
        card = CardUtility.cardFromNumber(value);
        if (card) {
            return value.length <= card.length[card.length.length - 1];
        }
        else {
            return value.length <= 16;
        }
    };
    ;
    CardUtility.restrictExpiry = function (e) {
        var $target, digit, value;
        $target = e.currentTarget;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return false;
        }
        value = $target.value + digit;
        value = value.replace(/\D/g, '');
        if (value.length > 6) {
            return false;
        }
        return true;
    };
    ;
    CardUtility.restrictCVC = function (e) {
        var $target, digit, val;
        $target = e.currentTarget;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        val = $target.value + digit;
        return val.length <= 4;
    };
    ;
    return CardUtility;
}());
exports.CardUtility = CardUtility;
exports.cards = [
    {
        type: 'maestro',
        patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
        format: defaultFormat,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'forbrugsforeningen',
        patterns: [600],
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'dankort',
        patterns: [5019],
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'visa',
        patterns: [4],
        format: defaultFormat,
        length: [13, 16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'amex',
        patterns: [34, 37],
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        length: [15],
        cvcLength: [3, 4],
        luhn: true
    }, {
        type: 'dinersclub',
        patterns: [30, 36, 38, 39],
        format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
        length: [14],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'discover',
        patterns: [60, 64, 65, 622],
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'unionpay',
        patterns: [62, 88],
        format: defaultFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: false
    }, {
        type: 'jcb',
        patterns: [35],
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }
];
//# sourceMappingURL=creditCard.js.map