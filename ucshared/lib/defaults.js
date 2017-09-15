"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidEmpty = '00000000-0000-0000-0000-000000000000';
var Defaults = (function () {
    function Defaults() {
    }
    Defaults.wineGeniusData = function (copyFromExisting) {
        return {
            coffeeBlack: copyFromExisting ? copyFromExisting.coffeeBlack : false,
            coffeeCream: copyFromExisting ? copyFromExisting.coffeeCream : false,
            coffeeCreamSugar: copyFromExisting ? copyFromExisting.coffeeCreamSugar : false,
            coffeeFrappuccino: copyFromExisting ? copyFromExisting.coffeeFrappuccino : false,
            saltyPopcorn: copyFromExisting ? copyFromExisting.saltyPopcorn : false,
            charcuterie: copyFromExisting ? copyFromExisting.charcuterie : false,
            applesAndPeanutButter: copyFromExisting ? copyFromExisting.applesAndPeanutButter : false,
            fruitSmoothie: copyFromExisting ? copyFromExisting.fruitSmoothie : false,
            teriyaki: copyFromExisting ? copyFromExisting.teriyaki : false,
            mushroom: copyFromExisting ? copyFromExisting.mushroom : false,
            risotto: copyFromExisting ? copyFromExisting.risotto : false,
            pastaWithArugula: copyFromExisting ? copyFromExisting.pastaWithArugula : false,
            lemonSorbet: copyFromExisting ? copyFromExisting.lemonSorbet : false,
            caramelIceCream: copyFromExisting ? copyFromExisting.caramelIceCream : false,
            darkChocolateMousse: copyFromExisting ? copyFromExisting.darkChocolateMousse : false,
            olives: copyFromExisting ? copyFromExisting.olives : false,
            level: copyFromExisting ? copyFromExisting.level : '',
            redWhitePosition: copyFromExisting ? copyFromExisting.redWhitePosition : 0,
            redMin: copyFromExisting ? copyFromExisting.redMin : '',
            redMax: copyFromExisting ? copyFromExisting.redMax : '',
            whiteMin: copyFromExisting ? copyFromExisting.whiteMin : '',
            whiteMax: copyFromExisting ? copyFromExisting.whiteMax : '',
            bottlesPerWeek: copyFromExisting ? copyFromExisting.bottlesPerWeek : 0,
            sparkling: copyFromExisting ? copyFromExisting.sparkling : false,
            largeFormat: copyFromExisting ? copyFromExisting.largeFormat : false,
            rare: copyFromExisting ? copyFromExisting.rare : false,
            autographed: copyFromExisting ? copyFromExisting.autographed : false,
            highValue: copyFromExisting ? copyFromExisting.highValue : false,
            smallProduction: copyFromExisting ? copyFromExisting.smallProduction : false,
            cult: copyFromExisting ? copyFromExisting.cult : false,
            international: copyFromExisting ? copyFromExisting.international : false,
            overallSweet: copyFromExisting ? copyFromExisting.overallSweet : 0,
            overallSour: copyFromExisting ? copyFromExisting.overallSour : 0,
            overallSalty: copyFromExisting ? copyFromExisting.overallSalty : 0,
            overallBitter: copyFromExisting ? copyFromExisting.overallBitter : 0,
            overallTexture: copyFromExisting ? copyFromExisting.overallTexture : 0,
            firstTrait: copyFromExisting ? copyFromExisting.firstTrait : '',
            secondTrait: copyFromExisting ? copyFromExisting.secondTrait : '',
            lastTrait: copyFromExisting ? copyFromExisting.lastTrait : '',
            budget: copyFromExisting ? copyFromExisting.budget : 0,
            paymentGuid: copyFromExisting ? copyFromExisting.paymentGuid : '',
            surveyDate: copyFromExisting ? copyFromExisting.surveyDate : new Date(),
            traits: copyFromExisting ? copyFromExisting.traits : [],
        };
    };
    Defaults.shipOrderResult = function () {
        return {
            cplId: '',
            shippingCaseGuid: '',
            bottles: [],
            totalTax: 0,
            taxAlreadyPaid: 0,
            taxChargedOrRefunded: 0,
            protectShipmentValue: 0,
            shipMethods: [],
            iceAvailable: true,
            promotionsUsed: [],
            promoValue: 0,
            accountBalanceUsed: 0,
            accountBalanceAvailable: 0,
            taxComputed: { orderTaxAmt: 0, regionName: '', taxRate: 0 },
            totalPrice: 0,
            subtotal: 0,
        };
    };
    Defaults.cloudCheckoutModel = function () {
        return {
            shippingMethod: '0',
            icePack: false,
            giftMessage: '',
            bottles: [],
            additionalItems: [],
            protectShipment: false,
            protectShipmentValue: 0,
            protectShipmentPercent: 0,
            userGuid: '',
            creditCardId: '',
            shippingAddressId: '',
            promoCode: [],
            appId: '',
            useAccountCredit: true,
            result: null,
            sessionUtmSource: '',
            sessionUtmMedium: '',
            sessionUtmCampaign: '',
            noAuthAddress: {},
            validationWarnings: [],
            validationErrors: [],
        };
    };
    Defaults.changePasswordState = function () {
        return {
            isLoading: false,
            passwordError: false,
            passwordMessage: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    };
    Defaults.changePasswordStateUpdated = function () {
        return {
            passwordMessage: 'Your password has been updated.',
            newPassword: '',
            oldPassword: '',
            confirmPassword: '',
            passwordError: false,
            isLoading: false,
        };
    };
    Defaults.changePasswordStateDoesNotMatch = function () {
        return {
            passwordMessage: 'Old password does not match with our database records, try again.',
            passwordError: true,
            oldPassword: '',
            isLoading: false,
        };
    };
    return Defaults;
}());
exports.Defaults = Defaults;
//# sourceMappingURL=defaults.js.map