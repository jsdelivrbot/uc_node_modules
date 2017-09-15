import * as Api from './api';
export interface IFormDataItem {
    name: string;
    value: string;
}
export interface IValidation {
    name: string;
    validIf: string;
}
export declare function isEmpty(str: string | any[]): boolean;
export declare function isValidEmail(email: any): boolean;
export declare function formatCurrency(input: any): string;
export declare function sortOffers(offers: any): any;
export declare function object2formData(object: any): IFormDataItem[];
export declare const validationTypes: {
    NOT_EMPTY: string;
    IS_EMAIL: string;
    IS_PHONE_NUMBER: string;
    IS_ZIP_CODE: string;
    IS_CC_NUMBER: string;
    IS_CCV_CODE: string;
    IS_EXPIRY_DATE: string;
};
export declare const validationPatterns: {
    IS_EMAIL: RegExp;
    IS_PHONE_NUMBER: RegExp;
    IS_ZIP_CODE: RegExp;
    IS_CCV_CODE: RegExp;
};
export declare function formatPhone(value: string): string;
export declare function dedupeAddressList(addressList: Api.NhAddressModel[]): Api.NhAddressModel[];
export declare function formIsValid(formData: IFormDataItem[], requiredFields: IValidation[]): {
    invalidFields: any[];
    isValid: boolean;
};
export declare class ExpiryDate {
    static getValidValue(value: any): string;
    static getFormatted(str: any): string;
}
