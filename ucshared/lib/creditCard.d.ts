export declare class CardUtility {
    static cardFromNumber(num: any): any;
    static cardFromType(type: any): any;
    static luhnCheck(num: any): boolean;
    static replaceFullWidthChars(str: string): string;
    static reFormatNumeric(inputValue: string): string;
    static reFormatCardNumber(value: any): any;
    static formatCardNumber(value: string, digit: string): string;
    static handleCCNumberInput(event: any): any;
    static formatBackCardNumber(value: any): any;
    static reFormatExpiry(value: any): any;
    static formatExpiry(val: string, digit: string): string;
    static reFormatCVC(value: any): any;
    static restrictNumeric(e: any): boolean;
    static restrictCardNumber(e: any): boolean;
    static restrictExpiry(e: any): boolean;
    static restrictCVC(e: any): boolean;
}
export declare const cards: {
    type: string;
    patterns: number[];
    format: RegExp;
    length: number[];
    cvcLength: number[];
    luhn: boolean;
}[];
