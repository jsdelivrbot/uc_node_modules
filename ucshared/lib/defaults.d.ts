import * as Api from './api';
export declare const GuidEmpty = "00000000-0000-0000-0000-000000000000";
export declare class Defaults {
    static wineGeniusData(copyFromExisting?: Api.WineGeniusData): Api.WineGeniusData;
    static shipOrderResult(): Api.ShipOrderResult;
    static cloudCheckoutModel(): Api.CloudCheckoutModel;
    static changePasswordState(): IChangePasswordState;
    static changePasswordStateUpdated(): IChangePasswordState;
    static changePasswordStateDoesNotMatch(): {
        passwordMessage: string;
        passwordError: boolean;
        oldPassword: string;
        isLoading: boolean;
    };
}
export interface IChangePasswordState {
    isLoading: boolean;
    passwordError: boolean;
    passwordMessage: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
