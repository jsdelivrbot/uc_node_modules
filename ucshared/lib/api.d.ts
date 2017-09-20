export interface FetchAPI {
    (url: string, init?: any): Promise<any>;
}
export declare const BASE_PATH: any;
export interface FetchArgs {
    url: string;
    options: any;
}
export declare class BaseAPI {
    basePath: string;
    fetch: FetchAPI;
    constructor(fetch?: FetchAPI, basePath?: string);
}
export interface AccessLogModel {
    "acType"?: string;
    "acUrl"?: string;
    "acIpv6"?: string;
    "acOffersef"?: string;
    "acQsEmail"?: string;
    "acQsFname"?: string;
    "acQsLname"?: string;
    "acReferrer"?: string;
    "acSessionid"?: string;
}
export interface AchievementModel {
    "name"?: string;
    "description"?: string;
    "totalPoints"?: number;
    "records"?: Array<AchievementRecord>;
}
export interface AchievementRecord {
    "itemId"?: string;
    "name"?: string;
    "date"?: Date;
    "pointsEarned"?: number;
}
export interface AddressModelResponse {
    "apiStatus"?: string;
    "id"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "address1"?: string;
    "address2"?: string;
    "city"?: string;
    "isDefault"?: boolean;
    "cplId"?: string;
    "state"?: string;
    "carrierPreference"?: string;
    "zip"?: string;
    "phone"?: string;
    "status"?: number;
    "dateAdded"?: Date;
}
export interface AdminOfferOverviewItem {
    "status"?: string;
    "dueDate"?: Date;
}
export interface AdminOfferOverviewModel {
    "offerStartDate"?: Date;
    "items"?: {
        [key: string]: AdminOfferOverviewItem;
    };
}
export interface AdminReferralModel {
    "userEmail"?: string;
    "referredUserEmail"?: string;
}
export interface AdminSkuDelivery {
    "items"?: string;
    "arrivalId"?: string;
    "offerId"?: string;
    "eta"?: Date;
    "invoiceLink"?: string;
    "comments"?: string;
    "deliveryCost"?: number;
    "isReceived"?: boolean;
    "receivedDate"?: Date;
    "enteredDate"?: Date;
}
export interface AdminUserPushModel {
    "userQuery"?: string;
    "searchResult"?: Array<UserModelExtended>;
    "body"?: string;
    "deepLink"?: string;
    "title"?: string;
}
export interface ApiBillingModelWithAuthnet {
    "userGuid"?: string;
    "authNetUserProfileId"?: string;
    "authNetUserId"?: string;
    "authNetPaymentProfileId"?: string;
    "authNetShippingProfileId"?: string;
    "isDeleted"?: boolean;
    "billingAddressId"?: string;
    "cvv": string;
    "firstName": string;
    "lastName": string;
    "dateAdded"?: Date;
    "expiryYear"?: number;
    "expiryMonth"?: number;
    "cardNumber"?: string;
    "id"?: string;
    "isDefault"?: boolean;
    "cardType"?: string;
}
export interface ApiBillingModelWithCardNumber {
    "billingAddressId"?: string;
    "cvv": string;
    "firstName": string;
    "lastName": string;
    "dateAdded"?: Date;
    "expiryYear"?: number;
    "expiryMonth"?: number;
    "cardNumber"?: string;
    "id"?: string;
    "isDefault"?: boolean;
    "cardType"?: string;
}
export interface ApiResultAddressModelResponse {
    "value"?: AddressModelResponse;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultApiBillingModelWithAuthnet {
    "value"?: ApiBillingModelWithAuthnet;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultApplePushEnroll {
    "value"?: ApplePushEnroll;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultAttributedItemList {
    "value"?: AttributedItemList;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultBoolean {
    "value"?: boolean;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultCloudCheckoutModel {
    "value"?: CloudCheckoutModel;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultGeniusExcl {
    "value"?: GeniusExcl;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultListCloudCheckoutItem {
    "value"?: Array<CloudCheckoutItem>;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultListCommentJsonObject {
    "value"?: Array<CommentJsonObject>;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultListGeniusGuess {
    "value"?: Array<GeniusGuess>;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultListNhAddressModel {
    "value"?: Array<NhAddressModel>;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultListPage {
    "value"?: Array<Page>;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultListString {
    "value"?: Array<string>;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultNhUserEmailPreference {
    "value"?: NhUserEmailPreference;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultOfferCheckoutModel {
    "value"?: OfferCheckoutModel;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultOrderGeniusState {
    "value"?: Array<OrderGeniusState>;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultPage {
    "value"?: Page;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultPasswordChangeModel {
    "value"?: PasswordChangeModel;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultPaymentWithAddressModel {
    "value"?: PaymentWithAddressModel;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultSkuEntity {
    "value"?: SkuEntity;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultSkuSwapModel {
    "value"?: SkuSwapModel;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultSkuViewEntity {
    "value"?: SkuViewEntity;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultString {
    "value"?: string;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultUserAuthResultModel {
    "value"?: UserAuthResultModel;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultWineGeniusData {
    "value"?: WineGeniusData;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultWineGeniusMessage {
    "value"?: WineGeniusMessage;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultWineGeniusVacation {
    "value"?: WineGeniusVacation;
    "success"?: boolean;
    "message"?: string;
}
export interface ApiResultWineryModel {
    "value"?: WineryModel;
    "success"?: boolean;
    "message"?: string;
}
export interface ApplePushEnroll {
    "deviceToken"?: string;
    "deviceUuid"?: string;
    "entryPoint"?: string;
}
export interface AttributedItemList {
    "itemCount"?: number;
    "items"?: Array<CloudRecordGroup>;
    "varietals"?: Array<TupleStringInt32>;
    "regions"?: Array<TupleStringInt32>;
    "countries"?: Array<TupleStringInt32>;
    "subregions"?: Array<TupleStringInt32>;
    "appellations"?: Array<TupleStringInt32>;
    "types"?: Array<TupleStringInt32>;
    "producers"?: Array<TupleStringInt32>;
}
export interface Audio {
    "duration"?: number;
    "performer"?: string;
    "title"?: string;
    "mimeType"?: string;
    "fileId"?: string;
    "fileSize"?: number;
    "filePath"?: string;
}
export interface CallbackQuery {
    "id"?: string;
    "from"?: User;
    "message"?: Message;
    "inlineMessageId"?: string;
    "data"?: string;
}
export interface CampaignApiModel {
    "title"?: string;
    "landingHtml"?: string;
    "shareTitle"?: string;
    "shareDescription"?: string;
    "endDate"?: Date;
    "prize"?: Array<PrizeModel>;
    "additionalDetails"?: string;
    "type"?: CampaignApiModelTypeEnum;
    "landingPages"?: Array<any>;
    "userEntries"?: number;
    "invitedByUser"?: number;
    "totalEntries"?: number;
    "userInCampaign"?: boolean;
    "isActive"?: boolean;
}
export declare type CampaignApiModelTypeEnum = "0" | "1";
export interface CampaignEntryModel {
    "userId"?: number;
    "campaignId"?: number;
    "invitedByUserId"?: number;
}
export interface CampaignExportModel {
    "bonus"?: number;
    "email"?: string;
    "referrals"?: number;
    "totalEntry"?: number;
    "userId"?: number;
}
export interface Chat {
    "id"?: number;
    "type"?: ChatTypeEnum;
    "title"?: string;
    "username"?: string;
    "firstName"?: string;
    "lastName"?: string;
}
export declare type ChatTypeEnum = "0" | "1" | "2" | "3";
export interface CheckoutPromoCodeModel {
    "code"?: string;
    "error"?: CheckoutPromoCodeModelErrorEnum;
    "discountApplied"?: number;
}
export declare type CheckoutPromoCodeModelErrorEnum = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
export interface ChosenInlineResult {
    "resultId"?: string;
    "from"?: User;
    "location"?: Location;
    "inlineMessageId"?: string;
    "query"?: string;
}
export interface CloudCellarV2 {
    "firstName"?: string;
    "biography"?: string;
    "url"?: string;
    "userName"?: string;
    "lifetimeValueSpent"?: number;
    "lifetimeUpgradeReceived"?: number;
    "shippingSavings"?: number;
    "shipments"?: any;
    "allItems"?: AttributedItemList;
    "userImg"?: string;
    "signupDate"?: Date;
}
export interface CloudCheckoutItem {
    "sku"?: string;
    "qty"?: number;
    "cloudItemDetail"?: PgCloudCellarRecord;
}
export interface CloudCheckoutModel {
    "shippingMethod"?: CloudCheckoutModelShippingMethodEnum;
    "icePack"?: boolean;
    "giftMessage"?: string;
    "bottles"?: Array<CloudCheckoutItem>;
    "additionalItems"?: Array<CloudCheckoutItem>;
    "protectShipment"?: boolean;
    "protectShipmentValue"?: number;
    "protectShipmentPercent"?: number;
    "userGuid": string;
    "creditCardId": string;
    "shippingAddressId": string;
    "promoCode": Array<CheckoutPromoCodeModel>;
    "appId"?: string;
    "useAccountCredit"?: boolean;
    "result"?: ShipOrderResult;
    "noAuthAddress"?: NhAddressModel;
    "validationWarnings"?: Array<ValidationResult>;
    "validationErrors"?: Array<ValidationResult>;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
}
export declare type CloudCheckoutModelShippingMethodEnum = "0" | "1" | "2";
export interface CloudRecordGroup {
    "item"?: PgCloudCellarRecord;
    "paid"?: Array<number>;
    "qtyAvailable"?: number;
    "qtyShipped"?: number;
    "qtyEnRoute"?: number;
    "qtyManual"?: number;
    "qtyInCart"?: number;
}
export interface CodeWithOrder {
    "code"?: NhPromoCodeModel;
    "usedWithOrders"?: Array<NhOrderModel>;
    "isReferral"?: boolean;
    "isRedeemed"?: boolean;
}
export interface Cohort {
    "firstPurchase"?: string;
    "cohortSize"?: number;
    "totalQty"?: number;
    "totalOrders"?: number;
    "totalRev"?: number;
    "userLifetimeMth"?: string;
}
export interface CommentJsonObject {
    "commentId"?: string;
    "commentTime"?: Date;
    "commentText"?: string;
    "sendEmail"?: boolean;
}
export interface Contact {
    "phoneNumber"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "userId"?: number;
}
export interface DeficitItem {
    "sku"?: string;
    "lastOrder"?: Date;
    "firstOrder"?: Date;
    "qtyOwedOverTimeLimit"?: number;
    "qtyInStock"?: number;
    "retailPrice"?: number;
    "displayDesc"?: string;
    "bottleImgCsv"?: string;
    "labelImgCsv"?: string;
    "displayName"?: string;
    "bottleImg"?: Array<string>;
    "labelImg"?: Array<string>;
}
export interface Document {
    "thumb"?: PhotoSize;
    "fileName"?: string;
    "mimeType"?: string;
    "fileId"?: string;
    "fileSize"?: number;
    "filePath"?: string;
}
export interface EmailCapture {
    "email"?: string;
    "favoriteVarietal"?: string;
}
export interface GeniusExcl {
    "include"?: Array<WineGeniusExclusionItem>;
    "exclude"?: Array<WineGeniusExclusionItem>;
}
export interface GeniusGuess {
    "userGuid"?: string;
    "email"?: string;
    "qty"?: number;
    "match"?: string;
    "lifeOrderValue"?: number;
    "lifeQty"?: number;
    "userLastPurchaseDate"?: Date;
}
export interface GroupItemEntity {
    "groupItemId"?: string;
    "referenceIdentity"?: string;
    "groupName"?: string;
    "groupType"?: GroupItemEntityGroupTypeEnum;
    "dateAdded"?: Date;
}
export declare type GroupItemEntityGroupTypeEnum = "1" | "2" | "3";
export interface InlineQuery {
    "id"?: string;
    "from"?: User;
    "query"?: string;
    "location"?: Location;
    "offset"?: string;
}
export interface InviteByEmailModel {
    "userUrlProfile"?: string;
    "newUserEmail"?: string;
    "newUserName"?: string;
}
export interface ItemDetailEntity {
    "itemDetailGuid"?: string;
    "fancifulName"?: string;
    "region"?: string;
    "appel"?: string;
    "varietal"?: string;
    "vintage"?: number;
    "abv"?: number;
    "wineTastingNotes"?: string;
    "winemakerNotes"?: string;
    "retailPrice"?: number;
    "wineryGuid"?: string;
    "urlKey"?: string;
    "brand"?: string;
    "countryCode"?: string;
    "upc"?: string;
    "ml"?: number;
    "isWine"?: boolean;
    "isBeer"?: boolean;
    "isLiquor"?: boolean;
    "isSparkling"?: boolean;
    "isLargeFormat"?: boolean;
    "isIntl"?: boolean;
    "isSmallProduction"?: boolean;
    "isOversize"?: boolean;
    "ctWineId"?: number;
    "ctProducerId"?: number;
    "ctLikes"?: number;
    "ctTastingNotes"?: number;
    "ctReview"?: number;
    "ctCommunityScore"?: number;
    "ctQty"?: number;
    "wineType"?: string;
    "wineProducer"?: string;
    "wineDesignation"?: string;
    "wineVineyard"?: string;
    "wineCountry"?: string;
    "wineSubregion"?: string;
    "wineWebUrl"?: string;
    "wineDrinkStart"?: number;
    "wineDrinkEnd"?: number;
    "redirectTo"?: string;
    "wineProducerUuid"?: string;
    "opName"?: string;
    "displayDesc"?: string;
    "bottleImgCsv"?: string;
    "labelImgCsv"?: string;
    "displayName"?: string;
    "bottleImg"?: Array<string>;
    "labelImg"?: Array<string>;
}
export interface KpiItem {
    "date"?: Date;
    "newUsers"?: number;
    "totalUsers"?: number;
    "newCustomers"?: number;
    "totalCustomers"?: number;
    "newOrders"?: number;
    "totalOrders"?: number;
    "newBottles"?: number;
    "totalBottles"?: number;
    "newSalesRevenue"?: number;
    "totalSalesRevenue"?: number;
    "directShippingRevenue"?: number;
    "cloudShippingRevenue"?: number;
    "totalShippingRevenue"?: number;
    "orderTaxRevenue"?: number;
    "creditsUsed"?: number;
    "promoCodeValueUsed"?: number;
}
export interface LeaderboardItem {
    "userId"?: string;
    "userDisplayName"?: string;
    "userSef"?: string;
    "points"?: number;
}
export interface LeaderboardItemGroup {
    "participants"?: Array<LeaderboardItem>;
    "groupName"?: string;
}
export interface LeaderboardModel {
    "contestBegin"?: Date;
    "contestEnd"?: Date;
    "items"?: Array<LeaderboardItemGroup>;
}
export interface LiveFeedItem {
    "quantity"?: number;
    "name"?: string;
    "url"?: string;
    "imageUrl"?: string;
}
export interface Location {
    "longitude"?: number;
    "latitude"?: number;
}
export interface ManifestSwapAction {
    "action"?: string;
    "email"?: string;
    "manifestId"?: string;
    "skuEntity"?: SkuEntity;
    "retailPrice"?: number;
    "taxableValue"?: number;
    "estimatedTaxAllocated"?: number;
    "shippingCaseGuid"?: string;
    "isSuspended"?: boolean;
    "itemGroupId"?: string;
    "pickIndex"?: number;
    "replacementForManifestGuid"?: string;
    "creditedForGuid"?: string;
}
export interface Message {
    "messageId"?: number;
    "from"?: User;
    "date"?: Date;
    "chat"?: Chat;
    "forwardFrom"?: User;
    "forwardFromChat"?: Chat;
    "forwardDate"?: Date;
    "replyToMessage"?: Message;
    "editDate"?: Date;
    "text"?: string;
    "entities"?: Array<MessageEntity>;
    "audio"?: Audio;
    "document"?: Document;
    "photo"?: Array<PhotoSize>;
    "sticker"?: Sticker;
    "video"?: Video;
    "voice"?: Voice;
    "caption"?: string;
    "contact"?: Contact;
    "location"?: Location;
    "venue"?: Venue;
    "newChatMember"?: User;
    "leftChatMember"?: User;
    "newChatTitle"?: string;
    "newChatPhoto"?: Array<PhotoSize>;
    "deleteChatPhoto"?: boolean;
    "groupChatCreated"?: boolean;
    "supergroupChatCreated"?: boolean;
    "channelChatCreated"?: boolean;
    "migrateToChatId"?: number;
    "migrateFromChatId"?: number;
    "pinnedMessage"?: Message;
}
export interface MessageEntity {
    "type"?: MessageEntityTypeEnum;
    "offset"?: number;
    "length"?: number;
    "url"?: string;
    "user"?: User;
}
export declare type MessageEntityTypeEnum = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
export interface NhAddressModel {
    "id"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "address1"?: string;
    "address2"?: string;
    "city"?: string;
    "isDefault"?: boolean;
    "cplId"?: string;
    "state"?: string;
    "carrierPreference"?: string;
    "zip"?: string;
    "phone"?: string;
    "status"?: number;
    "dateAdded"?: Date;
}
export interface NhAdjustment {
    "userId"?: string;
    "adjustmentId"?: string;
    "items"?: Array<NhAdjustmentItem>;
    "adjutmentCreateTime"?: Date;
    "adjustmentExecTime"?: Date;
}
export interface NhAdjustmentItem {
    "adjustmentItemId"?: string;
    "add"?: boolean;
    "sku"?: string;
    "manifestUpdated"?: OfferV2ManifestEntity;
    "manifestCreated"?: OfferV2ManifestEntity;
    "legacyManifestUpdated"?: string;
    "legacyManifestCreated"?: string;
}
export interface NhCreditModel {
    "creditId"?: string;
    "date"?: Date;
    "originalAmt"?: number;
    "creditAmt"?: number;
    "expiry"?: Date;
    "usedWithOrders"?: string;
    "comment"?: string;
    "creditForReferredUser"?: string;
    "creditOldId"?: number;
    "dateUsed"?: Date;
    "isSuspended"?: boolean;
    "isExpired"?: boolean;
}
export interface NhItemGroupEntity {
    "parentOffer"?: OfferV2Entity;
    "qtyInsideGroup"?: number;
    "estRemaining"?: number;
    "itemList"?: Array<OfferV2ItemEntity>;
    "retailPrice"?: number;
    "estChance"?: number;
    "itemGroupGuid"?: string;
    "pickQty"?: number;
    "pickRoundRobin"?: boolean;
    "qtyOfGroup"?: number;
    "urlKey"?: string;
    "isUpgrade"?: boolean;
    "displayDesc"?: string;
    "bottleImgCsv"?: string;
    "labelImgCsv"?: string;
    "displayName"?: string;
    "bottleImg"?: Array<string>;
    "labelImg"?: Array<string>;
}
export interface NhItemGroupViewEntity {
    "itemDetailGuid"?: string;
    "sku"?: string;
    "isSuspended"?: boolean;
    "qtyOfGroup"?: number;
    "pickRoundRobin"?: boolean;
    "qtyInsideGroup"?: number;
    "estRemaining"?: number;
    "estChance"?: number;
    "retailPrice"?: number;
    "itemGroupGuid"?: string;
    "pickQty"?: number;
    "urlKey"?: string;
    "isUpgrade"?: boolean;
    "displayDesc"?: string;
    "bottleImgCsv"?: string;
    "labelImgCsv"?: string;
    "displayName"?: string;
    "bottleImg"?: Array<string>;
    "labelImg"?: Array<string>;
}
export interface NhOrderModel {
    "cohortSignup"?: Date;
    "cohortUserMonth"?: number;
    "monthSinceFirstPurchase"?: number;
    "revealDate"?: Date;
    "isRevealed"?: boolean;
    "xUserEmail"?: string;
    "billing"?: ApiBillingModelWithAuthnet;
    "skuList"?: string;
    "bottleList"?: string;
    "paymentAuthCode"?: string;
    "paymentAuthDate"?: Date;
    "transactionId"?: string;
    "promoCode"?: string;
    "bottles"?: Array<NhItemGroupViewEntity>;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
    "orderGuid"?: string;
    "totalQuantity"?: number;
    "totalPrice"?: number;
    "discount"?: number;
    "creditDiscount"?: number;
    "tax"?: number;
    "timestamp"?: Date;
    "orderStatus"?: string;
    "paymentStatus"?: string;
    "offerId"?: string;
    "offerTitle"?: string;
    "offerSef"?: string;
    "userNthOrder"?: number;
    "unitPrice"?: number;
}
export interface NhPromoCodeModel {
    "promoCode"?: string;
    "isPercent"?: boolean;
    "promoAmount"?: number;
    "minBottlesQty"?: number;
    "minSubtotal"?: number;
    "date"?: Date;
    "startDate"?: Date;
    "expiry"?: Date;
    "promoEnabled"?: boolean;
    "redemptionsAllowedPerUser"?: number;
    "redemptionsAllowedOverall"?: number;
    "promoGroupName"?: string;
    "firstOrderOnly"?: boolean;
    "leftOverCredit"?: boolean;
    "amtPaid"?: number;
    "createdFromManifest"?: string;
    "issuedToUser"?: string;
    "isRefundable"?: boolean;
    "isExpired"?: boolean;
}
export interface NhSellerEntity {
    "sellerGuid"?: string;
    "sellerName"?: string;
    "sellerUrlKey"?: string;
    "sellerImageUrl"?: string;
    "sellerBlurb"?: string;
    "isWinery"?: boolean;
    "isRetail"?: boolean;
}
export interface NhSkuDelivery {
    "items"?: Array<NhSkuDeliveryItem>;
    "arrivalId"?: string;
    "offerId"?: string;
    "eta"?: Date;
    "invoiceLink"?: string;
    "comments"?: string;
    "deliveryCost"?: number;
    "isReceived"?: boolean;
    "receivedDate"?: Date;
    "enteredDate"?: Date;
}
export interface NhSkuDeliveryItem {
    "arrivalItemId"?: string;
    "arrivalItemSku"?: string;
    "unitCost"?: number;
    "arrivalQtyExpected"?: number;
    "arrivalQtyActual"?: number;
}
export interface NhUserEmailPreference {
    "preferenceId"?: string;
    "email"?: string;
    "sendAbandonedCheckoutEmail"?: boolean;
    "sendOrderConfirmation"?: boolean;
    "sendOrderCancellation"?: boolean;
    "sendReferralNotice"?: boolean;
    "sendCloudcellarReminder"?: boolean;
    "sendCreditReminder"?: boolean;
    "sendSystemNotice"?: boolean;
    "emailedInvited10"?: Date;
    "emailedCredits"?: Date;
    "emailedHeavyBuyer"?: Date;
    "emailedStagnant"?: Date;
    "emailedAbandonedCheckout"?: Date;
    "emailedCreditReminder"?: Date;
    "emailedCloudcellarReminder"?: Date;
    "unsubCampaignTitle"?: string;
    "unsubCampaignId"?: string;
    "unsubReason"?: string;
    "unsubTime"?: Date;
    "verifyStatus"?: string;
    "verifyDetail"?: string;
}
export interface NhUserModel {
    "acquisitionCost"?: number;
    "cacheAchievementPoints"?: number;
    "dotmailerId"?: number;
    "userName"?: string;
    "lastOrder"?: Date;
    "profileImageUrl"?: string;
    "isPrivate"?: boolean;
    "referredByUserId"?: string;
    "defaultAddressId"?: string;
    "defaultPaymentId"?: string;
    "signupDate"?: Date;
    "lastLoginDate"?: Date;
    "lastPurchaseDate"?: Date;
    "firstPurchaseDate"?: Date;
    "outreachDate"?: Date;
    "sessionId"?: string;
    "password"?: string;
    "facebookAccessToken"?: string;
    "facebookUserId"?: number;
    "referralString"?: string;
    "clientIpAddress"?: string;
    "is21"?: boolean;
    "referralGroup"?: GroupItemEntity;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
    "referralCloudcellarName"?: string;
    "referralDomain"?: string;
    "userGuid"?: string;
    "email"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "profileUrl"?: string;
    "birthday"?: Date;
    "isTestAccount"?: boolean;
}
export interface NhWordGamePrize {
    "prize"?: string;
    "sku"?: string;
    "numRemaining"?: number;
    "canClaim"?: boolean;
    "displayDesc"?: string;
    "bottleImgCsv"?: string;
    "labelImgCsv"?: string;
    "displayName"?: string;
    "bottleImg"?: Array<string>;
    "labelImg"?: Array<string>;
}
export interface OfferCheckoutModel {
    "offerGuid"?: string;
    "offerSef"?: string;
    "bottlesQty"?: number;
    "wineIds"?: Array<string>;
    "revealDate"?: Date;
    "userGuid": string;
    "creditCardId": string;
    "shippingAddressId": string;
    "promoCode": Array<CheckoutPromoCodeModel>;
    "appId"?: string;
    "useAccountCredit"?: boolean;
    "result"?: UpgradeOrderResult;
    "noAuthAddress"?: NhAddressModel;
    "validationWarnings"?: Array<ValidationResult>;
    "validationErrors"?: Array<ValidationResult>;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
}
export interface OfferDetailModel {
    "url"?: string;
    "title"?: string;
    "subtitle"?: string;
    "offerImgCsv"?: string;
    "offerImg"?: Array<string>;
    "minPrice"?: number;
    "maxPrice"?: number;
    "offerItemName"?: string;
    "offerItemNamePlural"?: string;
    "minQtyAllow"?: number;
    "maxQtyAllow"?: number;
    "pricePerBottle"?: number;
    "bottlesRemaining"?: number;
    "offerTotal"?: number;
    "offerStatus"?: number;
    "offerGuid"?: string;
    "sellerGuid"?: string;
    "buyText"?: string;
    "states"?: Array<string>;
    "expiryDate"?: Date;
    "startDate"?: Date;
    "isFeatured"?: boolean;
    "isDirectShip"?: boolean;
    "wineryName"?: string;
    "wineryNotes"?: string;
    "wineryAbout"?: string;
    "metaDescription"?: string;
    "metaKeywords"?: string;
    "metaTitle"?: string;
    "numberOfUpgradesGuaranteed"?: Array<number>;
    "wineryImages"?: Array<string>;
}
export interface OfferV2AdminManifest {
    "manifestId"?: string;
    "name"?: string;
    "price"?: number;
    "sku"?: string;
    "isSuspended"?: boolean;
    "winnerGuid"?: string;
    "xWinnerEmail"?: string;
    "qtyInStock"?: number;
    "shippingCaseGuid"?: string;
    "paymentStatus"?: string;
    "orderStatus"?: string;
}
export interface OfferV2Entity {
    "offerContent"?: string;
    "shippingAvailability"?: string;
    "dateCreated"?: Date;
    "isApproved"?: boolean;
    "isSideDeal"?: boolean;
    "priority"?: number;
    "enableAutoBuy"?: boolean;
    "enablePromo"?: boolean;
    "enableCredit"?: boolean;
    "enableSpinAgain"?: boolean;
    "enableTax"?: boolean;
    "adminNotes"?: string;
    "capturedDate"?: Date;
    "offerTax"?: number;
    "offerPq"?: number;
    "offerDisc"?: number;
    "offerCred"?: number;
    "offerUniq"?: number;
    "winery"?: WineryModel;
    "itemGroupsFlat"?: Array<NhItemGroupViewEntity>;
    "url"?: string;
    "title"?: string;
    "subtitle"?: string;
    "offerImgCsv"?: string;
    "offerImg"?: Array<string>;
    "minPrice"?: number;
    "maxPrice"?: number;
    "offerItemName"?: string;
    "offerItemNamePlural"?: string;
    "minQtyAllow"?: number;
    "maxQtyAllow"?: number;
    "pricePerBottle"?: number;
    "bottlesRemaining"?: number;
    "offerTotal"?: number;
    "offerStatus"?: number;
    "offerGuid"?: string;
    "sellerGuid"?: string;
    "buyText"?: string;
    "states"?: Array<string>;
    "expiryDate"?: Date;
    "startDate"?: Date;
    "isFeatured"?: boolean;
    "isDirectShip"?: boolean;
    "wineryName"?: string;
    "wineryNotes"?: string;
    "wineryAbout"?: string;
    "metaDescription"?: string;
    "metaKeywords"?: string;
    "metaTitle"?: string;
    "numberOfUpgradesGuaranteed"?: Array<number>;
    "wineryImages"?: Array<string>;
}
export interface OfferV2ItemEntity {
    "itemId"?: string;
    "parentItemGroup"?: NhItemGroupEntity;
    "sku"?: SkuEntity;
    "qty"?: number;
}
export interface OfferV2ManifestEntity {
    "manifestId"?: string;
    "skuEntity"?: SkuEntity;
    "retailPrice"?: number;
    "taxableValue"?: number;
    "estimatedTaxAllocated"?: number;
    "shippingCaseGuid"?: string;
    "isSuspended"?: boolean;
    "itemGroupId"?: string;
    "pickIndex"?: number;
    "replacementForManifestGuid"?: string;
    "creditedForGuid"?: string;
}
export interface OrderGeniusState {
    "cancelBy"?: Date;
    "orderEntity"?: Array<NhOrderModel>;
}
export interface OrderModel {
    "bottles"?: Array<NhItemGroupViewEntity>;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
    "orderGuid"?: string;
    "totalQuantity"?: number;
    "totalPrice"?: number;
    "discount"?: number;
    "creditDiscount"?: number;
    "tax"?: number;
    "timestamp"?: Date;
    "orderStatus"?: string;
    "paymentStatus"?: string;
    "offerId"?: string;
    "offerTitle"?: string;
    "offerSef"?: string;
    "userNthOrder"?: number;
    "unitPrice"?: number;
}
export interface OrderModelExtended {
    "billing"?: ApiBillingModelWithAuthnet;
    "skuList"?: string;
    "bottleList"?: string;
    "paymentAuthCode"?: string;
    "paymentAuthDate"?: Date;
    "transactionId"?: string;
    "promoCode"?: string;
    "bottles"?: Array<NhItemGroupViewEntity>;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
    "orderGuid"?: string;
    "totalQuantity"?: number;
    "totalPrice"?: number;
    "discount"?: number;
    "creditDiscount"?: number;
    "tax"?: number;
    "timestamp"?: Date;
    "orderStatus"?: string;
    "paymentStatus"?: string;
    "offerId"?: string;
    "offerTitle"?: string;
    "offerSef"?: string;
    "userNthOrder"?: number;
    "unitPrice"?: number;
}
export interface OrderViewModel {
    "orderId"?: string;
    "offerSef"?: string;
    "offerTitle"?: string;
    "date"?: Date;
    "credit"?: number;
    "discount"?: number;
    "subtotal"?: number;
    "tax"?: number;
    "amtCharged"?: number;
    "status"?: string;
    "paymentStatus"?: string;
    "unitPrice"?: number;
    "isRevealed"?: boolean;
    "lineItems"?: Array<NhItemGroupViewEntity>;
    "address"?: NhAddressModel;
}
export interface OrdersOverviewModel {
    "orders"?: Array<OrderViewModel>;
    "shipments"?: Array<OrderViewModel>;
}
export interface OverallPlan {
    "canFree"?: Array<SkuPlan>;
    "userPlan"?: {
        [key: string]: number;
    };
    "inactiveUserPlan"?: {
        [key: string]: number;
    };
}
export interface Page {
    "id"?: string;
    "section"?: string;
    "url"?: string;
    "title"?: string;
    "main"?: string;
    "topImage"?: string;
    "sideImage"?: string;
    "sideText"?: string;
    "sideLinkUrl"?: string;
    "sideLinkText"?: string;
    "fileAttachUrl"?: string;
    "fileAttachText"?: string;
    "publishDate"?: Date;
    "expiryDate"?: Date;
}
export interface PasswordChangeModel {
    "oldPassword": string;
    "newPassword": string;
    "confirmNewPassword": string;
}
export interface PasswordResetModel {
    "email": string;
    "resetToken"?: string;
    "newPassword"?: string;
}
export interface PaymentWithAddressModel {
    "payment"?: ApiBillingModelWithAuthnet;
    "address"?: NhAddressModel;
}
export interface PgCloudCellarRecord {
    "isCounted"?: boolean;
    "varietal"?: string;
    "region"?: string;
    "appel"?: string;
    "states"?: Array<string>;
    "itemDetailGuid"?: string;
    "sku"?: string;
    "urlKey"?: string;
    "retailPrice"?: number;
    "qtyInStock"?: number;
    "isManual"?: boolean;
    "eta"?: Date;
    "isClearance"?: boolean;
    "isSuspended"?: boolean;
    "shipIncentive"?: number;
    "manifestGuid"?: string;
    "taxValue"?: number;
    "taxAllocated"?: number;
    "orderGuid"?: string;
    "winnerGuid"?: string;
    "orderDate"?: Date;
    "orderStatus"?: string;
    "paymentStatus"?: string;
    "offerGuid"?: string;
    "offerSef"?: string;
    "wineDrinkEnd"?: Date;
    "isAutographed"?: boolean;
    "isWine"?: boolean;
    "isBeer"?: boolean;
    "isLargeFormat"?: boolean;
    "shipCase"?: string;
    "shipMethod"?: string;
    "shipPrice"?: number;
    "tracking"?: string;
    "shipDate"?: Date;
    "itemGroupId"?: string;
    "displayDesc"?: string;
    "bottleImgCsv"?: string;
    "labelImgCsv"?: string;
    "displayName"?: string;
    "bottleImg"?: Array<string>;
    "labelImg"?: Array<string>;
}
export interface PhotoSize {
    "width"?: number;
    "height"?: number;
    "fileId"?: string;
    "fileSize"?: number;
    "filePath"?: string;
}
export interface PrizeModel {
    "title"?: string;
    "image"?: string;
    "details"?: string;
}
export interface PurchaseOrder {
    "id"?: string;
    "purchaseOrderDetailList"?: Array<PurchaseOrderDetail>;
}
export interface PurchaseOrderDetail {
    "cost"?: number;
    "costSpecified"?: boolean;
    "dueDate"?: string;
    "id"?: number;
    "idSpecified"?: boolean;
    "itemId"?: string;
    "orderDate"?: string;
    "orderQuantity"?: number;
    "orderQuantitySpecified"?: boolean;
    "per"?: number;
    "perSpecified"?: boolean;
    "receivedDate"?: string;
    "receivedQuantity"?: number;
    "receivedQuantitySpecified"?: boolean;
    "vendorId"?: number;
    "vendorIdSpecified"?: boolean;
}
export interface PurchaseOrderItem {
    "sku"?: string;
    "cogs"?: number;
    "orderQty"?: number;
}
export interface PurchaseOrderModel {
    "items"?: Array<PurchaseOrderItem>;
    "deliveryDate"?: Date;
    "deliveryCost"?: number;
    "cplId"?: string;
    "offerGuid"?: string;
    "approvedBy"?: string;
    "poGuid"?: string;
}
export interface SessionEventModel {
    "eventMd5"?: string;
    "eventString"?: string;
}
export interface SessionModel {
    "sessionId"?: string;
    "sessionExpiration"?: Date;
    "sessionLastPage"?: string;
    "sessionFbrLhState"?: string;
    "sessionUserGuid"?: string;
    "sessionUserName"?: string;
    "sessionUserFname"?: string;
    "sessionUserImageurl"?: string;
    "sessionUserBalance"?: number;
    "sessionUserUrlProfile"?: string;
    "sessionUserReferralCloudName"?: string;
    "sessionLastQty"?: number;
    "sessionIsBeta"?: number;
    "sessionEmail"?: string;
    "sessionUserAgent"?: string;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
}
export interface SessionTrackModel {
    "sessionTrackId"?: string;
    "trackEvent"?: SessionEventModel;
    "trackDt"?: Date;
    "trackExtra"?: string;
}
export interface ShipOrderResult {
    "cplId"?: string;
    "shippingCaseGuid"?: string;
    "bottles"?: Array<OfferV2ManifestEntity>;
    "totalTax"?: number;
    "taxAlreadyPaid"?: number;
    "taxChargedOrRefunded"?: number;
    "protectShipmentValue"?: number;
    "shipMethods"?: Array<ShippingMethodModel>;
    "iceAvailable"?: boolean;
    "icePrice"?: number;
    "promotionsUsed"?: Array<CheckoutPromoCodeModel>;
    "promoValue"?: number;
    "accountBalanceUsed"?: number;
    "accountBalanceAvailable"?: number;
    "taxComputed"?: TaxInfo;
    "totalPrice"?: number;
    "subtotal"?: number;
}
export interface ShippingMethodModel {
    "name"?: string;
    "description"?: string;
    "price"?: number;
    "guaranteedBy"?: Date;
    "value"?: ShippingMethodModelValueEnum;
}
export declare type ShippingMethodModelValueEnum = "0" | "1" | "2";
export interface ShippingModel {
    "address"?: NhAddressModel;
    "shippingPrice"?: number;
    "tax"?: number;
    "iceGelPackPrice"?: number;
    "cplOrderId"?: string;
    "shippingCaseGuid"?: string;
    "shippingMethod"?: string;
    "shippingStatus"?: number;
    "trackingNumber"?: string;
    "date"?: Date;
    "dateProcessed"?: Date;
    "dateDelivered"?: Date;
    "shippedManifests"?: Array<OfferV2ManifestEntity>;
    "payment"?: ApiBillingModelWithAuthnet;
    "giftMessage"?: string;
    "qty"?: number;
    "transactionId"?: string;
    "isAdminHold"?: boolean;
    "cohortSignup"?: Date;
    "cohortUserMonth"?: number;
    "monthSinceFirstPurchase"?: number;
}
export interface SkuEntity {
    "itemDetail"?: ItemDetailEntity;
    "sku"?: string;
    "suggestedPrice"?: number;
    "sellerId"?: string;
    "isAutographed"?: boolean;
    "isDeprecated"?: boolean;
    "isTaxable"?: boolean;
    "isCountedInShipment"?: boolean;
    "isPalletProgram"?: boolean;
    "drinkByDate"?: Date;
    "cacheLatestOrderDate"?: Date;
    "cacheLastRestocked"?: Date;
    "cacheLastUpdated"?: Date;
    "cacheNextDelivery"?: Date;
    "cacheNumAvailable"?: number;
    "scrambleLetters"?: string;
    "scrambleQtyAllowed"?: number;
    "allowedStatesCsv"?: string;
    "comment"?: string;
    "cogsUnit"?: number;
    "allowedStates"?: Array<string>;
}
export interface SkuPlan {
    "sku"?: string;
    "usersNeeded"?: Array<UserPlan>;
}
export interface SkuSale {
    "sku"?: string;
    "price"?: number;
    "name"?: string;
    "varietal"?: string;
    "qtyInOffer"?: number;
    "qtySold"?: number;
    "qtyInStock"?: number;
}
export interface SkuSaleItemModel {
    "offerId"?: number;
    "qtySold"?: number;
    "retailPrice"?: number;
    "wineId"?: number;
    "wineName"?: string;
    "wineSku"?: string;
}
export interface SkuSwapModel {
    "eligibleSkuSwapFrom"?: Array<string>;
    "eligibleSkuSwapTo"?: Array<string>;
    "selectedSkuSwapFrom"?: string;
    "selectedSkuSwapTo"?: Array<string>;
    "eligibleOfferSefToSwapIn"?: Array<string>;
    "selectedOfferSefToSwap"?: string;
    "credit"?: boolean;
    "creditFullValue"?: boolean;
    "qtyToSwap"?: number;
    "swapReason"?: string;
    "sendEmail"?: boolean;
    "manifestsAffected"?: Array<ManifestSwapAction>;
}
export interface SkuViewEntity {
    "cacheNumOwed"?: number;
    "cacheNumShipped"?: number;
    "cacheFriendlyName"?: string;
    "cacheSurplus"?: number;
    "varietal"?: string;
    "region"?: string;
    "itemDetailGuid"?: string;
    "sku"?: string;
    "suggestedPrice"?: number;
    "sellerId"?: string;
    "isAutographed"?: boolean;
    "isDeprecated"?: boolean;
    "isTaxable"?: boolean;
    "isCountedInShipment"?: boolean;
    "isPalletProgram"?: boolean;
    "drinkByDate"?: Date;
    "cacheLatestOrderDate"?: Date;
    "cacheLastRestocked"?: Date;
    "cacheLastUpdated"?: Date;
    "cacheNextDelivery"?: Date;
    "cacheNumAvailable"?: number;
    "scrambleLetters"?: string;
    "scrambleQtyAllowed"?: number;
    "allowedStatesCsv"?: string;
    "comment"?: string;
    "cogsUnit"?: number;
    "allowedStates"?: Array<string>;
}
export interface Sticker {
    "width"?: string;
    "height"?: string;
    "thumb"?: PhotoSize;
    "emoji"?: string;
    "fileId"?: string;
    "fileSize"?: number;
    "filePath"?: string;
}
export interface SupportTicket {
    "id"?: string;
    "subject"?: string;
    "description"?: string;
    "status"?: string;
    "priority"?: string;
    "requesterName"?: string;
    "requesterEmail"?: string;
    "zendeskId"?: string;
    "zendeskUrl"?: string;
    "systemResponse"?: string;
}
export interface SurplusItemDateTime {
    "key"?: Date;
    "surplusQty"?: number;
    "surplusValue"?: number;
    "deficitQty"?: number;
    "deficitValue"?: number;
    "numAvailable"?: number;
    "numOwed"?: number;
}
export interface SurplusItemString {
    "key"?: string;
    "surplusQty"?: number;
    "surplusValue"?: number;
    "deficitQty"?: number;
    "deficitValue"?: number;
    "numAvailable"?: number;
    "numOwed"?: number;
}
export interface TaxInfo {
    "taxRate"?: number;
    "regionName"?: string;
    "orderTaxAmt"?: number;
}
export interface TimeSeriesCohort {
    "data"?: {
        [key: string]: Cohort;
    };
    "totalPq"?: number;
    "totalOrder"?: number;
    "totalQty"?: number;
    "timeToFirstPurchase"?: number;
}
export interface TimeSeriesCohortSummary {
    "cohorts"?: {
        [key: string]: TimeSeriesCohort;
    };
    "avgPq"?: number;
    "avgOrder"?: number;
    "avgQty"?: number;
    "sumByKey"?: TimeSeriesCohort;
}
export interface TimeSeriesReport {
    "entityGuid"?: string;
    "begin"?: Date;
    "end"?: Date;
    "reportDate"?: Date;
    "description"?: string;
}
export interface TupleStringInt32 {
    "item1"?: string;
    "item2"?: number;
}
export interface Update {
    "updateId"?: number;
    "message"?: Message;
    "editedMessage"?: Message;
    "inlineQuery"?: InlineQuery;
    "chosenInlineResult"?: ChosenInlineResult;
    "callbackQuery"?: CallbackQuery;
}
export interface UpdateStockResult {
    "success"?: Array<string>;
    "fail"?: Array<string>;
}
export interface UpgradeOrderResult {
    "bottles"?: Array<NhItemGroupViewEntity>;
    "orderGuid"?: string;
    "orderUserNth"?: number;
    "promotionsUsed"?: Array<CheckoutPromoCodeModel>;
    "promoValue"?: number;
    "accountBalanceUsed"?: number;
    "accountBalanceAvailable"?: number;
    "taxComputed"?: TaxInfo;
    "totalPrice"?: number;
    "subtotal"?: number;
}
export interface User {
    "id"?: number;
    "firstName"?: string;
    "lastName"?: string;
    "username"?: string;
}
export interface UserAuthModel {
    "sessionId"?: string;
    "password"?: string;
    "facebookAccessToken"?: string;
    "facebookUserId"?: number;
    "referralString"?: string;
    "clientIpAddress"?: string;
    "is21"?: boolean;
    "referralGroup"?: GroupItemEntity;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
    "referralCloudcellarName"?: string;
    "referralDomain"?: string;
    "userGuid"?: string;
    "email"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "profileUrl"?: string;
    "birthday"?: Date;
    "isTestAccount"?: boolean;
}
export interface UserAuthResultModel {
    "emailOk"?: boolean;
    "isAuthenticated"?: boolean;
    "hasEmail"?: boolean;
    "hasPassword"?: boolean;
    "hasFbToken"?: boolean;
    "session"?: SessionModel;
    "user"?: UserAuthModel;
}
export interface UserLifetimeViewRecord {
    "signupMth"?: Date;
    "latestOrder"?: Date;
    "numCustomers"?: number;
    "numUsersActive"?: number;
    "avgOrderCount"?: number;
    "totalOrderCount"?: number;
    "avgTotalOrderValuePerUser"?: number;
    "totalOrderValue"?: number;
    "sum30DayOrderValue"?: number;
    "sum30DayQty"?: number;
    "sum30DayCreditUsed"?: number;
    "sum30DaySpentWithTaxAndDiscount"?: number;
    "sum30DayDiscount"?: number;
    "sum30DayTax"?: number;
    "avg30DayOrderValue"?: number;
    "avg30DayQty"?: number;
    "avg30DayCreditUsed"?: number;
    "avg30DaySpentWithTaxAndDiscount"?: number;
    "avg30DayDiscount"?: number;
    "avg30DayTax"?: number;
    "sum60DayOrderValue"?: number;
    "sum60DayQty"?: number;
    "sum60DayCreditUsed"?: number;
    "sum60DaySpentWithTaxAndDiscount"?: number;
    "sum60DayDiscount"?: number;
    "sum60DayTax"?: number;
    "avg60DayOrderValue"?: number;
    "avg60DayQty"?: number;
    "avg60DayCreditUsed"?: number;
    "avg60DaySpentWithTaxAndDiscount"?: number;
    "avg60DayDiscount"?: number;
    "avg60DayTax"?: number;
    "sum90DayOrderValue"?: number;
    "sum90DayQty"?: number;
    "sum90DayCreditUsed"?: number;
    "sum90DaySpentWithTaxAndDiscount"?: number;
    "sum90DayDiscount"?: number;
    "sum90DayTax"?: number;
    "avg90DayOrderValue"?: number;
    "avg90DayQty"?: number;
    "avg90DayCreditUsed"?: number;
    "avg90DaySpentWithTaxAndDiscount"?: number;
    "avg90DayDiscount"?: number;
    "avg90DayTax"?: number;
    "sum365DayOrderValue"?: number;
    "sum365DayQty"?: number;
    "sum365DayCreditUsed"?: number;
    "sum365DaySpentWithTaxAndDiscount"?: number;
    "sum365DayDiscount"?: number;
    "sum365DayTax"?: number;
    "avg365DayOrderValue"?: number;
    "avg365DayQty"?: number;
    "avg365DayCreditUsed"?: number;
    "avg365DaySpentWithTaxAndDiscount"?: number;
    "avg365DayDiscount"?: number;
    "avg365DayTax"?: number;
    "groupUtmCampaign"?: string;
    "groupUtmSource"?: string;
    "groupUtmMedium"?: string;
}
export interface UserModelExtended {
    "userName"?: string;
    "lastOrder"?: Date;
    "profileImageUrl"?: string;
    "isPrivate"?: boolean;
    "referredByUserId"?: string;
    "defaultAddressId"?: string;
    "defaultPaymentId"?: string;
    "signupDate"?: Date;
    "lastLoginDate"?: Date;
    "lastPurchaseDate"?: Date;
    "firstPurchaseDate"?: Date;
    "outreachDate"?: Date;
    "sessionId"?: string;
    "password"?: string;
    "facebookAccessToken"?: string;
    "facebookUserId"?: number;
    "referralString"?: string;
    "clientIpAddress"?: string;
    "is21"?: boolean;
    "referralGroup"?: GroupItemEntity;
    "sessionUtmSource"?: string;
    "sessionUtmMedium"?: string;
    "sessionUtmCampaign"?: string;
    "referralCloudcellarName"?: string;
    "referralDomain"?: string;
    "userGuid"?: string;
    "email"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "profileUrl"?: string;
    "birthday"?: Date;
    "isTestAccount"?: boolean;
}
export interface UserPlan {
    "userEmail"?: string;
    "userGuid"?: string;
    "tryToShip"?: Array<TupleStringInt32>;
}
export interface UserReferralModel {
    "userGuid"?: string;
    "email"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "signupDate"?: Date;
    "firstOrderGuid"?: string;
    "firstOrderDate"?: Date;
    "firstOrderStatus"?: string;
    "referralCreditGuid"?: string;
}
export interface UserSummaryViewRecord {
    "userEmail"?: string;
    "userSignupDt"?: Date;
    "userLoginDt"?: Date;
    "userFirstPurchaseDate"?: Date;
    "userLastPurchaseDate"?: Date;
    "orderCount"?: number;
    "lifeOrderValue"?: number;
    "lifeQty"?: number;
    "lifeCreditUsed"?: number;
    "lifeSpentWithTaxAndDiscount"?: number;
    "lifeDiscount"?: number;
    "lifeTax"?: number;
    "x30DayOrderValue"?: number;
    "x30DayQty"?: number;
    "x30DayCreditUsed"?: number;
    "x30DaySpentWithTaxAndDiscount"?: number;
    "x30DayDiscount"?: number;
    "x30DayTax"?: number;
    "x60DayOrderValue"?: number;
    "x60DayQty"?: number;
    "x60DayCreditUsed"?: number;
    "x60DaySpentWithTaxAndDiscount"?: number;
    "x60DayDiscount"?: number;
    "x60DayTax"?: number;
    "x90DayOrderValue"?: number;
    "x90DayQty"?: number;
    "x90DayCreditUsed"?: number;
    "x90DaySpentWithTaxAndDiscount"?: number;
    "x90DayDiscount"?: number;
    "x90DayTax"?: number;
    "x365DayOrderValue"?: number;
    "x365DayQty"?: number;
    "x365DayCreditUsed"?: number;
    "x365DaySpentWithTaxAndDiscount"?: number;
    "x365DayDiscount"?: number;
    "x365DayTax"?: number;
    "userUtmCampaign"?: string;
    "userUtmSource"?: string;
    "userUtmMedium"?: string;
    "lifeShipmentCount"?: number;
    "lifeShipPrice"?: number;
    "lifeShipTax"?: number;
    "lastShipDate"?: Date;
    "totalArv"?: number;
    "totalUnshippedValue"?: number;
    "totalShippedValue"?: number;
    "countUnshipped"?: number;
}
export interface ValidationResult {
    "memberNames"?: Array<string>;
    "errorMessage"?: string;
}
export interface Venue {
    "location"?: Location;
    "title"?: string;
    "address"?: string;
    "foursquareId"?: string;
}
export interface Video {
    "width"?: string;
    "height"?: string;
    "duration"?: number;
    "thumb"?: PhotoSize;
    "mimeType"?: string;
    "fileId"?: string;
    "fileSize"?: number;
    "filePath"?: string;
}
export interface Voice {
    "duration"?: number;
    "mimeType"?: string;
    "fileId"?: string;
    "fileSize"?: number;
    "filePath"?: string;
}
export interface WineGenius {
    "name"?: string;
    "image"?: string;
    "desc"?: string;
    "overallSweet"?: number;
    "overallSour"?: number;
    "overallSalty"?: number;
    "overallBitter"?: number;
    "overallTexture"?: number;
}
export interface WineGeniusData {
    "coffeeBlack"?: boolean;
    "coffeeCream"?: boolean;
    "coffeeCreamSugar"?: boolean;
    "coffeeFrappuccino"?: boolean;
    "saltyPopcorn"?: boolean;
    "charcuterie"?: boolean;
    "applesAndPeanutButter"?: boolean;
    "fruitSmoothie"?: boolean;
    "teriyaki"?: boolean;
    "mushroom"?: boolean;
    "risotto"?: boolean;
    "pastaWithArugula"?: boolean;
    "lemonSorbet"?: boolean;
    "caramelIceCream"?: boolean;
    "darkChocolateMousse"?: boolean;
    "olives"?: boolean;
    "level"?: string;
    "redWhitePosition"?: number;
    "redMin"?: string;
    "redMax"?: string;
    "whiteMin"?: string;
    "whiteMax"?: string;
    "bottlesPerWeek"?: number;
    "sparkling"?: boolean;
    "largeFormat"?: boolean;
    "rare"?: boolean;
    "autographed"?: boolean;
    "highValue"?: boolean;
    "smallProduction"?: boolean;
    "cult"?: boolean;
    "international"?: boolean;
    "firstTrait"?: string;
    "secondTrait"?: string;
    "lastTrait"?: string;
    "budget"?: number;
    "paymentGuid"?: string;
    "surveyDate"?: Date;
    "traits"?: Array<TupleStringInt32>;
    "genius"?: WineGenius;
    "overallSweet"?: number;
    "overallSour"?: number;
    "overallSalty"?: number;
    "overallBitter"?: number;
    "overallTexture"?: number;
}
export interface WineGeniusExclusionItem {
    "userGuid"?: string;
    "email"?: string;
}
export interface WineGeniusMessage {
    "userGuid"?: string;
    "from"?: string;
    "message"?: string;
    "messageDate"?: Date;
}
export interface WineGeniusVacation {
    "dateSet"?: Date;
    "suspendOn"?: Date;
    "resumeOn"?: Date;
    "vacationGuid"?: string;
}
export interface WineryModel {
    "winerySef": string;
    "wineryAddress": string;
    "wineryCity": string;
    "wineryFax": string;
    "wineryZip": string;
    "wineryCountry": string;
    "wineryWebsite": string;
    "wineryOwners": string;
    "wineryWinemakers": string;
    "wineryArea": string;
    "wineryTourInfo": string;
    "wineryHours": string;
    "wineryDescription": string;
    "wineryLogo": string;
    "wineryMainImage": string;
    "wineryName": string;
    "wineryPhone": string;
    "wineryEmail": string;
    "wineryState": string;
    "visible"?: boolean;
}
export interface WordGame {
    "letters"?: Array<string>;
    "prizes"?: Array<NhWordGamePrize>;
}
/**
 * AccessLogApi - fetch parameter creator
 */
export declare const AccessLogApiFetchParamCreator: {
    accessLogLog(params: {
        "lead": AccessLogModel;
    }, options?: any): FetchArgs;
    accessLogPostLead(params: {
        "lead": SessionTrackModel;
    }, options?: any): FetchArgs;
};
/**
 * AccessLogApi - functional programming interface
 */
export declare const AccessLogApiFp: {
    accessLogLog(params: {
        "lead": AccessLogModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    accessLogPostLead(params: {
        "lead": SessionTrackModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * AccessLogApi - object-oriented interface
 */
export declare class AccessLogApi extends BaseAPI {
    /**
     * @param lead
     */
    accessLogLog(params: {
        "lead": AccessLogModel;
    }, options?: any): Promise<any>;
    /**
     * @param lead
     */
    accessLogPostLead(params: {
        "lead": SessionTrackModel;
    }, options?: any): Promise<any>;
}
/**
 * AccessLogApi - factory interface
 */
export declare const AccessLogApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    accessLogLog(params: {
        "lead": AccessLogModel;
    }, options?: any): Promise<any>;
    accessLogPostLead(params: {
        "lead": SessionTrackModel;
    }, options?: any): Promise<any>;
};
/**
 * AchievementApi - fetch parameter creator
 */
export declare const AchievementApiFetchParamCreator: {
    achievementGetAchievementForUser(params: {
        "userId": string;
    }, options?: any): FetchArgs;
    achievementGetLeaderboardForUser(params: {
        "userId": string;
    }, options?: any): FetchArgs;
};
/**
 * AchievementApi - functional programming interface
 */
export declare const AchievementApiFp: {
    achievementGetAchievementForUser(params: {
        "userId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AchievementModel[]>;
    achievementGetLeaderboardForUser(params: {
        "userId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LeaderboardModel>;
};
/**
 * AchievementApi - object-oriented interface
 */
export declare class AchievementApi extends BaseAPI {
    /**
     * @param userId
     */
    achievementGetAchievementForUser(params: {
        "userId": string;
    }, options?: any): Promise<AchievementModel[]>;
    /**
     * @param userId
     */
    achievementGetLeaderboardForUser(params: {
        "userId": string;
    }, options?: any): Promise<LeaderboardModel>;
}
/**
 * AchievementApi - factory interface
 */
export declare const AchievementApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    achievementGetAchievementForUser(params: {
        "userId": string;
    }, options?: any): Promise<AchievementModel[]>;
    achievementGetLeaderboardForUser(params: {
        "userId": string;
    }, options?: any): Promise<LeaderboardModel>;
};
/**
 * AddressApi - fetch parameter creator
 */
export declare const AddressApiFetchParamCreator: {
    addressSessionDeleteAddress(params: {
        "sessionId": string;
        "addressId": string;
    }, options?: any): FetchArgs;
    addressSessionGetAddressDictionary(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    addressSessionGetAddressList(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    addressSessionGetAddressList3(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    addressSessionPostAddress(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): FetchArgs;
    addressSessionPostAddress3(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): FetchArgs;
    addressSessionPutAddress(params: {
        "sessionId": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): FetchArgs;
    addressUserDeleteAddress(params: {
        "userGuid": string;
        "addressId": string;
    }, options?: any): FetchArgs;
    addressUserGetAddressDictionary(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    addressUserPostAddress(params: {
        "userGuid": string;
        "address": NhAddressModel;
    }, options?: any): FetchArgs;
    addressUserPutAddress(params: {
        "userGuid": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): FetchArgs;
};
/**
 * AddressApi - functional programming interface
 */
export declare const AddressApiFp: {
    addressSessionDeleteAddress(params: {
        "sessionId": string;
        "addressId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    addressSessionGetAddressDictionary(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<{
        [key: string]: NhAddressModel;
    }>;
    addressSessionGetAddressList(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhAddressModel[]>;
    addressSessionGetAddressList3(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListNhAddressModel>;
    addressSessionPostAddress(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AddressModelResponse>;
    addressSessionPostAddress3(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultAddressModelResponse>;
    addressSessionPutAddress(params: {
        "sessionId": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AddressModelResponse>;
    addressUserDeleteAddress(params: {
        "userGuid": string;
        "addressId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    addressUserGetAddressDictionary(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<{
        [key: string]: NhAddressModel;
    }>;
    addressUserPostAddress(params: {
        "userGuid": string;
        "address": NhAddressModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    addressUserPutAddress(params: {
        "userGuid": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * AddressApi - object-oriented interface
 */
export declare class AddressApi extends BaseAPI {
    /**
     * Deletes a user&#39;s stored address.
     * @param sessionId
     * @param addressId Address id to delete.
     */
    addressSessionDeleteAddress(params: {
        "sessionId": string;
        "addressId": string;
    }, options?: any): Promise<any>;
    /**
     * Gets the addresses for a specified user.
     * @param sessionId sessionId of the user to get addresses from.
     */
    addressSessionGetAddressDictionary(params: {
        "sessionId": string;
    }, options?: any): Promise<{
        [key: string]: NhAddressModel;
    }>;
    /**
     * Gets the addresses for a specified user.
     * @param sessionId sessionId of the user to get addresses from.
     */
    addressSessionGetAddressList(params: {
        "sessionId": string;
    }, options?: any): Promise<NhAddressModel[]>;
    /**
     * Gets the addresses for a specified user.
     * @param sessionId sessionId of the user to get addresses from.
     */
    addressSessionGetAddressList3(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultListNhAddressModel>;
    /**
     * Adds an address to a user&#39;s account
     * @param sessionId User id to add the address to
     * @param address Address data to add (you can leave the &#39;id&#39; field here empty/zero because it&#39;s auto-generated by  the database)
     */
    addressSessionPostAddress(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<AddressModelResponse>;
    /**
     * Adds an address to a user&#39;s account
     * @param sessionId User id to add the address to
     * @param address Address data to add (you can leave the &#39;id&#39; field here empty/zero because it&#39;s auto-generated by  the database)
     */
    addressSessionPostAddress3(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<ApiResultAddressModelResponse>;
    /**
     * Updates a user&#39;s stored address.
     * @param sessionId Session id that owns the address
     * @param addressId specifies the address Id to update
     * @param address Address to update, with updated data.
     */
    addressSessionPutAddress(params: {
        "sessionId": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<AddressModelResponse>;
    /**
     * Deletes a user&#39;s stored address.
     * @param userGuid Id of the user to delete the address from (for verification against the owner of the address Id,  specified in the request body &#39;address&#39;)
     * @param addressId Address id to delete.
     */
    addressUserDeleteAddress(params: {
        "userGuid": string;
        "addressId": string;
    }, options?: any): Promise<any>;
    /**
     * Gets the addresses for a specified user.
     * @param userGuid Id of the user to get addresses from.
     */
    addressUserGetAddressDictionary(params: {
        "userGuid": string;
    }, options?: any): Promise<{
        [key: string]: NhAddressModel;
    }>;
    /**
     * Adds an address to a user&#39;s account
     * @param userGuid User id to add the address to
     * @param address Address data to add (you can leave the &#39;id&#39; field here empty/zero because it&#39;s auto-generated by  the database)
     */
    addressUserPostAddress(params: {
        "userGuid": string;
        "address": NhAddressModel;
    }, options?: any): Promise<any>;
    /**
     * Updates a user&#39;s stored address.
     * @param userGuid User id that owns the address
     * @param addressId specifies the address Id to update
     * @param address Address to update, with updated data.
     */
    addressUserPutAddress(params: {
        "userGuid": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<any>;
}
/**
 * AddressApi - factory interface
 */
export declare const AddressApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    addressSessionDeleteAddress(params: {
        "sessionId": string;
        "addressId": string;
    }, options?: any): Promise<any>;
    addressSessionGetAddressDictionary(params: {
        "sessionId": string;
    }, options?: any): Promise<{
        [key: string]: NhAddressModel;
    }>;
    addressSessionGetAddressList(params: {
        "sessionId": string;
    }, options?: any): Promise<NhAddressModel[]>;
    addressSessionGetAddressList3(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultListNhAddressModel>;
    addressSessionPostAddress(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<AddressModelResponse>;
    addressSessionPostAddress3(params: {
        "sessionId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<ApiResultAddressModelResponse>;
    addressSessionPutAddress(params: {
        "sessionId": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<AddressModelResponse>;
    addressUserDeleteAddress(params: {
        "userGuid": string;
        "addressId": string;
    }, options?: any): Promise<any>;
    addressUserGetAddressDictionary(params: {
        "userGuid": string;
    }, options?: any): Promise<{
        [key: string]: NhAddressModel;
    }>;
    addressUserPostAddress(params: {
        "userGuid": string;
        "address": NhAddressModel;
    }, options?: any): Promise<any>;
    addressUserPutAddress(params: {
        "userGuid": string;
        "addressId": string;
        "address": NhAddressModel;
    }, options?: any): Promise<any>;
};
/**
 * AdjustmentApi - fetch parameter creator
 */
export declare const AdjustmentApiFetchParamCreator: {
    adjustmentCreateAdjustmentForSku(params: {
        "model": NhAdjustment;
    }, options?: any): FetchArgs;
    adjustmentExecAdjustment(params: {
        "id": string;
    }, options?: any): FetchArgs;
};
/**
 * AdjustmentApi - functional programming interface
 */
export declare const AdjustmentApiFp: {
    adjustmentCreateAdjustmentForSku(params: {
        "model": NhAdjustment;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhAdjustment>;
    adjustmentExecAdjustment(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * AdjustmentApi - object-oriented interface
 */
export declare class AdjustmentApi extends BaseAPI {
    /**
     * @param model
     */
    adjustmentCreateAdjustmentForSku(params: {
        "model": NhAdjustment;
    }, options?: any): Promise<NhAdjustment>;
    /**
     * @param id
     */
    adjustmentExecAdjustment(params: {
        "id": string;
    }, options?: any): Promise<any>;
}
/**
 * AdjustmentApi - factory interface
 */
export declare const AdjustmentApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    adjustmentCreateAdjustmentForSku(params: {
        "model": NhAdjustment;
    }, options?: any): Promise<NhAdjustment>;
    adjustmentExecAdjustment(params: {
        "id": string;
    }, options?: any): Promise<any>;
};
/**
 * AdminCampaignApi - fetch parameter creator
 */
export declare const AdminCampaignApiFetchParamCreator: {
    adminCampaignExport(params: {
        "campaignId": number;
    }, options?: any): FetchArgs;
    adminCampaignPick(params: {
        "campaignId": number;
    }, options?: any): FetchArgs;
};
/**
 * AdminCampaignApi - functional programming interface
 */
export declare const AdminCampaignApiFp: {
    adminCampaignExport(params: {
        "campaignId": number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CampaignExportModel[]>;
    adminCampaignPick(params: {
        "campaignId": number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CampaignExportModel>;
};
/**
 * AdminCampaignApi - object-oriented interface
 */
export declare class AdminCampaignApi extends BaseAPI {
    /**
     * @param campaignId
     */
    adminCampaignExport(params: {
        "campaignId": number;
    }, options?: any): Promise<CampaignExportModel[]>;
    /**
     * @param campaignId
     */
    adminCampaignPick(params: {
        "campaignId": number;
    }, options?: any): Promise<CampaignExportModel>;
}
/**
 * AdminCampaignApi - factory interface
 */
export declare const AdminCampaignApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    adminCampaignExport(params: {
        "campaignId": number;
    }, options?: any): Promise<CampaignExportModel[]>;
    adminCampaignPick(params: {
        "campaignId": number;
    }, options?: any): Promise<CampaignExportModel>;
};
/**
 * AdminDeliveryApi - fetch parameter creator
 */
export declare const AdminDeliveryApiFetchParamCreator: {
    adminDeliveryCreateDelivery(params: {
        "model": AdminSkuDelivery;
    }, options?: any): FetchArgs;
    adminDeliveryListDeliveries(options?: any): FetchArgs;
};
/**
 * AdminDeliveryApi - functional programming interface
 */
export declare const AdminDeliveryApiFp: {
    adminDeliveryCreateDelivery(params: {
        "model": AdminSkuDelivery;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AdminSkuDelivery>;
    adminDeliveryListDeliveries(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhSkuDelivery[]>;
};
/**
 * AdminDeliveryApi - object-oriented interface
 */
export declare class AdminDeliveryApi extends BaseAPI {
    /**
     * @param model
     */
    adminDeliveryCreateDelivery(params: {
        "model": AdminSkuDelivery;
    }, options?: any): Promise<AdminSkuDelivery>;
    /**
     */
    adminDeliveryListDeliveries(options?: any): Promise<NhSkuDelivery[]>;
}
/**
 * AdminDeliveryApi - factory interface
 */
export declare const AdminDeliveryApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    adminDeliveryCreateDelivery(params: {
        "model": AdminSkuDelivery;
    }, options?: any): Promise<AdminSkuDelivery>;
    adminDeliveryListDeliveries(options?: any): Promise<NhSkuDelivery[]>;
};
/**
 * AdminOrderApi - fetch parameter creator
 */
export declare const AdminOrderApiFetchParamCreator: {
    adminOrderArFindMisallocations(params: {
        "fix"?: boolean;
        "orderGuid"?: string;
    }, options?: any): FetchArgs;
    adminOrderArOrderById(params: {
        "id": string;
    }, options?: any): FetchArgs;
    adminOrderArOrderCaptureSingle(params: {
        "id": string;
    }, options?: any): FetchArgs;
    adminOrderArOrderPromoApply(params: {
        "id": string;
        "details": OrderModelExtended;
    }, options?: any): FetchArgs;
    adminOrderArOrderPut(params: {
        "details": NhOrderModel[];
    }, options?: any): FetchArgs;
    adminOrderArOrderReject(params: {
        "id": string;
        "background"?: boolean;
    }, options?: any): FetchArgs;
    adminOrderArOrderRepick(params: {
        "id": string;
    }, options?: any): FetchArgs;
    adminOrderArOrderSearch(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): FetchArgs;
};
/**
 * AdminOrderApi - functional programming interface
 */
export declare const AdminOrderApiFp: {
    adminOrderArFindMisallocations(params: {
        "fix"?: boolean;
        "orderGuid"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminOrderArOrderById(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OrderModel>;
    adminOrderArOrderCaptureSingle(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    adminOrderArOrderPromoApply(params: {
        "id": string;
        "details": OrderModelExtended;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminOrderArOrderPut(params: {
        "details": NhOrderModel[];
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminOrderArOrderReject(params: {
        "id": string;
        "background"?: boolean;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OrderModel>;
    adminOrderArOrderRepick(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2ManifestEntity[]>;
    adminOrderArOrderSearch(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhOrderModel[]>;
};
/**
 * AdminOrderApi - object-oriented interface
 */
export declare class AdminOrderApi extends BaseAPI {
    /**
     * @param fix
     * @param orderGuid
     */
    adminOrderArFindMisallocations(params: {
        "fix"?: boolean;
        "orderGuid"?: string;
    }, options?: any): Promise<any>;
    /**
     * Retrieves detail, including bottle info, about a specific order.
     * @param id Order id.
     */
    adminOrderArOrderById(params: {
        "id": string;
    }, options?: any): Promise<OrderModel>;
    /**
     * @param id
     */
    adminOrderArOrderCaptureSingle(params: {
        "id": string;
    }, options?: any): Promise<string[]>;
    /**
     * @param id
     * @param details
     */
    adminOrderArOrderPromoApply(params: {
        "id": string;
        "details": OrderModelExtended;
    }, options?: any): Promise<any>;
    /**
     * Updates the order status of one or more order(s).
     * @param details The orders to update (order id and status must be filled in).
     */
    adminOrderArOrderPut(params: {
        "details": Array<NhOrderModel>;
    }, options?: any): Promise<any>;
    /**
     * @param id
     * @param background
     */
    adminOrderArOrderReject(params: {
        "id": string;
        "background"?: boolean;
    }, options?: any): Promise<OrderModel>;
    /**
     * @param id
     */
    adminOrderArOrderRepick(params: {
        "id": string;
    }, options?: any): Promise<OfferV2ManifestEntity[]>;
    /**
     * Gets a list of orders, with paging information. Can also filter the orders based on a search criterion. Bottle  information is not available.
     * @param skip Skip.
     * @param take Take.
     * @param search Search.
     */
    adminOrderArOrderSearch(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<NhOrderModel[]>;
}
/**
 * AdminOrderApi - factory interface
 */
export declare const AdminOrderApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    adminOrderArFindMisallocations(params: {
        "fix"?: boolean;
        "orderGuid"?: string;
    }, options?: any): Promise<any>;
    adminOrderArOrderById(params: {
        "id": string;
    }, options?: any): Promise<OrderModel>;
    adminOrderArOrderCaptureSingle(params: {
        "id": string;
    }, options?: any): Promise<string[]>;
    adminOrderArOrderPromoApply(params: {
        "id": string;
        "details": OrderModelExtended;
    }, options?: any): Promise<any>;
    adminOrderArOrderPut(params: {
        "details": NhOrderModel[];
    }, options?: any): Promise<any>;
    adminOrderArOrderReject(params: {
        "id": string;
        "background"?: boolean;
    }, options?: any): Promise<OrderModel>;
    adminOrderArOrderRepick(params: {
        "id": string;
    }, options?: any): Promise<OfferV2ManifestEntity[]>;
    adminOrderArOrderSearch(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<NhOrderModel[]>;
};
/**
 * AdminPromoCodeApi - fetch parameter creator
 */
export declare const AdminPromoCodeApiFetchParamCreator: {
    adminPromoCodeAddCreditForUsers(params: {
        "amount": number;
        "hours": number;
    }, options?: any): FetchArgs;
    adminPromoCodeDelete(params: {
        "code": string;
    }, options?: any): FetchArgs;
    adminPromoCodeGet(params: {
        "search": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): FetchArgs;
    adminPromoCodePost(params: {
        "model": NhPromoCodeModel;
    }, options?: any): FetchArgs;
    adminPromoCodePut(params: {
        "model": NhPromoCodeModel;
    }, options?: any): FetchArgs;
};
/**
 * AdminPromoCodeApi - functional programming interface
 */
export declare const AdminPromoCodeApiFp: {
    adminPromoCodeAddCreditForUsers(params: {
        "amount": number;
        "hours": number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminPromoCodeDelete(params: {
        "code": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminPromoCodeGet(params: {
        "search": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminPromoCodePost(params: {
        "model": NhPromoCodeModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminPromoCodePut(params: {
        "model": NhPromoCodeModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * AdminPromoCodeApi - object-oriented interface
 */
export declare class AdminPromoCodeApi extends BaseAPI {
    /**
     * @param amount
     * @param hours
     */
    adminPromoCodeAddCreditForUsers(params: {
        "amount": number;
        "hours": number;
    }, options?: any): Promise<any>;
    /**
     * Deactivates a promo code so it can&#39;t be used.
     * @param code Promo code to deactivate.
     */
    adminPromoCodeDelete(params: {
        "code": string;
    }, options?: any): Promise<any>;
    /**
     * Gets a single promo code, or a list of promo codes.
     * @param search
     * @param skip
     * @param take
     */
    adminPromoCodeGet(params: {
        "search": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<any>;
    /**
     * Creates a new promo code.
     * @param model
     */
    adminPromoCodePost(params: {
        "model": NhPromoCodeModel;
    }, options?: any): Promise<any>;
    /**
     * Updates a new promo code.
     * @param model
     */
    adminPromoCodePut(params: {
        "model": NhPromoCodeModel;
    }, options?: any): Promise<any>;
}
/**
 * AdminPromoCodeApi - factory interface
 */
export declare const AdminPromoCodeApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    adminPromoCodeAddCreditForUsers(params: {
        "amount": number;
        "hours": number;
    }, options?: any): Promise<any>;
    adminPromoCodeDelete(params: {
        "code": string;
    }, options?: any): Promise<any>;
    adminPromoCodeGet(params: {
        "search": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<any>;
    adminPromoCodePost(params: {
        "model": NhPromoCodeModel;
    }, options?: any): Promise<any>;
    adminPromoCodePut(params: {
        "model": NhPromoCodeModel;
    }, options?: any): Promise<any>;
};
/**
 * AdminReferralApi - fetch parameter creator
 */
export declare const AdminReferralApiFetchParamCreator: {
    adminReferralGet(options?: any): FetchArgs;
    adminReferralGet_1(params: {
        "userId": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): FetchArgs;
    adminReferralPost(params: {
        "id": number;
        "data": AdminReferralModel;
    }, options?: any): FetchArgs;
};
/**
 * AdminReferralApi - functional programming interface
 */
export declare const AdminReferralApiFp: {
    adminReferralGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    adminReferralGet_1(params: {
        "userId": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserReferralModel[]>;
    adminReferralPost(params: {
        "id": number;
        "data": AdminReferralModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * AdminReferralApi - object-oriented interface
 */
export declare class AdminReferralApi extends BaseAPI {
    /**
     */
    adminReferralGet(options?: any): Promise<any>;
    /**
     * @param userId
     * @param skip
     * @param take
     */
    adminReferralGet_1(params: {
        "userId": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<UserReferralModel[]>;
    /**
     * Sets the referral of user. Doesn&#39;t automatically give  the bonus; the bonus must manually be added by the admin if the referred user already made first purchase. If the  referred user later  makes the first purchase, then the system will automatically credit the appropriate awards.
     * @param id User id
     * @param data Email address of user to credit with referral
     */
    adminReferralPost(params: {
        "id": number;
        "data": AdminReferralModel;
    }, options?: any): Promise<any>;
}
/**
 * AdminReferralApi - factory interface
 */
export declare const AdminReferralApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    adminReferralGet(options?: any): Promise<any>;
    adminReferralGet_1(params: {
        "userId": string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<UserReferralModel[]>;
    adminReferralPost(params: {
        "id": number;
        "data": AdminReferralModel;
    }, options?: any): Promise<any>;
};
/**
 * CampaignApi - fetch parameter creator
 */
export declare const CampaignApiFetchParamCreator: {
    campaignGet(params: {
        "id": number;
        "userId": number;
    }, options?: any): FetchArgs;
    campaignPostEntry(params: {
        "id": number;
        "model": CampaignEntryModel;
    }, options?: any): FetchArgs;
};
/**
 * CampaignApi - functional programming interface
 */
export declare const CampaignApiFp: {
    campaignGet(params: {
        "id": number;
        "userId": number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CampaignApiModel>;
    campaignPostEntry(params: {
        "id": number;
        "model": CampaignEntryModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * CampaignApi - object-oriented interface
 */
export declare class CampaignApi extends BaseAPI {
    /**
     * @param id
     * @param userId
     */
    campaignGet(params: {
        "id": number;
        "userId": number;
    }, options?: any): Promise<CampaignApiModel>;
    /**
     * @param id
     * @param model
     */
    campaignPostEntry(params: {
        "id": number;
        "model": CampaignEntryModel;
    }, options?: any): Promise<any>;
}
/**
 * CampaignApi - factory interface
 */
export declare const CampaignApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    campaignGet(params: {
        "id": number;
        "userId": number;
    }, options?: any): Promise<CampaignApiModel>;
    campaignPostEntry(params: {
        "id": number;
        "model": CampaignEntryModel;
    }, options?: any): Promise<any>;
};
/**
 * CheckoutApiApi - fetch parameter creator
 */
export declare const CheckoutApiApiFetchParamCreator: {
    checkoutApiPostFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): FetchArgs;
    checkoutApiPostFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): FetchArgs;
    checkoutApiPostShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): FetchArgs;
    checkoutApiPostShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): FetchArgs;
    checkoutApiPutFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): FetchArgs;
    checkoutApiPutFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): FetchArgs;
    checkoutApiPutShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): FetchArgs;
    checkoutApiPutShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): FetchArgs;
};
/**
 * CheckoutApiApi - functional programming interface
 */
export declare const CheckoutApiApiFp: {
    checkoutApiPostFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferCheckoutModel>;
    checkoutApiPostFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultOfferCheckoutModel>;
    checkoutApiPostShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferCheckoutModel>;
    checkoutApiPostShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultCloudCheckoutModel>;
    checkoutApiPutFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferCheckoutModel>;
    checkoutApiPutFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultOfferCheckoutModel>;
    checkoutApiPutShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferCheckoutModel>;
    checkoutApiPutShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultCloudCheckoutModel>;
};
/**
 * CheckoutApiApi - object-oriented interface
 */
export declare class CheckoutApiApi extends BaseAPI {
    /**
     * Process a checkout operation.
     * @param sessionId Session ID.
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPostFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    /**
     * Process a checkout operation.
     * @param sessionId Session ID.
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPostFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<ApiResultOfferCheckoutModel>;
    /**
     * Process a checkout operation.
     * @param sessionId Session ID.
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPostShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    /**
     * Process a checkout operation.
     * @param sessionId Session ID.
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPostShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<ApiResultCloudCheckoutModel>;
    /**
     * Simulate a checkout operation.
     * @param sessionId
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPutFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    /**
     * Simulate a checkout operation.
     * @param sessionId
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPutFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<ApiResultOfferCheckoutModel>;
    /**
     * Simulate a checkout operation.
     * @param sessionId Session ID.
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPutShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    /**
     * Simulate a checkout operation.
     * @param sessionId Session ID.
     * @param offerCheckoutInfo The checkout information.
     */
    checkoutApiPutShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<ApiResultCloudCheckoutModel>;
}
/**
 * CheckoutApiApi - factory interface
 */
export declare const CheckoutApiApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    checkoutApiPostFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    checkoutApiPostFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<ApiResultOfferCheckoutModel>;
    checkoutApiPostShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    checkoutApiPostShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<ApiResultCloudCheckoutModel>;
    checkoutApiPutFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    checkoutApiPutFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": OfferCheckoutModel;
    }, options?: any): Promise<ApiResultOfferCheckoutModel>;
    checkoutApiPutShipmentFromSession(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<OfferCheckoutModel>;
    checkoutApiPutShipmentFromSessionV3(params: {
        "sessionId": string;
        "offerCheckoutInfo": CloudCheckoutModel;
    }, options?: any): Promise<ApiResultCloudCheckoutModel>;
};
/**
 * CloudCellarApi - fetch parameter creator
 */
export declare const CloudCellarApiFetchParamCreator: {
    cloudCellarGetApiCloudcellarSearch(params: {
        "search": string;
    }, options?: any): FetchArgs;
    cloudCellarGetV2(params: {
        "userName": string;
    }, options?: any): FetchArgs;
    cloudCellarHandleClaimPrize(params: {
        "sessionId": string;
        "prize": string;
    }, options?: any): FetchArgs;
    cloudCellarHandleGetLetters(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
};
/**
 * CloudCellarApi - functional programming interface
 */
export declare const CloudCellarApiFp: {
    cloudCellarGetApiCloudcellarSearch(params: {
        "search": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CloudCellarV2>;
    cloudCellarGetV2(params: {
        "userName": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CloudCellarV2>;
    cloudCellarHandleClaimPrize(params: {
        "sessionId": string;
        "prize": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WordGame>;
    cloudCellarHandleGetLetters(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WordGame>;
};
/**
 * CloudCellarApi - object-oriented interface
 */
export declare class CloudCellarApi extends BaseAPI {
    /**
     * @param search
     */
    cloudCellarGetApiCloudcellarSearch(params: {
        "search": string;
    }, options?: any): Promise<CloudCellarV2>;
    /**
     * @param userName
     */
    cloudCellarGetV2(params: {
        "userName": string;
    }, options?: any): Promise<CloudCellarV2>;
    /**
     * @param sessionId
     * @param prize
     */
    cloudCellarHandleClaimPrize(params: {
        "sessionId": string;
        "prize": string;
    }, options?: any): Promise<WordGame>;
    /**
     * @param sessionId
     */
    cloudCellarHandleGetLetters(params: {
        "sessionId": string;
    }, options?: any): Promise<WordGame>;
}
/**
 * CloudCellarApi - factory interface
 */
export declare const CloudCellarApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    cloudCellarGetApiCloudcellarSearch(params: {
        "search": string;
    }, options?: any): Promise<CloudCellarV2>;
    cloudCellarGetV2(params: {
        "userName": string;
    }, options?: any): Promise<CloudCellarV2>;
    cloudCellarHandleClaimPrize(params: {
        "sessionId": string;
        "prize": string;
    }, options?: any): Promise<WordGame>;
    cloudCellarHandleGetLetters(params: {
        "sessionId": string;
    }, options?: any): Promise<WordGame>;
};
/**
 * CplSkuStockApi - fetch parameter creator
 */
export declare const CplSkuStockApiFetchParamCreator: {
    cplSkuStockGetArrivals(params: {
        "overdue": boolean;
    }, options?: any): FetchArgs;
    cplSkuStockGetCplStock(options?: any): FetchArgs;
    cplSkuStockHandleAdminReportDeficit(params: {
        "beyondDays"?: number;
        "qtyLessThan"?: number;
    }, options?: any): FetchArgs;
    cplSkuStockSkuSales(options?: any): FetchArgs;
    cplSkuStockUpdateWarehouseStock(options?: any): FetchArgs;
};
/**
 * CplSkuStockApi - functional programming interface
 */
export declare const CplSkuStockApiFp: {
    cplSkuStockGetArrivals(params: {
        "overdue": boolean;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuEntity[]>;
    cplSkuStockGetCplStock(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    cplSkuStockHandleAdminReportDeficit(params: {
        "beyondDays"?: number;
        "qtyLessThan"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DeficitItem[]>;
    cplSkuStockSkuSales(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuSaleItemModel[]>;
    cplSkuStockUpdateWarehouseStock(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UpdateStockResult>;
};
/**
 * CplSkuStockApi - object-oriented interface
 */
export declare class CplSkuStockApi extends BaseAPI {
    /**
     * @param overdue
     */
    cplSkuStockGetArrivals(params: {
        "overdue": boolean;
    }, options?: any): Promise<SkuEntity[]>;
    /**
     */
    cplSkuStockGetCplStock(options?: any): Promise<any>;
    /**
     * @param beyondDays
     * @param qtyLessThan
     */
    cplSkuStockHandleAdminReportDeficit(params: {
        "beyondDays"?: number;
        "qtyLessThan"?: number;
    }, options?: any): Promise<DeficitItem[]>;
    /**
     */
    cplSkuStockSkuSales(options?: any): Promise<SkuSaleItemModel[]>;
    /**
     */
    cplSkuStockUpdateWarehouseStock(options?: any): Promise<UpdateStockResult>;
}
/**
 * CplSkuStockApi - factory interface
 */
export declare const CplSkuStockApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    cplSkuStockGetArrivals(params: {
        "overdue": boolean;
    }, options?: any): Promise<SkuEntity[]>;
    cplSkuStockGetCplStock(options?: any): Promise<any>;
    cplSkuStockHandleAdminReportDeficit(params: {
        "beyondDays"?: number;
        "qtyLessThan"?: number;
    }, options?: any): Promise<DeficitItem[]>;
    cplSkuStockSkuSales(options?: any): Promise<SkuSaleItemModel[]>;
    cplSkuStockUpdateWarehouseStock(options?: any): Promise<UpdateStockResult>;
};
/**
 * EmailMarketingApi - fetch parameter creator
 */
export declare const EmailMarketingApiFetchParamCreator: {
    emailMarketingHandleGet(options?: any): FetchArgs;
    emailMarketingHandleGetAbandoned(options?: any): FetchArgs;
    emailMarketingHandleGetExpiring(params: {
        "skip"?: number;
        "take"?: number;
        "send"?: boolean;
    }, options?: any): FetchArgs;
    emailMarketingHandleSendPush(params: {
        "message": string;
    }, options?: any): FetchArgs;
    emailMarketingHandleUnsub(params: {
        "email": string;
        "unsubCampaignId": string;
        "unsubCampaignTitle": string;
        "unsubReason": string;
    }, options?: any): FetchArgs;
    emailMarketingImportDotmailerIds(params: {
        "page": number;
    }, options?: any): FetchArgs;
    emailMarketingSendTest(params: {
        "toEmail": string;
        "toName": string;
    }, options?: any): FetchArgs;
};
/**
 * EmailMarketingApi - functional programming interface
 */
export declare const EmailMarketingApiFp: {
    emailMarketingHandleGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    emailMarketingHandleGetAbandoned(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    emailMarketingHandleGetExpiring(params: {
        "skip"?: number;
        "take"?: number;
        "send"?: boolean;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    emailMarketingHandleSendPush(params: {
        "message": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    emailMarketingHandleUnsub(params: {
        "email": string;
        "unsubCampaignId": string;
        "unsubCampaignTitle": string;
        "unsubReason": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    emailMarketingImportDotmailerIds(params: {
        "page": number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    emailMarketingSendTest(params: {
        "toEmail": string;
        "toName": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * EmailMarketingApi - object-oriented interface
 */
export declare class EmailMarketingApi extends BaseAPI {
    /**
     */
    emailMarketingHandleGet(options?: any): Promise<any>;
    /**
     */
    emailMarketingHandleGetAbandoned(options?: any): Promise<any>;
    /**
     * @param skip
     * @param take
     * @param send
     */
    emailMarketingHandleGetExpiring(params: {
        "skip"?: number;
        "take"?: number;
        "send"?: boolean;
    }, options?: any): Promise<any>;
    /**
     * @param message
     */
    emailMarketingHandleSendPush(params: {
        "message": string;
    }, options?: any): Promise<any>;
    /**
     * @param email
     * @param unsubCampaignId
     * @param unsubCampaignTitle
     * @param unsubReason
     */
    emailMarketingHandleUnsub(params: {
        "email": string;
        "unsubCampaignId": string;
        "unsubCampaignTitle": string;
        "unsubReason": string;
    }, options?: any): Promise<any>;
    /**
     * @param page
     */
    emailMarketingImportDotmailerIds(params: {
        "page": number;
    }, options?: any): Promise<any>;
    /**
     * @param toEmail
     * @param toName
     */
    emailMarketingSendTest(params: {
        "toEmail": string;
        "toName": string;
    }, options?: any): Promise<any>;
}
/**
 * EmailMarketingApi - factory interface
 */
export declare const EmailMarketingApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    emailMarketingHandleGet(options?: any): Promise<any>;
    emailMarketingHandleGetAbandoned(options?: any): Promise<any>;
    emailMarketingHandleGetExpiring(params: {
        "skip"?: number;
        "take"?: number;
        "send"?: boolean;
    }, options?: any): Promise<any>;
    emailMarketingHandleSendPush(params: {
        "message": string;
    }, options?: any): Promise<any>;
    emailMarketingHandleUnsub(params: {
        "email": string;
        "unsubCampaignId": string;
        "unsubCampaignTitle": string;
        "unsubReason": string;
    }, options?: any): Promise<any>;
    emailMarketingImportDotmailerIds(params: {
        "page": number;
    }, options?: any): Promise<any>;
    emailMarketingSendTest(params: {
        "toEmail": string;
        "toName": string;
    }, options?: any): Promise<any>;
};
/**
 * InviteApi - fetch parameter creator
 */
export declare const InviteApiFetchParamCreator: {
    inviteInviteByEmail(params: {
        "input": InviteByEmailModel;
    }, options?: any): FetchArgs;
};
/**
 * InviteApi - functional programming interface
 */
export declare const InviteApiFp: {
    inviteInviteByEmail(params: {
        "input": InviteByEmailModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * InviteApi - object-oriented interface
 */
export declare class InviteApi extends BaseAPI {
    /**
     * @param input
     */
    inviteInviteByEmail(params: {
        "input": InviteByEmailModel;
    }, options?: any): Promise<any>;
}
/**
 * InviteApi - factory interface
 */
export declare const InviteApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    inviteInviteByEmail(params: {
        "input": InviteByEmailModel;
    }, options?: any): Promise<any>;
};
/**
 * ItemDetailApi - fetch parameter creator
 */
export declare const ItemDetailApiFetchParamCreator: {
    itemDetailDelete(params: {
        "content": ItemDetailEntity;
    }, options?: any): FetchArgs;
    itemDetailGetBySefOrSku(params: {
        "itemSef": string;
    }, options?: any): FetchArgs;
    itemDetailListItemDetail(params: {
        "search"?: string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): FetchArgs;
    itemDetailMergeItemDetailHandler(params: {
        "input": string;
    }, options?: any): FetchArgs;
    itemDetailPost(params: {
        "content": ItemDetailEntity;
    }, options?: any): FetchArgs;
    itemDetailPostItemDetailUploadImage(params: {
        "file": any;
    }, options?: any): FetchArgs;
    itemDetailPut(params: {
        "itemSef": string;
        "content": ItemDetailEntity;
    }, options?: any): FetchArgs;
};
/**
 * ItemDetailApi - functional programming interface
 */
export declare const ItemDetailApiFp: {
    itemDetailDelete(params: {
        "content": ItemDetailEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    itemDetailGetBySefOrSku(params: {
        "itemSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemDetailEntity>;
    itemDetailListItemDetail(params: {
        "search"?: string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultAttributedItemList>;
    itemDetailMergeItemDetailHandler(params: {
        "input": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    itemDetailPost(params: {
        "content": ItemDetailEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemDetailEntity>;
    itemDetailPostItemDetailUploadImage(params: {
        "file": any;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string>;
    itemDetailPut(params: {
        "itemSef": string;
        "content": ItemDetailEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemDetailEntity>;
};
/**
 * ItemDetailApi - object-oriented interface
 */
export declare class ItemDetailApi extends BaseAPI {
    /**
     * @param content
     */
    itemDetailDelete(params: {
        "content": ItemDetailEntity;
    }, options?: any): Promise<any>;
    /**
     * @param itemSef
     */
    itemDetailGetBySefOrSku(params: {
        "itemSef": string;
    }, options?: any): Promise<ItemDetailEntity>;
    /**
     * @param search
     * @param skip
     * @param take
     */
    itemDetailListItemDetail(params: {
        "search"?: string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<ApiResultAttributedItemList>;
    /**
     * @param input
     */
    itemDetailMergeItemDetailHandler(params: {
        "input": string;
    }, options?: any): Promise<any>;
    /**
     * @param content
     */
    itemDetailPost(params: {
        "content": ItemDetailEntity;
    }, options?: any): Promise<ItemDetailEntity>;
    /**
     * @param file
     */
    itemDetailPostItemDetailUploadImage(params: {
        "file": any;
    }, options?: any): Promise<string>;
    /**
     * @param itemSef
     * @param content
     */
    itemDetailPut(params: {
        "itemSef": string;
        "content": ItemDetailEntity;
    }, options?: any): Promise<ItemDetailEntity>;
}
/**
 * ItemDetailApi - factory interface
 */
export declare const ItemDetailApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    itemDetailDelete(params: {
        "content": ItemDetailEntity;
    }, options?: any): Promise<any>;
    itemDetailGetBySefOrSku(params: {
        "itemSef": string;
    }, options?: any): Promise<ItemDetailEntity>;
    itemDetailListItemDetail(params: {
        "search"?: string;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<ApiResultAttributedItemList>;
    itemDetailMergeItemDetailHandler(params: {
        "input": string;
    }, options?: any): Promise<any>;
    itemDetailPost(params: {
        "content": ItemDetailEntity;
    }, options?: any): Promise<ItemDetailEntity>;
    itemDetailPostItemDetailUploadImage(params: {
        "file": any;
    }, options?: any): Promise<string>;
    itemDetailPut(params: {
        "itemSef": string;
        "content": ItemDetailEntity;
    }, options?: any): Promise<ItemDetailEntity>;
};
/**
 * KeyMetricsApi - fetch parameter creator
 */
export declare const KeyMetricsApiFetchParamCreator: {
    keyMetricsGet(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): FetchArgs;
    keyMetricsGetAdminReportBuyToShip(options?: any): FetchArgs;
    keyMetricsGetAdminReportOfferStats(options?: any): FetchArgs;
    keyMetricsGetAdminReportOfferStats_1(params: {
        "reportName": string;
        "startDate"?: Date;
        "endDate"?: Date;
    }, options?: any): FetchArgs;
    keyMetricsGetAdminReportPromo(params: {
        "promoCode": string;
    }, options?: any): FetchArgs;
    keyMetricsGetCohortAnalysis(options?: any): FetchArgs;
    keyMetricsGetCohortsByFirstOrder(params: {
        "startMonth": number;
        "startYear": number;
        "minLifeSpend": number;
    }, options?: any): FetchArgs;
    keyMetricsGetLtvReport(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): FetchArgs;
    keyMetricsGet_2(params: {
        "startDate": Date;
        "endDate": Date;
    }, options?: any): FetchArgs;
};
/**
 * KeyMetricsApi - functional programming interface
 */
export declare const KeyMetricsApiFp: {
    keyMetricsGet(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserSummaryViewRecord[]>;
    keyMetricsGetAdminReportBuyToShip(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    keyMetricsGetAdminReportOfferStats(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    keyMetricsGetAdminReportOfferStats_1(params: {
        "reportName": string;
        "startDate"?: Date;
        "endDate"?: Date;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    keyMetricsGetAdminReportPromo(params: {
        "promoCode": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    keyMetricsGetCohortAnalysis(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Cohort[]>;
    keyMetricsGetCohortsByFirstOrder(params: {
        "startMonth": number;
        "startYear": number;
        "minLifeSpend": number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TimeSeriesCohortSummary>;
    keyMetricsGetLtvReport(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserLifetimeViewRecord[]>;
    keyMetricsGet_2(params: {
        "startDate": Date;
        "endDate": Date;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<KpiItem[]>;
};
/**
 * KeyMetricsApi - object-oriented interface
 */
export declare class KeyMetricsApi extends BaseAPI {
    /**
     * @param utmCampaign
     * @param utmSource
     * @param utmMedium
     */
    keyMetricsGet(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): Promise<UserSummaryViewRecord[]>;
    /**
     */
    keyMetricsGetAdminReportBuyToShip(options?: any): Promise<any>;
    /**
     */
    keyMetricsGetAdminReportOfferStats(options?: any): Promise<string[]>;
    /**
     * @param reportName
     * @param startDate
     * @param endDate
     */
    keyMetricsGetAdminReportOfferStats_1(params: {
        "reportName": string;
        "startDate"?: Date;
        "endDate"?: Date;
    }, options?: any): Promise<string[]>;
    /**
     * @param promoCode
     */
    keyMetricsGetAdminReportPromo(params: {
        "promoCode": string;
    }, options?: any): Promise<any>;
    /**
     */
    keyMetricsGetCohortAnalysis(options?: any): Promise<Cohort[]>;
    /**
     * @param startMonth
     * @param startYear
     * @param minLifeSpend
     */
    keyMetricsGetCohortsByFirstOrder(params: {
        "startMonth": number;
        "startYear": number;
        "minLifeSpend": number;
    }, options?: any): Promise<TimeSeriesCohortSummary>;
    /**
     * @param utmCampaign
     * @param utmSource
     * @param utmMedium
     */
    keyMetricsGetLtvReport(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): Promise<UserLifetimeViewRecord[]>;
    /**
     * @param startDate
     * @param endDate
     */
    keyMetricsGet_2(params: {
        "startDate": Date;
        "endDate": Date;
    }, options?: any): Promise<KpiItem[]>;
}
/**
 * KeyMetricsApi - factory interface
 */
export declare const KeyMetricsApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    keyMetricsGet(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): Promise<UserSummaryViewRecord[]>;
    keyMetricsGetAdminReportBuyToShip(options?: any): Promise<any>;
    keyMetricsGetAdminReportOfferStats(options?: any): Promise<string[]>;
    keyMetricsGetAdminReportOfferStats_1(params: {
        "reportName": string;
        "startDate"?: Date;
        "endDate"?: Date;
    }, options?: any): Promise<string[]>;
    keyMetricsGetAdminReportPromo(params: {
        "promoCode": string;
    }, options?: any): Promise<any>;
    keyMetricsGetCohortAnalysis(options?: any): Promise<Cohort[]>;
    keyMetricsGetCohortsByFirstOrder(params: {
        "startMonth": number;
        "startYear": number;
        "minLifeSpend": number;
    }, options?: any): Promise<TimeSeriesCohortSummary>;
    keyMetricsGetLtvReport(params: {
        "utmCampaign"?: string;
        "utmSource"?: string;
        "utmMedium"?: string;
    }, options?: any): Promise<UserLifetimeViewRecord[]>;
    keyMetricsGet_2(params: {
        "startDate": Date;
        "endDate": Date;
    }, options?: any): Promise<KpiItem[]>;
};
/**
 * ManifestAdminApi - fetch parameter creator
 */
export declare const ManifestAdminApiFetchParamCreator: {
    manifestAdminGet(params: {
        "userId": string;
        "shipped": boolean;
        "skip"?: number;
        "take"?: number;
    }, options?: any): FetchArgs;
    manifestAdminGetClaimGiftManifest(params: {
        "id": string;
    }, options?: any): FetchArgs;
    manifestAdminGetSuspend(params: {
        "manifestId": string;
        "isSuspended": boolean;
        "reason": string;
    }, options?: any): FetchArgs;
};
/**
 * ManifestAdminApi - functional programming interface
 */
export declare const ManifestAdminApiFp: {
    manifestAdminGet(params: {
        "userId": string;
        "shipped": boolean;
        "skip"?: number;
        "take"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PgCloudCellarRecord[]>;
    manifestAdminGetClaimGiftManifest(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    manifestAdminGetSuspend(params: {
        "manifestId": string;
        "isSuspended": boolean;
        "reason": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2ManifestEntity>;
};
/**
 * ManifestAdminApi - object-oriented interface
 */
export declare class ManifestAdminApi extends BaseAPI {
    /**
     * @param userId
     * @param shipped
     * @param skip
     * @param take
     */
    manifestAdminGet(params: {
        "userId": string;
        "shipped": boolean;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<PgCloudCellarRecord[]>;
    /**
     * @param id
     */
    manifestAdminGetClaimGiftManifest(params: {
        "id": string;
    }, options?: any): Promise<any>;
    /**
     * @param manifestId
     * @param isSuspended
     * @param reason
     */
    manifestAdminGetSuspend(params: {
        "manifestId": string;
        "isSuspended": boolean;
        "reason": string;
    }, options?: any): Promise<OfferV2ManifestEntity>;
}
/**
 * ManifestAdminApi - factory interface
 */
export declare const ManifestAdminApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    manifestAdminGet(params: {
        "userId": string;
        "shipped": boolean;
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<PgCloudCellarRecord[]>;
    manifestAdminGetClaimGiftManifest(params: {
        "id": string;
    }, options?: any): Promise<any>;
    manifestAdminGetSuspend(params: {
        "manifestId": string;
        "isSuspended": boolean;
        "reason": string;
    }, options?: any): Promise<OfferV2ManifestEntity>;
};
/**
 * OfferApi - fetch parameter creator
 */
export declare const OfferApiFetchParamCreator: {
    offerGetDetail(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerGetLiveFeed(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerHandleListAppellation(options?: any): FetchArgs;
    offerHandleListRegion(options?: any): FetchArgs;
    offerHttpDeleteAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): FetchArgs;
    offerHttpGetAdminV2Offer(params: {
        "search": string;
    }, options?: any): FetchArgs;
    offerHttpGetAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): FetchArgs;
    offerHttpGetAdminV2OfferManifest(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerHttpGetAdminV2OfferOverview(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerHttpGetAdminV2OfferSef(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerHttpGetAdminV2OfferSkuList(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerHttpGetAdminV2OfferSkuSales(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerHttpPostAdminV2Offer(params: {
        "entity": OfferV2Entity;
    }, options?: any): FetchArgs;
    offerHttpPostAdminV2OfferSkuList(params: {
        "offerSef": string;
        "itemGroupToAdd": NhItemGroupEntity;
    }, options?: any): FetchArgs;
    offerHttpPutAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
        "itemGroup": NhItemGroupEntity;
    }, options?: any): FetchArgs;
    offerHttpPutAdminV2OfferSef(params: {
        "offerSef": string;
        "model": OfferV2Entity;
    }, options?: any): FetchArgs;
    offerOfferListHandler(params: {
        "filter"?: boolean;
        "skip"?: number;
        "take"?: number;
        "forcePopulate"?: boolean;
        "search"?: string;
    }, options?: any): FetchArgs;
};
/**
 * OfferApi - functional programming interface
 */
export declare const OfferApiFp: {
    offerGetDetail(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferDetailModel>;
    offerGetLiveFeed(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LiveFeedItem[]>;
    offerHandleListAppellation(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    offerHandleListRegion(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    offerHttpDeleteAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    offerHttpGetAdminV2Offer(params: {
        "search": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2Entity[]>;
    offerHttpGetAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhItemGroupEntity>;
    offerHttpGetAdminV2OfferManifest(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2AdminManifest[]>;
    offerHttpGetAdminV2OfferOverview(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AdminOfferOverviewModel>;
    offerHttpGetAdminV2OfferSef(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2Entity>;
    offerHttpGetAdminV2OfferSkuList(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhItemGroupEntity[]>;
    offerHttpGetAdminV2OfferSkuSales(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuSale[]>;
    offerHttpPostAdminV2Offer(params: {
        "entity": OfferV2Entity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2Entity>;
    offerHttpPostAdminV2OfferSkuList(params: {
        "offerSef": string;
        "itemGroupToAdd": NhItemGroupEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhItemGroupEntity>;
    offerHttpPutAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
        "itemGroup": NhItemGroupEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhItemGroupEntity>;
    offerHttpPutAdminV2OfferSef(params: {
        "offerSef": string;
        "model": OfferV2Entity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2Entity>;
    offerOfferListHandler(params: {
        "filter"?: boolean;
        "skip"?: number;
        "take"?: number;
        "forcePopulate"?: boolean;
        "search"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2Entity[]>;
};
/**
 * OfferApi - object-oriented interface
 */
export declare class OfferApi extends BaseAPI {
    /**
     * @param offerSef
     */
    offerGetDetail(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferDetailModel>;
    /**
     * @param offerSef
     */
    offerGetLiveFeed(params: {
        "offerSef": string;
    }, options?: any): Promise<LiveFeedItem[]>;
    /**
     */
    offerHandleListAppellation(options?: any): Promise<string[]>;
    /**
     */
    offerHandleListRegion(options?: any): Promise<string[]>;
    /**
     * @param offerSef
     * @param id
     */
    offerHttpDeleteAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): Promise<any>;
    /**
     * @param search
     */
    offerHttpGetAdminV2Offer(params: {
        "search": string;
    }, options?: any): Promise<OfferV2Entity[]>;
    /**
     * @param offerSef
     * @param id
     */
    offerHttpGetAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): Promise<NhItemGroupEntity>;
    /**
     * @param offerSef
     */
    offerHttpGetAdminV2OfferManifest(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferV2AdminManifest[]>;
    /**
     * @param offerSef
     */
    offerHttpGetAdminV2OfferOverview(params: {
        "offerSef": string;
    }, options?: any): Promise<AdminOfferOverviewModel>;
    /**
     * @param offerSef
     */
    offerHttpGetAdminV2OfferSef(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferV2Entity>;
    /**
     * @param offerSef
     */
    offerHttpGetAdminV2OfferSkuList(params: {
        "offerSef": string;
    }, options?: any): Promise<NhItemGroupEntity[]>;
    /**
     * @param offerSef
     */
    offerHttpGetAdminV2OfferSkuSales(params: {
        "offerSef": string;
    }, options?: any): Promise<SkuSale[]>;
    /**
     * @param entity
     */
    offerHttpPostAdminV2Offer(params: {
        "entity": OfferV2Entity;
    }, options?: any): Promise<OfferV2Entity>;
    /**
     * @param offerSef
     * @param itemGroupToAdd
     */
    offerHttpPostAdminV2OfferSkuList(params: {
        "offerSef": string;
        "itemGroupToAdd": NhItemGroupEntity;
    }, options?: any): Promise<NhItemGroupEntity>;
    /**
     * @param offerSef
     * @param id
     * @param itemGroup
     */
    offerHttpPutAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
        "itemGroup": NhItemGroupEntity;
    }, options?: any): Promise<NhItemGroupEntity>;
    /**
     * @param offerSef
     * @param model
     */
    offerHttpPutAdminV2OfferSef(params: {
        "offerSef": string;
        "model": OfferV2Entity;
    }, options?: any): Promise<OfferV2Entity>;
    /**
     * @param filter
     * @param skip
     * @param take
     * @param forcePopulate
     * @param search
     */
    offerOfferListHandler(params: {
        "filter"?: boolean;
        "skip"?: number;
        "take"?: number;
        "forcePopulate"?: boolean;
        "search"?: string;
    }, options?: any): Promise<OfferV2Entity[]>;
}
/**
 * OfferApi - factory interface
 */
export declare const OfferApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    offerGetDetail(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferDetailModel>;
    offerGetLiveFeed(params: {
        "offerSef": string;
    }, options?: any): Promise<LiveFeedItem[]>;
    offerHandleListAppellation(options?: any): Promise<string[]>;
    offerHandleListRegion(options?: any): Promise<string[]>;
    offerHttpDeleteAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): Promise<any>;
    offerHttpGetAdminV2Offer(params: {
        "search": string;
    }, options?: any): Promise<OfferV2Entity[]>;
    offerHttpGetAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
    }, options?: any): Promise<NhItemGroupEntity>;
    offerHttpGetAdminV2OfferManifest(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferV2AdminManifest[]>;
    offerHttpGetAdminV2OfferOverview(params: {
        "offerSef": string;
    }, options?: any): Promise<AdminOfferOverviewModel>;
    offerHttpGetAdminV2OfferSef(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferV2Entity>;
    offerHttpGetAdminV2OfferSkuList(params: {
        "offerSef": string;
    }, options?: any): Promise<NhItemGroupEntity[]>;
    offerHttpGetAdminV2OfferSkuSales(params: {
        "offerSef": string;
    }, options?: any): Promise<SkuSale[]>;
    offerHttpPostAdminV2Offer(params: {
        "entity": OfferV2Entity;
    }, options?: any): Promise<OfferV2Entity>;
    offerHttpPostAdminV2OfferSkuList(params: {
        "offerSef": string;
        "itemGroupToAdd": NhItemGroupEntity;
    }, options?: any): Promise<NhItemGroupEntity>;
    offerHttpPutAdminV2OfferItemGroupById(params: {
        "offerSef": string;
        "id": string;
        "itemGroup": NhItemGroupEntity;
    }, options?: any): Promise<NhItemGroupEntity>;
    offerHttpPutAdminV2OfferSef(params: {
        "offerSef": string;
        "model": OfferV2Entity;
    }, options?: any): Promise<OfferV2Entity>;
    offerOfferListHandler(params: {
        "filter"?: boolean;
        "skip"?: number;
        "take"?: number;
        "forcePopulate"?: boolean;
        "search"?: string;
    }, options?: any): Promise<OfferV2Entity[]>;
};
/**
 * OfferDetailApi - fetch parameter creator
 */
export declare const OfferDetailApiFetchParamCreator: {
    offerDetailGetLiveFeedDetail(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerDetailGetOfferBottles(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerDetailGetOfferDetailBasic(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    offerDetailPostOfferUploadImage(params: {
        "file": any;
    }, options?: any): FetchArgs;
    offerDetailSitemapIndex(options?: any): FetchArgs;
};
/**
 * OfferDetailApi - functional programming interface
 */
export declare const OfferDetailApiFp: {
    offerDetailGetLiveFeedDetail(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LiveFeedItem[]>;
    offerDetailGetOfferBottles(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhItemGroupViewEntity[]>;
    offerDetailGetOfferDetailBasic(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OfferV2Entity>;
    offerDetailPostOfferUploadImage(params: {
        "file": any;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string>;
    offerDetailSitemapIndex(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * OfferDetailApi - object-oriented interface
 */
export declare class OfferDetailApi extends BaseAPI {
    /**
     * @param offerSef
     */
    offerDetailGetLiveFeedDetail(params: {
        "offerSef": string;
    }, options?: any): Promise<LiveFeedItem[]>;
    /**
     * @param offerSef
     */
    offerDetailGetOfferBottles(params: {
        "offerSef": string;
    }, options?: any): Promise<NhItemGroupViewEntity[]>;
    /**
     * @param offerSef
     */
    offerDetailGetOfferDetailBasic(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferV2Entity>;
    /**
     * @param file
     */
    offerDetailPostOfferUploadImage(params: {
        "file": any;
    }, options?: any): Promise<string>;
    /**
     */
    offerDetailSitemapIndex(options?: any): Promise<any>;
}
/**
 * OfferDetailApi - factory interface
 */
export declare const OfferDetailApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    offerDetailGetLiveFeedDetail(params: {
        "offerSef": string;
    }, options?: any): Promise<LiveFeedItem[]>;
    offerDetailGetOfferBottles(params: {
        "offerSef": string;
    }, options?: any): Promise<NhItemGroupViewEntity[]>;
    offerDetailGetOfferDetailBasic(params: {
        "offerSef": string;
    }, options?: any): Promise<OfferV2Entity>;
    offerDetailPostOfferUploadImage(params: {
        "file": any;
    }, options?: any): Promise<string>;
    offerDetailSitemapIndex(options?: any): Promise<any>;
};
/**
 * OrderStatusApi - fetch parameter creator
 */
export declare const OrderStatusApiFetchParamCreator: {
    orderStatusGet(params: {
        "userId": string;
    }, options?: any): FetchArgs;
    orderStatusGetOrder(params: {
        "userGuid": string;
        "orderId": string;
    }, options?: any): FetchArgs;
    orderStatusGetOrders(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
};
/**
 * OrderStatusApi - functional programming interface
 */
export declare const OrderStatusApiFp: {
    orderStatusGet(params: {
        "userId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    orderStatusGetOrder(params: {
        "userGuid": string;
        "orderId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OrderModelExtended>;
    orderStatusGetOrders(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OrdersOverviewModel>;
};
/**
 * OrderStatusApi - object-oriented interface
 */
export declare class OrderStatusApi extends BaseAPI {
    /**
     * @param userId
     */
    orderStatusGet(params: {
        "userId": string;
    }, options?: any): Promise<any>;
    /**
     * @param userGuid
     * @param orderId
     */
    orderStatusGetOrder(params: {
        "userGuid": string;
        "orderId": string;
    }, options?: any): Promise<OrderModelExtended>;
    /**
     * @param userGuid
     */
    orderStatusGetOrders(params: {
        "userGuid": string;
    }, options?: any): Promise<OrdersOverviewModel>;
}
/**
 * OrderStatusApi - factory interface
 */
export declare const OrderStatusApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    orderStatusGet(params: {
        "userId": string;
    }, options?: any): Promise<any>;
    orderStatusGetOrder(params: {
        "userGuid": string;
        "orderId": string;
    }, options?: any): Promise<OrderModelExtended>;
    orderStatusGetOrders(params: {
        "userGuid": string;
    }, options?: any): Promise<OrdersOverviewModel>;
};
/**
 * PageApi - fetch parameter creator
 */
export declare const PageApiFetchParamCreator: {
    pageGetPage(params: {
        "search"?: string;
        "onlyPublished"?: boolean;
    }, options?: any): FetchArgs;
    pageGetPageById(params: {
        "id": string;
    }, options?: any): FetchArgs;
    pageGetPageBySection(params: {
        "section": string;
        "id": string;
    }, options?: any): FetchArgs;
    pageGetSections(options?: any): FetchArgs;
    pagePostIPageUploadImage(params: {
        "file": any;
    }, options?: any): FetchArgs;
    pagePublishPageVersion(params: {
        "model": Page;
    }, options?: any): FetchArgs;
};
/**
 * PageApi - functional programming interface
 */
export declare const PageApiFp: {
    pageGetPage(params: {
        "search"?: string;
        "onlyPublished"?: boolean;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListPage>;
    pageGetPageById(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultPage>;
    pageGetPageBySection(params: {
        "section": string;
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListPage>;
    pageGetSections(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListString>;
    pagePostIPageUploadImage(params: {
        "file": any;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string>;
    pagePublishPageVersion(params: {
        "model": Page;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultPage>;
};
/**
 * PageApi - object-oriented interface
 */
export declare class PageApi extends BaseAPI {
    /**
     * @param search
     * @param onlyPublished
     */
    pageGetPage(params: {
        "search"?: string;
        "onlyPublished"?: boolean;
    }, options?: any): Promise<ApiResultListPage>;
    /**
     * @param id
     */
    pageGetPageById(params: {
        "id": string;
    }, options?: any): Promise<ApiResultPage>;
    /**
     * @param section
     * @param id
     */
    pageGetPageBySection(params: {
        "section": string;
        "id": string;
    }, options?: any): Promise<ApiResultListPage>;
    /**
     */
    pageGetSections(options?: any): Promise<ApiResultListString>;
    /**
     * @param file
     */
    pagePostIPageUploadImage(params: {
        "file": any;
    }, options?: any): Promise<string>;
    /**
     * @param model
     */
    pagePublishPageVersion(params: {
        "model": Page;
    }, options?: any): Promise<ApiResultPage>;
}
/**
 * PageApi - factory interface
 */
export declare const PageApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    pageGetPage(params: {
        "search"?: string;
        "onlyPublished"?: boolean;
    }, options?: any): Promise<ApiResultListPage>;
    pageGetPageById(params: {
        "id": string;
    }, options?: any): Promise<ApiResultPage>;
    pageGetPageBySection(params: {
        "section": string;
        "id": string;
    }, options?: any): Promise<ApiResultListPage>;
    pageGetSections(options?: any): Promise<ApiResultListString>;
    pagePostIPageUploadImage(params: {
        "file": any;
    }, options?: any): Promise<string>;
    pagePublishPageVersion(params: {
        "model": Page;
    }, options?: any): Promise<ApiResultPage>;
};
/**
 * PaymentApi - fetch parameter creator
 */
export declare const PaymentApiFetchParamCreator: {
    paymentGetAddressAndPayment(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    paymentPostAddressAndPayment(params: {
        "sessionId": string;
        "model": PaymentWithAddressModel;
    }, options?: any): FetchArgs;
    paymentSessionDeletePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): FetchArgs;
    paymentSessionGetPaymentById(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): FetchArgs;
    paymentSessionGetPayments(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    paymentSessionGetPaymentsList(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    paymentSessionPostPayment(params: {
        "sessionId": string;
        "ccinfo": ApiBillingModelWithAuthnet;
    }, options?: any): FetchArgs;
    paymentSessionUpdatePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
        "newInfo": ApiBillingModelWithAuthnet;
    }, options?: any): FetchArgs;
};
/**
 * PaymentApi - functional programming interface
 */
export declare const PaymentApiFp: {
    paymentGetAddressAndPayment(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PaymentWithAddressModel[]>;
    paymentPostAddressAndPayment(params: {
        "sessionId": string;
        "model": PaymentWithAddressModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultPaymentWithAddressModel>;
    paymentSessionDeletePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    paymentSessionGetPaymentById(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiBillingModelWithAuthnet>;
    paymentSessionGetPayments(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<{
        [key: string]: ApiBillingModelWithCardNumber;
    }>;
    paymentSessionGetPaymentsList(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiBillingModelWithCardNumber[]>;
    paymentSessionPostPayment(params: {
        "sessionId": string;
        "ccinfo": ApiBillingModelWithAuthnet;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultApiBillingModelWithAuthnet>;
    paymentSessionUpdatePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
        "newInfo": ApiBillingModelWithAuthnet;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiBillingModelWithAuthnet>;
};
/**
 * PaymentApi - object-oriented interface
 */
export declare class PaymentApi extends BaseAPI {
    /**
     * @param sessionId
     */
    paymentGetAddressAndPayment(params: {
        "sessionId": string;
    }, options?: any): Promise<PaymentWithAddressModel[]>;
    /**
     * Convenience method to create both an address and payment entry. Will reuse existing address if a match already  exists in the user&#39;s profile.
     * @param sessionId Session identifier.
     * @param model Specify address and payment to add.
     */
    paymentPostAddressAndPayment(params: {
        "sessionId": string;
        "model": PaymentWithAddressModel;
    }, options?: any): Promise<ApiResultPaymentWithAddressModel>;
    /**
     * Delete an authenticated user&#39;s payment profile. Also removes the profile from CIM.
     * @param sessionId Session identifier.
     * @param paymentProfileId Payment profile identifier.
     */
    paymentSessionDeletePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): Promise<any>;
    /**
     * Gets a detailed payment profile for the authenticated user.
     * @param sessionId Session identifier.
     * @param paymentProfileId Payment profile identifier.
     */
    paymentSessionGetPaymentById(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): Promise<ApiBillingModelWithAuthnet>;
    /**
     * Gets a list of payment profiles for the authenticated user.
     * @param sessionId The session token of the logged-in user.
     */
    paymentSessionGetPayments(params: {
        "sessionId": string;
    }, options?: any): Promise<{
        [key: string]: ApiBillingModelWithCardNumber;
    }>;
    /**
     * Gets a list of payment profiles for the authenticated user.
     * @param sessionId The session token of the logged-in user.
     */
    paymentSessionGetPaymentsList(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiBillingModelWithCardNumber[]>;
    /**
     * Creates a new payment entity in the authenticated user&#39;s profile. Also creates the payment entity in CIM. The  Address entity should have already been created.
     * @param sessionId Session identifier.
     * @param ccinfo Ccinfo.
     */
    paymentSessionPostPayment(params: {
        "sessionId": string;
        "ccinfo": ApiBillingModelWithAuthnet;
    }, options?: any): Promise<ApiResultApiBillingModelWithAuthnet>;
    /**
     * Update a user&#39;s payment profile. Also updates CIM.
     * @param sessionId Session identifier.
     * @param paymentProfileId Payment profile identifier.
     * @param newInfo New payment info.
     */
    paymentSessionUpdatePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
        "newInfo": ApiBillingModelWithAuthnet;
    }, options?: any): Promise<ApiBillingModelWithAuthnet>;
}
/**
 * PaymentApi - factory interface
 */
export declare const PaymentApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    paymentGetAddressAndPayment(params: {
        "sessionId": string;
    }, options?: any): Promise<PaymentWithAddressModel[]>;
    paymentPostAddressAndPayment(params: {
        "sessionId": string;
        "model": PaymentWithAddressModel;
    }, options?: any): Promise<ApiResultPaymentWithAddressModel>;
    paymentSessionDeletePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): Promise<any>;
    paymentSessionGetPaymentById(params: {
        "sessionId": string;
        "paymentProfileId": string;
    }, options?: any): Promise<ApiBillingModelWithAuthnet>;
    paymentSessionGetPayments(params: {
        "sessionId": string;
    }, options?: any): Promise<{
        [key: string]: ApiBillingModelWithCardNumber;
    }>;
    paymentSessionGetPaymentsList(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiBillingModelWithCardNumber[]>;
    paymentSessionPostPayment(params: {
        "sessionId": string;
        "ccinfo": ApiBillingModelWithAuthnet;
    }, options?: any): Promise<ApiResultApiBillingModelWithAuthnet>;
    paymentSessionUpdatePayment(params: {
        "sessionId": string;
        "paymentProfileId": string;
        "newInfo": ApiBillingModelWithAuthnet;
    }, options?: any): Promise<ApiBillingModelWithAuthnet>;
};
/**
 * PromoGroupApi - fetch parameter creator
 */
export declare const PromoGroupApiFetchParamCreator: {
    promoGroupGet(options?: any): FetchArgs;
    promoGroupGet_1(params: {
        "id": string;
    }, options?: any): FetchArgs;
};
/**
 * PromoGroupApi - functional programming interface
 */
export declare const PromoGroupApiFp: {
    promoGroupGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    promoGroupGet_1(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhPromoCodeModel[]>;
};
/**
 * PromoGroupApi - object-oriented interface
 */
export declare class PromoGroupApi extends BaseAPI {
    /**
     * GET /api/promoGroup/
     */
    promoGroupGet(options?: any): Promise<string[]>;
    /**
     * GET /api/promoGroup/##
     * @param id id of the promo group to enumerate promo codes
     */
    promoGroupGet_1(params: {
        "id": string;
    }, options?: any): Promise<NhPromoCodeModel[]>;
}
/**
 * PromoGroupApi - factory interface
 */
export declare const PromoGroupApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    promoGroupGet(options?: any): Promise<string[]>;
    promoGroupGet_1(params: {
        "id": string;
    }, options?: any): Promise<NhPromoCodeModel[]>;
};
/**
 * PurchaseOrderApi - fetch parameter creator
 */
export declare const PurchaseOrderApiFetchParamCreator: {
    purchaseOrderCreateCplPurchaseOrder(params: {
        "id": string;
        "model": PurchaseOrderModel;
    }, options?: any): FetchArgs;
    purchaseOrderGetCplPurchaseOrderById(params: {
        "id": string;
    }, options?: any): FetchArgs;
    purchaseOrderGetPurchaseOrderId(params: {
        "id": string;
    }, options?: any): FetchArgs;
    purchaseOrderGetPurchaseOrderList(options?: any): FetchArgs;
    purchaseOrderGetPurchaseOrders(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): FetchArgs;
    purchaseOrderGetPurchaseOrdersForSku(params: {
        "sku": string;
    }, options?: any): FetchArgs;
    purchaseOrderPostPurchaseOrder(params: {
        "model": PurchaseOrderModel;
    }, options?: any): FetchArgs;
};
/**
 * PurchaseOrderApi - functional programming interface
 */
export declare const PurchaseOrderApiFp: {
    purchaseOrderCreateCplPurchaseOrder(params: {
        "id": string;
        "model": PurchaseOrderModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PurchaseOrderModel>;
    purchaseOrderGetCplPurchaseOrderById(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PurchaseOrder>;
    purchaseOrderGetPurchaseOrderId(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PurchaseOrderModel>;
    purchaseOrderGetPurchaseOrderList(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    purchaseOrderGetPurchaseOrders(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PurchaseOrderModel[]>;
    purchaseOrderGetPurchaseOrdersForSku(params: {
        "sku": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PurchaseOrderModel[]>;
    purchaseOrderPostPurchaseOrder(params: {
        "model": PurchaseOrderModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PurchaseOrderModel>;
};
/**
 * PurchaseOrderApi - object-oriented interface
 */
export declare class PurchaseOrderApi extends BaseAPI {
    /**
     * @param id
     * @param model
     */
    purchaseOrderCreateCplPurchaseOrder(params: {
        "id": string;
        "model": PurchaseOrderModel;
    }, options?: any): Promise<PurchaseOrderModel>;
    /**
     * @param id
     */
    purchaseOrderGetCplPurchaseOrderById(params: {
        "id": string;
    }, options?: any): Promise<PurchaseOrder>;
    /**
     * @param id
     */
    purchaseOrderGetPurchaseOrderId(params: {
        "id": string;
    }, options?: any): Promise<PurchaseOrderModel>;
    /**
     */
    purchaseOrderGetPurchaseOrderList(options?: any): Promise<string[]>;
    /**
     * @param skip
     * @param take
     * @param search
     */
    purchaseOrderGetPurchaseOrders(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<PurchaseOrderModel[]>;
    /**
     * @param sku
     */
    purchaseOrderGetPurchaseOrdersForSku(params: {
        "sku": string;
    }, options?: any): Promise<PurchaseOrderModel[]>;
    /**
     * @param model
     */
    purchaseOrderPostPurchaseOrder(params: {
        "model": PurchaseOrderModel;
    }, options?: any): Promise<PurchaseOrderModel>;
}
/**
 * PurchaseOrderApi - factory interface
 */
export declare const PurchaseOrderApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    purchaseOrderCreateCplPurchaseOrder(params: {
        "id": string;
        "model": PurchaseOrderModel;
    }, options?: any): Promise<PurchaseOrderModel>;
    purchaseOrderGetCplPurchaseOrderById(params: {
        "id": string;
    }, options?: any): Promise<PurchaseOrder>;
    purchaseOrderGetPurchaseOrderId(params: {
        "id": string;
    }, options?: any): Promise<PurchaseOrderModel>;
    purchaseOrderGetPurchaseOrderList(options?: any): Promise<string[]>;
    purchaseOrderGetPurchaseOrders(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<PurchaseOrderModel[]>;
    purchaseOrderGetPurchaseOrdersForSku(params: {
        "sku": string;
    }, options?: any): Promise<PurchaseOrderModel[]>;
    purchaseOrderPostPurchaseOrder(params: {
        "model": PurchaseOrderModel;
    }, options?: any): Promise<PurchaseOrderModel>;
};
/**
 * SellerAdminApi - fetch parameter creator
 */
export declare const SellerAdminApiFetchParamCreator: {
    sellerAdminDelete(params: {
        "sellerId": string;
    }, options?: any): FetchArgs;
    sellerAdminGet(options?: any): FetchArgs;
    sellerAdminGet_1(params: {
        "sellerId": string;
    }, options?: any): FetchArgs;
    sellerAdminPost(params: {
        "content": NhSellerEntity;
    }, options?: any): FetchArgs;
    sellerAdminPut(params: {
        "content": NhSellerEntity;
        "sellerId": string;
    }, options?: any): FetchArgs;
};
/**
 * SellerAdminApi - functional programming interface
 */
export declare const SellerAdminApiFp: {
    sellerAdminDelete(params: {
        "sellerId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    sellerAdminGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhSellerEntity[]>;
    sellerAdminGet_1(params: {
        "sellerId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhSellerEntity[]>;
    sellerAdminPost(params: {
        "content": NhSellerEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhSellerEntity>;
    sellerAdminPut(params: {
        "content": NhSellerEntity;
        "sellerId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhSellerEntity>;
};
/**
 * SellerAdminApi - object-oriented interface
 */
export declare class SellerAdminApi extends BaseAPI {
    /**
     * @param sellerId
     */
    sellerAdminDelete(params: {
        "sellerId": string;
    }, options?: any): Promise<any>;
    /**
     */
    sellerAdminGet(options?: any): Promise<NhSellerEntity[]>;
    /**
     * @param sellerId
     */
    sellerAdminGet_1(params: {
        "sellerId": string;
    }, options?: any): Promise<NhSellerEntity[]>;
    /**
     * @param content
     */
    sellerAdminPost(params: {
        "content": NhSellerEntity;
    }, options?: any): Promise<NhSellerEntity>;
    /**
     * @param content
     * @param sellerId
     */
    sellerAdminPut(params: {
        "content": NhSellerEntity;
        "sellerId": string;
    }, options?: any): Promise<NhSellerEntity>;
}
/**
 * SellerAdminApi - factory interface
 */
export declare const SellerAdminApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    sellerAdminDelete(params: {
        "sellerId": string;
    }, options?: any): Promise<any>;
    sellerAdminGet(options?: any): Promise<NhSellerEntity[]>;
    sellerAdminGet_1(params: {
        "sellerId": string;
    }, options?: any): Promise<NhSellerEntity[]>;
    sellerAdminPost(params: {
        "content": NhSellerEntity;
    }, options?: any): Promise<NhSellerEntity>;
    sellerAdminPut(params: {
        "content": NhSellerEntity;
        "sellerId": string;
    }, options?: any): Promise<NhSellerEntity>;
};
/**
 * SessionApi - fetch parameter creator
 */
export declare const SessionApiFetchParamCreator: {
    sessionCartGet(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionCartPut(params: {
        "sessionId": string;
        "item": CloudCheckoutItem;
    }, options?: any): FetchArgs;
    sessionGet(options?: any): FetchArgs;
    sessionGetSessionGiftList(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionGetSessionUserCreditDetail(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionGetSessionUserDetail(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionGetSessionUserEmailPreferences(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionGetSessionUserEnRouteBottleList(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionGetSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): FetchArgs;
    sessionGetSessionUserOrders(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionGetSessionUserReferral(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionGet_1(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionHandleEnrollApplePush(params: {
        "sessionId": string;
        "model": ApplePushEnroll;
    }, options?: any): FetchArgs;
    sessionHandleGetApplePush(params: {
        "sessionId": string;
        "modelDeviceToken"?: string;
        "modelDeviceUuid"?: string;
        "modelEntryPoint"?: string;
    }, options?: any): FetchArgs;
    sessionHandleSessionGiftRedeem(params: {
        "sessionId": string;
        "claimCode": string;
    }, options?: any): FetchArgs;
    sessionPostSessionUploadImage(params: {
        "sessionId": string;
        "file": any;
    }, options?: any): FetchArgs;
    sessionPut(params: {
        "sessionId": string;
        "data": SessionModel;
    }, options?: any): FetchArgs;
    sessionPutSessionUserDetail(params: {
        "sessionId": string;
        "model": UserModelExtended;
    }, options?: any): FetchArgs;
    sessionPutSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): FetchArgs;
    sessionSessionDelete(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    sessionSessionSignOut(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
};
/**
 * SessionApi - functional programming interface
 */
export declare const SessionApiFp: {
    sessionCartGet(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListCloudCheckoutItem>;
    sessionCartPut(params: {
        "sessionId": string;
        "item": CloudCheckoutItem;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListCloudCheckoutItem>;
    sessionGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SessionModel>;
    sessionGetSessionGiftList(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CodeWithOrder[]>;
    sessionGetSessionUserCreditDetail(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<number>;
    sessionGetSessionUserDetail(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserModelExtended>;
    sessionGetSessionUserEmailPreferences(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhUserModel>;
    sessionGetSessionUserEnRouteBottleList(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DeficitItem[]>;
    sessionGetSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PgCloudCellarRecord>;
    sessionGetSessionUserOrders(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OrdersOverviewModel>;
    sessionGetSessionUserReferral(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserReferralModel[]>;
    sessionGet_1(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SessionModel>;
    sessionHandleEnrollApplePush(params: {
        "sessionId": string;
        "model": ApplePushEnroll;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultApplePushEnroll>;
    sessionHandleGetApplePush(params: {
        "sessionId": string;
        "modelDeviceToken"?: string;
        "modelDeviceUuid"?: string;
        "modelEntryPoint"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultApplePushEnroll>;
    sessionHandleSessionGiftRedeem(params: {
        "sessionId": string;
        "claimCode": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CheckoutPromoCodeModel>;
    sessionPostSessionUploadImage(params: {
        "sessionId": string;
        "file": any;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string>;
    sessionPut(params: {
        "sessionId": string;
        "data": SessionModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    sessionPutSessionUserDetail(params: {
        "sessionId": string;
        "model": UserModelExtended;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserModelExtended>;
    sessionPutSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhCreditModel>;
    sessionSessionDelete(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    sessionSessionSignOut(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultBoolean>;
};
/**
 * SessionApi - object-oriented interface
 */
export declare class SessionApi extends BaseAPI {
    /**
     * @param sessionId
     */
    sessionCartGet(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultListCloudCheckoutItem>;
    /**
     * @param sessionId
     * @param item
     */
    sessionCartPut(params: {
        "sessionId": string;
        "item": CloudCheckoutItem;
    }, options?: any): Promise<ApiResultListCloudCheckoutItem>;
    /**
     * Generates a new session id
     */
    sessionGet(options?: any): Promise<SessionModel>;
    /**
     * @param sessionId
     */
    sessionGetSessionGiftList(params: {
        "sessionId": string;
    }, options?: any): Promise<CodeWithOrder[]>;
    /**
     * @param sessionId
     */
    sessionGetSessionUserCreditDetail(params: {
        "sessionId": string;
    }, options?: any): Promise<number>;
    /**
     * Gets the session user detail.
     * @param sessionId Session identifier.
     */
    sessionGetSessionUserDetail(params: {
        "sessionId": string;
    }, options?: any): Promise<UserModelExtended>;
    /**
     * @param sessionId
     */
    sessionGetSessionUserEmailPreferences(params: {
        "sessionId": string;
    }, options?: any): Promise<NhUserModel>;
    /**
     * Gets the list of en-route bottles that are overdue for the current user. You can then redeem any of these  bottles for credit by calling Routes.SessionUserEnRouteBottleRedeem
     * @param sessionId Session identifier.
     */
    sessionGetSessionUserEnRouteBottleList(params: {
        "sessionId": string;
    }, options?: any): Promise<DeficitItem[]>;
    /**
     * @param sessionId
     * @param manifestGuid
     */
    sessionGetSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): Promise<PgCloudCellarRecord>;
    /**
     * @param sessionId
     */
    sessionGetSessionUserOrders(params: {
        "sessionId": string;
    }, options?: any): Promise<OrdersOverviewModel>;
    /**
     * @param sessionId
     */
    sessionGetSessionUserReferral(params: {
        "sessionId": string;
    }, options?: any): Promise<UserReferralModel[]>;
    /**
     * Get the session with the specified id.
     * @param sessionId Session identifier.
     */
    sessionGet_1(params: {
        "sessionId": string;
    }, options?: any): Promise<SessionModel>;
    /**
     * @param sessionId
     * @param model
     */
    sessionHandleEnrollApplePush(params: {
        "sessionId": string;
        "model": ApplePushEnroll;
    }, options?: any): Promise<ApiResultApplePushEnroll>;
    /**
     * @param sessionId
     * @param modelDeviceToken
     * @param modelDeviceUuid
     * @param modelEntryPoint
     */
    sessionHandleGetApplePush(params: {
        "sessionId": string;
        "modelDeviceToken"?: string;
        "modelDeviceUuid"?: string;
        "modelEntryPoint"?: string;
    }, options?: any): Promise<ApiResultApplePushEnroll>;
    /**
     * @param sessionId
     * @param claimCode
     */
    sessionHandleSessionGiftRedeem(params: {
        "sessionId": string;
        "claimCode": string;
    }, options?: any): Promise<CheckoutPromoCodeModel>;
    /**
     * @param sessionId
     * @param file
     */
    sessionPostSessionUploadImage(params: {
        "sessionId": string;
        "file": any;
    }, options?: any): Promise<string>;
    /**
     * Store the session with the specified id.
     * @param sessionId Session identifier.
     * @param data Data.
     */
    sessionPut(params: {
        "sessionId": string;
        "data": SessionModel;
    }, options?: any): Promise<any>;
    /**
     * Puts the session user detail.
     * @param sessionId Session identifier.
     * @param model Model.
     */
    sessionPutSessionUserDetail(params: {
        "sessionId": string;
        "model": UserModelExtended;
    }, options?: any): Promise<UserModelExtended>;
    /**
     * @param sessionId
     * @param manifestGuid
     */
    sessionPutSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): Promise<NhCreditModel>;
    /**
     * Delete the session with the specified id, along with any other sessions which have expired.
     * @param sessionId Session identifier.
     */
    sessionSessionDelete(params: {
        "sessionId": string;
    }, options?: any): Promise<any>;
    /**
     * Delete the session with the specified id, along with any other sessions which have expired.
     * @param sessionId Session identifier.
     */
    sessionSessionSignOut(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultBoolean>;
}
/**
 * SessionApi - factory interface
 */
export declare const SessionApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    sessionCartGet(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultListCloudCheckoutItem>;
    sessionCartPut(params: {
        "sessionId": string;
        "item": CloudCheckoutItem;
    }, options?: any): Promise<ApiResultListCloudCheckoutItem>;
    sessionGet(options?: any): Promise<SessionModel>;
    sessionGetSessionGiftList(params: {
        "sessionId": string;
    }, options?: any): Promise<CodeWithOrder[]>;
    sessionGetSessionUserCreditDetail(params: {
        "sessionId": string;
    }, options?: any): Promise<number>;
    sessionGetSessionUserDetail(params: {
        "sessionId": string;
    }, options?: any): Promise<UserModelExtended>;
    sessionGetSessionUserEmailPreferences(params: {
        "sessionId": string;
    }, options?: any): Promise<NhUserModel>;
    sessionGetSessionUserEnRouteBottleList(params: {
        "sessionId": string;
    }, options?: any): Promise<DeficitItem[]>;
    sessionGetSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): Promise<PgCloudCellarRecord>;
    sessionGetSessionUserOrders(params: {
        "sessionId": string;
    }, options?: any): Promise<OrdersOverviewModel>;
    sessionGetSessionUserReferral(params: {
        "sessionId": string;
    }, options?: any): Promise<UserReferralModel[]>;
    sessionGet_1(params: {
        "sessionId": string;
    }, options?: any): Promise<SessionModel>;
    sessionHandleEnrollApplePush(params: {
        "sessionId": string;
        "model": ApplePushEnroll;
    }, options?: any): Promise<ApiResultApplePushEnroll>;
    sessionHandleGetApplePush(params: {
        "sessionId": string;
        "modelDeviceToken"?: string;
        "modelDeviceUuid"?: string;
        "modelEntryPoint"?: string;
    }, options?: any): Promise<ApiResultApplePushEnroll>;
    sessionHandleSessionGiftRedeem(params: {
        "sessionId": string;
        "claimCode": string;
    }, options?: any): Promise<CheckoutPromoCodeModel>;
    sessionPostSessionUploadImage(params: {
        "sessionId": string;
        "file": any;
    }, options?: any): Promise<string>;
    sessionPut(params: {
        "sessionId": string;
        "data": SessionModel;
    }, options?: any): Promise<any>;
    sessionPutSessionUserDetail(params: {
        "sessionId": string;
        "model": UserModelExtended;
    }, options?: any): Promise<UserModelExtended>;
    sessionPutSessionUserEnRouteBottleRedeem(params: {
        "sessionId": string;
        "manifestGuid": string;
    }, options?: any): Promise<NhCreditModel>;
    sessionSessionDelete(params: {
        "sessionId": string;
    }, options?: any): Promise<any>;
    sessionSessionSignOut(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultBoolean>;
};
/**
 * ShipManagerApi - fetch parameter creator
 */
export declare const ShipManagerApiFetchParamCreator: {
    shipManagerCancelShipment(params: {
        "id": string;
    }, options?: any): FetchArgs;
    shipManagerGet(params: {
        "search": string;
        "skip": number;
        "take"?: number;
        "isAdminHold"?: boolean;
    }, options?: any): FetchArgs;
    shipManagerGetCustomer(params: {
        "page"?: number;
    }, options?: any): FetchArgs;
    shipManagerPostManifestsByIdShip(params: {
        "model": ShippingModel;
    }, options?: any): FetchArgs;
    shipManagerUpdateTracking(options?: any): FetchArgs;
};
/**
 * ShipManagerApi - functional programming interface
 */
export declare const ShipManagerApiFp: {
    shipManagerCancelShipment(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    shipManagerGet(params: {
        "search": string;
        "skip": number;
        "take"?: number;
        "isAdminHold"?: boolean;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ShippingModel[]>;
    shipManagerGetCustomer(params: {
        "page"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhAddressModel[]>;
    shipManagerPostManifestsByIdShip(params: {
        "model": ShippingModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ShippingModel>;
    shipManagerUpdateTracking(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ShipManagerApi - object-oriented interface
 */
export declare class ShipManagerApi extends BaseAPI {
    /**
     * @param id
     */
    shipManagerCancelShipment(params: {
        "id": string;
    }, options?: any): Promise<any>;
    /**
     * @param search
     * @param skip
     * @param take
     * @param isAdminHold
     */
    shipManagerGet(params: {
        "search": string;
        "skip": number;
        "take"?: number;
        "isAdminHold"?: boolean;
    }, options?: any): Promise<ShippingModel[]>;
    /**
     * @param page
     */
    shipManagerGetCustomer(params: {
        "page"?: number;
    }, options?: any): Promise<NhAddressModel[]>;
    /**
     * @param model
     */
    shipManagerPostManifestsByIdShip(params: {
        "model": ShippingModel;
    }, options?: any): Promise<ShippingModel>;
    /**
     */
    shipManagerUpdateTracking(options?: any): Promise<any>;
}
/**
 * ShipManagerApi - factory interface
 */
export declare const ShipManagerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    shipManagerCancelShipment(params: {
        "id": string;
    }, options?: any): Promise<any>;
    shipManagerGet(params: {
        "search": string;
        "skip": number;
        "take"?: number;
        "isAdminHold"?: boolean;
    }, options?: any): Promise<ShippingModel[]>;
    shipManagerGetCustomer(params: {
        "page"?: number;
    }, options?: any): Promise<NhAddressModel[]>;
    shipManagerPostManifestsByIdShip(params: {
        "model": ShippingModel;
    }, options?: any): Promise<ShippingModel>;
    shipManagerUpdateTracking(options?: any): Promise<any>;
};
/**
 * SkuApi - fetch parameter creator
 */
export declare const SkuApiFetchParamCreator: {
    skuDelete(params: {
        "sku": string;
        "skuId": string;
    }, options?: any): FetchArgs;
    skuGetSkuList(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
        "sort"?: string;
        "reverse"?: boolean;
    }, options?: any): FetchArgs;
    skuGetSkuListDeficit(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): FetchArgs;
    skuGetSkuListFreeLocations(options?: any): FetchArgs;
    skuGetSkuStats(params: {
        "sku": string;
    }, options?: any): FetchArgs;
    skuGetSkuStatsByVarietal(options?: any): FetchArgs;
    skuListCplIds(options?: any): FetchArgs;
    skuPost(params: {
        "content": SkuViewEntity;
    }, options?: any): FetchArgs;
    skuPushSkuToCpl(params: {
        "sku": string;
    }, options?: any): FetchArgs;
    skuPut(params: {
        "skuId": string;
        "content": SkuViewEntity;
    }, options?: any): FetchArgs;
    skuRebuildSkuHistory(params: {
        "skip"?: number;
        "take"?: number;
    }, options?: any): FetchArgs;
    skuSkuDetail(params: {
        "skuId": string;
    }, options?: any): FetchArgs;
    skuSkuDetailV3(params: {
        "skuId": string;
    }, options?: any): FetchArgs;
    skuSkuListByItemDetail(params: {
        "itemDetailSef": string;
    }, options?: any): FetchArgs;
    skuSkuSwapGet(options?: any): FetchArgs;
    skuSkuSwapPost(params: {
        "model": SkuSwapModel;
    }, options?: any): FetchArgs;
    skuSkuSwapPut(params: {
        "model": SkuSwapModel;
    }, options?: any): FetchArgs;
};
/**
 * SkuApi - functional programming interface
 */
export declare const SkuApiFp: {
    skuDelete(params: {
        "sku": string;
        "skuId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    skuGetSkuList(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
        "sort"?: string;
        "reverse"?: boolean;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuViewEntity[]>;
    skuGetSkuListDeficit(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuViewEntity[]>;
    skuGetSkuListFreeLocations(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OverallPlan>;
    skuGetSkuStats(params: {
        "sku": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SurplusItemDateTime[]>;
    skuGetSkuStatsByVarietal(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SurplusItemString[]>;
    skuListCplIds(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string[]>;
    skuPost(params: {
        "content": SkuViewEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultSkuViewEntity>;
    skuPushSkuToCpl(params: {
        "sku": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    skuPut(params: {
        "skuId": string;
        "content": SkuViewEntity;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuViewEntity>;
    skuRebuildSkuHistory(params: {
        "skip"?: number;
        "take"?: number;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    skuSkuDetail(params: {
        "skuId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuEntity>;
    skuSkuDetailV3(params: {
        "skuId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultSkuEntity>;
    skuSkuListByItemDetail(params: {
        "itemDetailSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SkuEntity[]>;
    skuSkuSwapGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultSkuSwapModel>;
    skuSkuSwapPost(params: {
        "model": SkuSwapModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultSkuSwapModel>;
    skuSkuSwapPut(params: {
        "model": SkuSwapModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultSkuSwapModel>;
};
/**
 * SkuApi - object-oriented interface
 */
export declare class SkuApi extends BaseAPI {
    /**
     * @param sku
     * @param skuId
     */
    skuDelete(params: {
        "sku": string;
        "skuId": string;
    }, options?: any): Promise<any>;
    /**
     * @param skip
     * @param take
     * @param search
     * @param sort
     * @param reverse
     */
    skuGetSkuList(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
        "sort"?: string;
        "reverse"?: boolean;
    }, options?: any): Promise<SkuViewEntity[]>;
    /**
     * @param skip
     * @param take
     * @param search
     */
    skuGetSkuListDeficit(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<SkuViewEntity[]>;
    /**
     */
    skuGetSkuListFreeLocations(options?: any): Promise<OverallPlan>;
    /**
     * @param sku
     */
    skuGetSkuStats(params: {
        "sku": string;
    }, options?: any): Promise<SurplusItemDateTime[]>;
    /**
     */
    skuGetSkuStatsByVarietal(options?: any): Promise<SurplusItemString[]>;
    /**
     */
    skuListCplIds(options?: any): Promise<string[]>;
    /**
     * @param content
     */
    skuPost(params: {
        "content": SkuViewEntity;
    }, options?: any): Promise<ApiResultSkuViewEntity>;
    /**
     * @param sku
     */
    skuPushSkuToCpl(params: {
        "sku": string;
    }, options?: any): Promise<any>;
    /**
     * @param skuId
     * @param content
     */
    skuPut(params: {
        "skuId": string;
        "content": SkuViewEntity;
    }, options?: any): Promise<SkuViewEntity>;
    /**
     * @param skip
     * @param take
     */
    skuRebuildSkuHistory(params: {
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<any>;
    /**
     * @param skuId
     */
    skuSkuDetail(params: {
        "skuId": string;
    }, options?: any): Promise<SkuEntity>;
    /**
     * @param skuId
     */
    skuSkuDetailV3(params: {
        "skuId": string;
    }, options?: any): Promise<ApiResultSkuEntity>;
    /**
     * @param itemDetailSef
     */
    skuSkuListByItemDetail(params: {
        "itemDetailSef": string;
    }, options?: any): Promise<SkuEntity[]>;
    /**
     */
    skuSkuSwapGet(options?: any): Promise<ApiResultSkuSwapModel>;
    /**
     * @param model
     */
    skuSkuSwapPost(params: {
        "model": SkuSwapModel;
    }, options?: any): Promise<ApiResultSkuSwapModel>;
    /**
     * @param model
     */
    skuSkuSwapPut(params: {
        "model": SkuSwapModel;
    }, options?: any): Promise<ApiResultSkuSwapModel>;
}
/**
 * SkuApi - factory interface
 */
export declare const SkuApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    skuDelete(params: {
        "sku": string;
        "skuId": string;
    }, options?: any): Promise<any>;
    skuGetSkuList(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
        "sort"?: string;
        "reverse"?: boolean;
    }, options?: any): Promise<SkuViewEntity[]>;
    skuGetSkuListDeficit(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<SkuViewEntity[]>;
    skuGetSkuListFreeLocations(options?: any): Promise<OverallPlan>;
    skuGetSkuStats(params: {
        "sku": string;
    }, options?: any): Promise<SurplusItemDateTime[]>;
    skuGetSkuStatsByVarietal(options?: any): Promise<SurplusItemString[]>;
    skuListCplIds(options?: any): Promise<string[]>;
    skuPost(params: {
        "content": SkuViewEntity;
    }, options?: any): Promise<ApiResultSkuViewEntity>;
    skuPushSkuToCpl(params: {
        "sku": string;
    }, options?: any): Promise<any>;
    skuPut(params: {
        "skuId": string;
        "content": SkuViewEntity;
    }, options?: any): Promise<SkuViewEntity>;
    skuRebuildSkuHistory(params: {
        "skip"?: number;
        "take"?: number;
    }, options?: any): Promise<any>;
    skuSkuDetail(params: {
        "skuId": string;
    }, options?: any): Promise<SkuEntity>;
    skuSkuDetailV3(params: {
        "skuId": string;
    }, options?: any): Promise<ApiResultSkuEntity>;
    skuSkuListByItemDetail(params: {
        "itemDetailSef": string;
    }, options?: any): Promise<SkuEntity[]>;
    skuSkuSwapGet(options?: any): Promise<ApiResultSkuSwapModel>;
    skuSkuSwapPost(params: {
        "model": SkuSwapModel;
    }, options?: any): Promise<ApiResultSkuSwapModel>;
    skuSkuSwapPut(params: {
        "model": SkuSwapModel;
    }, options?: any): Promise<ApiResultSkuSwapModel>;
};
/**
 * TelegramBotApi - fetch parameter creator
 */
export declare const TelegramBotApiFetchParamCreator: {
    telegramBotPost(params: {
        "update": Update;
    }, options?: any): FetchArgs;
};
/**
 * TelegramBotApi - functional programming interface
 */
export declare const TelegramBotApiFp: {
    telegramBotPost(params: {
        "update": Update;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * TelegramBotApi - object-oriented interface
 */
export declare class TelegramBotApi extends BaseAPI {
    /**
     * @param update
     */
    telegramBotPost(params: {
        "update": Update;
    }, options?: any): Promise<any>;
}
/**
 * TelegramBotApi - factory interface
 */
export declare const TelegramBotApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    telegramBotPost(params: {
        "update": Update;
    }, options?: any): Promise<any>;
};
/**
 * TimeSeriesApi - fetch parameter creator
 */
export declare const TimeSeriesApiFetchParamCreator: {
    timeSeriesBeginGenerateSeries(params: {
        "start": Date;
        "end": Date;
        "includeTestUsers": boolean;
        "utm": string;
    }, options?: any): FetchArgs;
    timeSeriesGetList(options?: any): FetchArgs;
    timeSeriesGetSeries(params: {
        "entityGuid": string;
    }, options?: any): FetchArgs;
    timeSeriesGetSeriesRecords(params: {
        "entityGuid": string;
    }, options?: any): FetchArgs;
};
/**
 * TimeSeriesApi - functional programming interface
 */
export declare const TimeSeriesApiFp: {
    timeSeriesBeginGenerateSeries(params: {
        "start": Date;
        "end": Date;
        "includeTestUsers": boolean;
        "utm": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TimeSeriesReport>;
    timeSeriesGetList(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    timeSeriesGetSeries(params: {
        "entityGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    timeSeriesGetSeriesRecords(params: {
        "entityGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * TimeSeriesApi - object-oriented interface
 */
export declare class TimeSeriesApi extends BaseAPI {
    /**
     * @param start
     * @param end
     * @param includeTestUsers
     * @param utm
     */
    timeSeriesBeginGenerateSeries(params: {
        "start": Date;
        "end": Date;
        "includeTestUsers": boolean;
        "utm": string;
    }, options?: any): Promise<TimeSeriesReport>;
    /**
     */
    timeSeriesGetList(options?: any): Promise<any>;
    /**
     * @param entityGuid
     */
    timeSeriesGetSeries(params: {
        "entityGuid": string;
    }, options?: any): Promise<any>;
    /**
     * @param entityGuid
     */
    timeSeriesGetSeriesRecords(params: {
        "entityGuid": string;
    }, options?: any): Promise<any>;
}
/**
 * TimeSeriesApi - factory interface
 */
export declare const TimeSeriesApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    timeSeriesBeginGenerateSeries(params: {
        "start": Date;
        "end": Date;
        "includeTestUsers": boolean;
        "utm": string;
    }, options?: any): Promise<TimeSeriesReport>;
    timeSeriesGetList(options?: any): Promise<any>;
    timeSeriesGetSeries(params: {
        "entityGuid": string;
    }, options?: any): Promise<any>;
    timeSeriesGetSeriesRecords(params: {
        "entityGuid": string;
    }, options?: any): Promise<any>;
};
/**
 * UserApi - fetch parameter creator
 */
export declare const UserApiFetchParamCreator: {
    userCanClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    userChangePassword(params: {
        "sessionId": string;
        "input": PasswordChangeModel;
    }, options?: any): FetchArgs;
    userChangePasswordAdmin(params: {
        "userGuid": string;
        "input": PasswordChangeModel;
    }, options?: any): FetchArgs;
    userClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    userHttpUserCaptureEmail(params: {
        "model": EmailCapture;
    }, options?: any): FetchArgs;
    userResetPassword(params: {
        "input": PasswordResetModel;
    }, options?: any): FetchArgs;
    userSetEmailPreferences(params: {
        "userGuid": string;
        "model": NhUserEmailPreference;
    }, options?: any): FetchArgs;
    userSignIn(params: {
        "model": UserAuthModel;
    }, options?: any): FetchArgs;
    userSignIn3(params: {
        "model": UserAuthModel;
    }, options?: any): FetchArgs;
    userSignup(params: {
        "model": UserAuthModel;
    }, options?: any): FetchArgs;
    userSignup3(params: {
        "model": UserAuthModel;
    }, options?: any): FetchArgs;
};
/**
 * UserApi - functional programming interface
 */
export declare const UserApiFp: {
    userCanClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultBoolean>;
    userChangePassword(params: {
        "sessionId": string;
        "input": PasswordChangeModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultPasswordChangeModel>;
    userChangePasswordAdmin(params: {
        "userGuid": string;
        "input": PasswordChangeModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultPasswordChangeModel>;
    userClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultString>;
    userHttpUserCaptureEmail(params: {
        "model": EmailCapture;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<EmailCapture>;
    userResetPassword(params: {
        "input": PasswordResetModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultString>;
    userSetEmailPreferences(params: {
        "userGuid": string;
        "model": NhUserEmailPreference;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultNhUserEmailPreference>;
    userSignIn(params: {
        "model": UserAuthModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserAuthResultModel>;
    userSignIn3(params: {
        "model": UserAuthModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultUserAuthResultModel>;
    userSignup(params: {
        "model": UserAuthModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserAuthResultModel>;
    userSignup3(params: {
        "model": UserAuthModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultUserAuthResultModel>;
};
/**
 * UserApi - object-oriented interface
 */
export declare class UserApi extends BaseAPI {
    /**
     * @param sessionId
     */
    userCanClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultBoolean>;
    /**
     * Change the password for the current user (based on sessionId)
     * @param sessionId
     * @param input
     */
    userChangePassword(params: {
        "sessionId": string;
        "input": PasswordChangeModel;
    }, options?: any): Promise<ApiResultPasswordChangeModel>;
    /**
     * Change the password for the given user (based on userGuid); restricted to Admin only.
     * @param userGuid
     * @param input
     */
    userChangePasswordAdmin(params: {
        "userGuid": string;
        "input": PasswordChangeModel;
    }, options?: any): Promise<ApiResultPasswordChangeModel>;
    /**
     * @param sessionId
     */
    userClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultString>;
    /**
     * @param model
     */
    userHttpUserCaptureEmail(params: {
        "model": EmailCapture;
    }, options?: any): Promise<EmailCapture>;
    /**
     * Initiate a password reset operation.
     * @param input
     */
    userResetPassword(params: {
        "input": PasswordResetModel;
    }, options?: any): Promise<ApiResultString>;
    /**
     * @param userGuid
     * @param model
     */
    userSetEmailPreferences(params: {
        "userGuid": string;
        "model": NhUserEmailPreference;
    }, options?: any): Promise<ApiResultNhUserEmailPreference>;
    /**
     * @param model
     */
    userSignIn(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<UserAuthResultModel>;
    /**
     * @param model
     */
    userSignIn3(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<ApiResultUserAuthResultModel>;
    /**
     * @param model
     */
    userSignup(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<UserAuthResultModel>;
    /**
     * @param model
     */
    userSignup3(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<ApiResultUserAuthResultModel>;
}
/**
 * UserApi - factory interface
 */
export declare const UserApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    userCanClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultBoolean>;
    userChangePassword(params: {
        "sessionId": string;
        "input": PasswordChangeModel;
    }, options?: any): Promise<ApiResultPasswordChangeModel>;
    userChangePasswordAdmin(params: {
        "userGuid": string;
        "input": PasswordChangeModel;
    }, options?: any): Promise<ApiResultPasswordChangeModel>;
    userClaimFreeLetter(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultString>;
    userHttpUserCaptureEmail(params: {
        "model": EmailCapture;
    }, options?: any): Promise<EmailCapture>;
    userResetPassword(params: {
        "input": PasswordResetModel;
    }, options?: any): Promise<ApiResultString>;
    userSetEmailPreferences(params: {
        "userGuid": string;
        "model": NhUserEmailPreference;
    }, options?: any): Promise<ApiResultNhUserEmailPreference>;
    userSignIn(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<UserAuthResultModel>;
    userSignIn3(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<ApiResultUserAuthResultModel>;
    userSignup(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<UserAuthResultModel>;
    userSignup3(params: {
        "model": UserAuthModel;
    }, options?: any): Promise<ApiResultUserAuthResultModel>;
};
/**
 * UserAdminApi - fetch parameter creator
 */
export declare const UserAdminApiFetchParamCreator: {
    userAdminAddressGet(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    userAdminAddressGetById(params: {
        "addressGuid": string;
    }, options?: any): FetchArgs;
    userAdminAddressPutById(params: {
        "addressGuid": string;
        "addressModel": NhAddressModel;
    }, options?: any): FetchArgs;
    userAdminAdminGetWordGame(params: {
        "userGuid": string;
        "giveLetters"?: string;
    }, options?: any): FetchArgs;
    userAdminAdminRevokeWordGame(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    userAdminCreateAdminUserComment(params: {
        "userGuid": string;
        "comment": CommentJsonObject;
    }, options?: any): FetchArgs;
    userAdminCreditDelete(params: {
        "userGuid": string;
        "creditGuid": string;
    }, options?: any): FetchArgs;
    userAdminCreditGet(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    userAdminCreditPost(params: {
        "userGuid": string;
        "newCredit": NhCreditModel;
    }, options?: any): FetchArgs;
    userAdminCreditPut(params: {
        "userGuid": string;
        "creditGuid": string;
        "credit": NhCreditModel;
    }, options?: any): FetchArgs;
    userAdminGet(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): FetchArgs;
    userAdminGetById(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    userAdminGetUsersbySku(params: {
        "sku": string;
    }, options?: any): FetchArgs;
    userAdminHandleAdminGiftRedeem(params: {
        "userGuid": string;
        "claimCodes": string;
    }, options?: any): FetchArgs;
    userAdminHandleAdminUserTicket(params: {
        "model": SupportTicket;
    }, options?: any): FetchArgs;
    userAdminHttpPostAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): FetchArgs;
    userAdminHttpPutAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): FetchArgs;
    userAdminListAdminUserComment(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    userAdminMergeUsers(params: {
        "oldUserGuid": string;
        "newUserGuid": string;
    }, options?: any): FetchArgs;
    userAdminPaymentsGet(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    userAdminPutById(params: {
        "model": UserModelExtended;
        "userGuid": string;
    }, options?: any): FetchArgs;
};
/**
 * UserAdminApi - functional programming interface
 */
export declare const UserAdminApiFp: {
    userAdminAddressGet(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhAddressModel[]>;
    userAdminAddressGetById(params: {
        "addressGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhAddressModel>;
    userAdminAddressPutById(params: {
        "addressGuid": string;
        "addressModel": NhAddressModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhAddressModel>;
    userAdminAdminGetWordGame(params: {
        "userGuid": string;
        "giveLetters"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WordGame>;
    userAdminAdminRevokeWordGame(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    userAdminCreateAdminUserComment(params: {
        "userGuid": string;
        "comment": CommentJsonObject;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListCommentJsonObject>;
    userAdminCreditDelete(params: {
        "userGuid": string;
        "creditGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    userAdminCreditGet(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhCreditModel>;
    userAdminCreditPost(params: {
        "userGuid": string;
        "newCredit": NhCreditModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhCreditModel>;
    userAdminCreditPut(params: {
        "userGuid": string;
        "creditGuid": string;
        "credit": NhCreditModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhCreditModel>;
    userAdminGet(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserModelExtended[]>;
    userAdminGetById(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserModelExtended>;
    userAdminGetUsersbySku(params: {
        "sku": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    userAdminHandleAdminGiftRedeem(params: {
        "userGuid": string;
        "claimCodes": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CheckoutPromoCodeModel[]>;
    userAdminHandleAdminUserTicket(params: {
        "model": SupportTicket;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SupportTicket>;
    userAdminHttpPostAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AdminUserPushModel>;
    userAdminHttpPutAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AdminUserPushModel>;
    userAdminListAdminUserComment(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListCommentJsonObject>;
    userAdminMergeUsers(params: {
        "oldUserGuid": string;
        "newUserGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    userAdminPaymentsGet(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<NhAddressModel>;
    userAdminPutById(params: {
        "model": UserModelExtended;
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserModelExtended>;
};
/**
 * UserAdminApi - object-oriented interface
 */
export declare class UserAdminApi extends BaseAPI {
    /**
     * @param userGuid
     */
    userAdminAddressGet(params: {
        "userGuid": string;
    }, options?: any): Promise<NhAddressModel[]>;
    /**
     * @param addressGuid
     */
    userAdminAddressGetById(params: {
        "addressGuid": string;
    }, options?: any): Promise<NhAddressModel>;
    /**
     * @param addressGuid
     * @param addressModel
     */
    userAdminAddressPutById(params: {
        "addressGuid": string;
        "addressModel": NhAddressModel;
    }, options?: any): Promise<NhAddressModel>;
    /**
     * @param userGuid
     * @param giveLetters
     */
    userAdminAdminGetWordGame(params: {
        "userGuid": string;
        "giveLetters"?: string;
    }, options?: any): Promise<WordGame>;
    /**
     * @param userGuid
     */
    userAdminAdminRevokeWordGame(params: {
        "userGuid": string;
    }, options?: any): Promise<any>;
    /**
     * @param userGuid
     * @param comment
     */
    userAdminCreateAdminUserComment(params: {
        "userGuid": string;
        "comment": CommentJsonObject;
    }, options?: any): Promise<ApiResultListCommentJsonObject>;
    /**
     * @param userGuid
     * @param creditGuid
     */
    userAdminCreditDelete(params: {
        "userGuid": string;
        "creditGuid": string;
    }, options?: any): Promise<any>;
    /**
     * @param userGuid
     */
    userAdminCreditGet(params: {
        "userGuid": string;
    }, options?: any): Promise<NhCreditModel>;
    /**
     * @param userGuid
     * @param newCredit
     */
    userAdminCreditPost(params: {
        "userGuid": string;
        "newCredit": NhCreditModel;
    }, options?: any): Promise<NhCreditModel>;
    /**
     * @param userGuid
     * @param creditGuid
     * @param credit
     */
    userAdminCreditPut(params: {
        "userGuid": string;
        "creditGuid": string;
        "credit": NhCreditModel;
    }, options?: any): Promise<NhCreditModel>;
    /**
     * @param skip
     * @param take
     * @param search
     */
    userAdminGet(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<UserModelExtended[]>;
    /**
     * @param userGuid
     */
    userAdminGetById(params: {
        "userGuid": string;
    }, options?: any): Promise<UserModelExtended>;
    /**
     * @param sku
     */
    userAdminGetUsersbySku(params: {
        "sku": string;
    }, options?: any): Promise<any>;
    /**
     * @param userGuid
     * @param claimCodes
     */
    userAdminHandleAdminGiftRedeem(params: {
        "userGuid": string;
        "claimCodes": string;
    }, options?: any): Promise<CheckoutPromoCodeModel[]>;
    /**
     * @param model
     */
    userAdminHandleAdminUserTicket(params: {
        "model": SupportTicket;
    }, options?: any): Promise<SupportTicket>;
    /**
     * @param model
     */
    userAdminHttpPostAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): Promise<AdminUserPushModel>;
    /**
     * @param model
     */
    userAdminHttpPutAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): Promise<AdminUserPushModel>;
    /**
     * @param userGuid
     */
    userAdminListAdminUserComment(params: {
        "userGuid": string;
    }, options?: any): Promise<ApiResultListCommentJsonObject>;
    /**
     * @param oldUserGuid
     * @param newUserGuid
     */
    userAdminMergeUsers(params: {
        "oldUserGuid": string;
        "newUserGuid": string;
    }, options?: any): Promise<any>;
    /**
     * @param userGuid
     */
    userAdminPaymentsGet(params: {
        "userGuid": string;
    }, options?: any): Promise<NhAddressModel>;
    /**
     * @param model
     * @param userGuid
     */
    userAdminPutById(params: {
        "model": UserModelExtended;
        "userGuid": string;
    }, options?: any): Promise<UserModelExtended>;
}
/**
 * UserAdminApi - factory interface
 */
export declare const UserAdminApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    userAdminAddressGet(params: {
        "userGuid": string;
    }, options?: any): Promise<NhAddressModel[]>;
    userAdminAddressGetById(params: {
        "addressGuid": string;
    }, options?: any): Promise<NhAddressModel>;
    userAdminAddressPutById(params: {
        "addressGuid": string;
        "addressModel": NhAddressModel;
    }, options?: any): Promise<NhAddressModel>;
    userAdminAdminGetWordGame(params: {
        "userGuid": string;
        "giveLetters"?: string;
    }, options?: any): Promise<WordGame>;
    userAdminAdminRevokeWordGame(params: {
        "userGuid": string;
    }, options?: any): Promise<any>;
    userAdminCreateAdminUserComment(params: {
        "userGuid": string;
        "comment": CommentJsonObject;
    }, options?: any): Promise<ApiResultListCommentJsonObject>;
    userAdminCreditDelete(params: {
        "userGuid": string;
        "creditGuid": string;
    }, options?: any): Promise<any>;
    userAdminCreditGet(params: {
        "userGuid": string;
    }, options?: any): Promise<NhCreditModel>;
    userAdminCreditPost(params: {
        "userGuid": string;
        "newCredit": NhCreditModel;
    }, options?: any): Promise<NhCreditModel>;
    userAdminCreditPut(params: {
        "userGuid": string;
        "creditGuid": string;
        "credit": NhCreditModel;
    }, options?: any): Promise<NhCreditModel>;
    userAdminGet(params: {
        "skip"?: number;
        "take"?: number;
        "search"?: string;
    }, options?: any): Promise<UserModelExtended[]>;
    userAdminGetById(params: {
        "userGuid": string;
    }, options?: any): Promise<UserModelExtended>;
    userAdminGetUsersbySku(params: {
        "sku": string;
    }, options?: any): Promise<any>;
    userAdminHandleAdminGiftRedeem(params: {
        "userGuid": string;
        "claimCodes": string;
    }, options?: any): Promise<CheckoutPromoCodeModel[]>;
    userAdminHandleAdminUserTicket(params: {
        "model": SupportTicket;
    }, options?: any): Promise<SupportTicket>;
    userAdminHttpPostAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): Promise<AdminUserPushModel>;
    userAdminHttpPutAdminUserPush(params: {
        "model": AdminUserPushModel;
    }, options?: any): Promise<AdminUserPushModel>;
    userAdminListAdminUserComment(params: {
        "userGuid": string;
    }, options?: any): Promise<ApiResultListCommentJsonObject>;
    userAdminMergeUsers(params: {
        "oldUserGuid": string;
        "newUserGuid": string;
    }, options?: any): Promise<any>;
    userAdminPaymentsGet(params: {
        "userGuid": string;
    }, options?: any): Promise<NhAddressModel>;
    userAdminPutById(params: {
        "model": UserModelExtended;
        "userGuid": string;
    }, options?: any): Promise<UserModelExtended>;
};
/**
 * UserCreditApi - fetch parameter creator
 */
export declare const UserCreditApiFetchParamCreator: {
    userCreditGet(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
    userCreditGetTransactions(params: {
        "userGuid": string;
    }, options?: any): FetchArgs;
};
/**
 * UserCreditApi - functional programming interface
 */
export declare const UserCreditApiFp: {
    userCreditGet(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    userCreditGetTransactions(params: {
        "userGuid": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * UserCreditApi - object-oriented interface
 */
export declare class UserCreditApi extends BaseAPI {
    /**
     * @param userGuid
     */
    userCreditGet(params: {
        "userGuid": string;
    }, options?: any): Promise<any>;
    /**
     * @param userGuid
     */
    userCreditGetTransactions(params: {
        "userGuid": string;
    }, options?: any): Promise<any>;
}
/**
 * UserCreditApi - factory interface
 */
export declare const UserCreditApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    userCreditGet(params: {
        "userGuid": string;
    }, options?: any): Promise<any>;
    userCreditGetTransactions(params: {
        "userGuid": string;
    }, options?: any): Promise<any>;
};
/**
 * V2GroupApi - fetch parameter creator
 */
export declare const V2GroupApiFetchParamCreator: {
    v2GroupDelete(params: {
        "content": GroupItemEntity[];
    }, options?: any): FetchArgs;
    v2GroupGet(options?: any): FetchArgs;
    v2GroupGet_1(params: {
        "id": string;
    }, options?: any): FetchArgs;
    v2GroupPost(params: {
        "content": GroupItemEntity[];
    }, options?: any): FetchArgs;
    v2GroupPut(params: {
        "content": GroupItemEntity[];
    }, options?: any): FetchArgs;
};
/**
 * V2GroupApi - functional programming interface
 */
export declare const V2GroupApiFp: {
    v2GroupDelete(params: {
        "content": GroupItemEntity[];
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any>;
    v2GroupGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GroupItemEntity[]>;
    v2GroupGet_1(params: {
        "id": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GroupItemEntity>;
    v2GroupPost(params: {
        "content": GroupItemEntity[];
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GroupItemEntity[]>;
    v2GroupPut(params: {
        "content": GroupItemEntity[];
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GroupItemEntity[]>;
};
/**
 * V2GroupApi - object-oriented interface
 */
export declare class V2GroupApi extends BaseAPI {
    /**
     * @param content
     */
    v2GroupDelete(params: {
        "content": Array<GroupItemEntity>;
    }, options?: any): Promise<any>;
    /**
     */
    v2GroupGet(options?: any): Promise<GroupItemEntity[]>;
    /**
     * @param id
     */
    v2GroupGet_1(params: {
        "id": string;
    }, options?: any): Promise<GroupItemEntity>;
    /**
     * @param content
     */
    v2GroupPost(params: {
        "content": Array<GroupItemEntity>;
    }, options?: any): Promise<GroupItemEntity[]>;
    /**
     * @param content
     */
    v2GroupPut(params: {
        "content": Array<GroupItemEntity>;
    }, options?: any): Promise<GroupItemEntity[]>;
}
/**
 * V2GroupApi - factory interface
 */
export declare const V2GroupApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    v2GroupDelete(params: {
        "content": GroupItemEntity[];
    }, options?: any): Promise<any>;
    v2GroupGet(options?: any): Promise<GroupItemEntity[]>;
    v2GroupGet_1(params: {
        "id": string;
    }, options?: any): Promise<GroupItemEntity>;
    v2GroupPost(params: {
        "content": GroupItemEntity[];
    }, options?: any): Promise<GroupItemEntity[]>;
    v2GroupPut(params: {
        "content": GroupItemEntity[];
    }, options?: any): Promise<GroupItemEntity[]>;
};
/**
 * WineGeniusApi - fetch parameter creator
 */
export declare const WineGeniusApiFetchParamCreator: {
    wineGeniusDeleteSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): FetchArgs;
    wineGeniusGetSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): FetchArgs;
    wineGeniusGetSessionWineGeniusData(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    wineGeniusGetWineGeniusUsersForOffer(params: {
        "offerSef": string;
    }, options?: any): FetchArgs;
    wineGeniusHandleGetMessages(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    wineGeniusHandleGetVacation(params: {
        "sessionId": string;
        "vacationDateSet"?: Date;
        "vacationSuspendOn"?: Date;
        "vacationResumeOn"?: Date;
        "vacationVacationGuid"?: string;
    }, options?: any): FetchArgs;
    wineGeniusHandlePostMessage(params: {
        "sessionId": string;
        "message": WineGeniusMessage;
    }, options?: any): FetchArgs;
    wineGeniusHandlePostVacation(params: {
        "sessionId": string;
        "vacation": WineGeniusVacation;
    }, options?: any): FetchArgs;
    wineGeniusListSessionOfferReservation(params: {
        "sessionId": string;
    }, options?: any): FetchArgs;
    wineGeniusPostWineGeniusIncludeOrExclude(params: {
        "offerSef": string;
        "model": GeniusExcl;
    }, options?: any): FetchArgs;
    wineGeniusPutSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): FetchArgs;
    wineGeniusSetSessionWineGeniusData(params: {
        "sessionId": string;
        "data": WineGeniusData;
    }, options?: any): FetchArgs;
    wineGeniusWineGeniusPost(params: {
        "sessionId": string;
        "postData": WineGeniusData;
    }, options?: any): FetchArgs;
};
/**
 * WineGeniusApi - functional programming interface
 */
export declare const WineGeniusApiFp: {
    wineGeniusDeleteSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultOrderGeniusState>;
    wineGeniusGetSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultOrderGeniusState>;
    wineGeniusGetSessionWineGeniusData(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineGeniusData>;
    wineGeniusGetWineGeniusUsersForOffer(params: {
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultListGeniusGuess>;
    wineGeniusHandleGetMessages(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineGeniusMessage>;
    wineGeniusHandleGetVacation(params: {
        "sessionId": string;
        "vacationDateSet"?: Date;
        "vacationSuspendOn"?: Date;
        "vacationResumeOn"?: Date;
        "vacationVacationGuid"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineGeniusVacation>;
    wineGeniusHandlePostMessage(params: {
        "sessionId": string;
        "message": WineGeniusMessage;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineGeniusMessage>;
    wineGeniusHandlePostVacation(params: {
        "sessionId": string;
        "vacation": WineGeniusVacation;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineGeniusVacation>;
    wineGeniusListSessionOfferReservation(params: {
        "sessionId": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultOrderGeniusState>;
    wineGeniusPostWineGeniusIncludeOrExclude(params: {
        "offerSef": string;
        "model": GeniusExcl;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultGeniusExcl>;
    wineGeniusPutSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultOrderGeniusState>;
    wineGeniusSetSessionWineGeniusData(params: {
        "sessionId": string;
        "data": WineGeniusData;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineGeniusData>;
    wineGeniusWineGeniusPost(params: {
        "sessionId": string;
        "postData": WineGeniusData;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineGeniusData>;
};
/**
 * WineGeniusApi - object-oriented interface
 */
export declare class WineGeniusApi extends BaseAPI {
    /**
     * Reveals the allocated items for an order, and finalizes the order.
     * @param sessionId
     * @param offerSef
     */
    wineGeniusDeleteSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    /**
     * @param sessionId
     * @param offerSef
     */
    wineGeniusGetSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    /**
     * @param sessionId
     */
    wineGeniusGetSessionWineGeniusData(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultWineGeniusData>;
    /**
     * @param offerSef
     */
    wineGeniusGetWineGeniusUsersForOffer(params: {
        "offerSef": string;
    }, options?: any): Promise<ApiResultListGeniusGuess>;
    /**
     * @param sessionId
     */
    wineGeniusHandleGetMessages(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultWineGeniusMessage>;
    /**
     * @param sessionId
     * @param vacationDateSet
     * @param vacationSuspendOn
     * @param vacationResumeOn
     * @param vacationVacationGuid
     */
    wineGeniusHandleGetVacation(params: {
        "sessionId": string;
        "vacationDateSet"?: Date;
        "vacationSuspendOn"?: Date;
        "vacationResumeOn"?: Date;
        "vacationVacationGuid"?: string;
    }, options?: any): Promise<ApiResultWineGeniusVacation>;
    /**
     * @param sessionId
     * @param message
     */
    wineGeniusHandlePostMessage(params: {
        "sessionId": string;
        "message": WineGeniusMessage;
    }, options?: any): Promise<ApiResultWineGeniusMessage>;
    /**
     * @param sessionId
     * @param vacation
     */
    wineGeniusHandlePostVacation(params: {
        "sessionId": string;
        "vacation": WineGeniusVacation;
    }, options?: any): Promise<ApiResultWineGeniusVacation>;
    /**
     * @param sessionId
     */
    wineGeniusListSessionOfferReservation(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    /**
     * @param offerSef
     * @param model
     */
    wineGeniusPostWineGeniusIncludeOrExclude(params: {
        "offerSef": string;
        "model": GeniusExcl;
    }, options?: any): Promise<ApiResultGeniusExcl>;
    /**
     * Reveals the allocated items for an order, and finalizes the order.
     * @param sessionId
     * @param offerSef
     */
    wineGeniusPutSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    /**
     * @param sessionId
     * @param data
     */
    wineGeniusSetSessionWineGeniusData(params: {
        "sessionId": string;
        "data": WineGeniusData;
    }, options?: any): Promise<ApiResultWineGeniusData>;
    /**
     * @param sessionId
     * @param postData
     */
    wineGeniusWineGeniusPost(params: {
        "sessionId": string;
        "postData": WineGeniusData;
    }, options?: any): Promise<ApiResultWineGeniusData>;
}
/**
 * WineGeniusApi - factory interface
 */
export declare const WineGeniusApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    wineGeniusDeleteSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    wineGeniusGetSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    wineGeniusGetSessionWineGeniusData(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultWineGeniusData>;
    wineGeniusGetWineGeniusUsersForOffer(params: {
        "offerSef": string;
    }, options?: any): Promise<ApiResultListGeniusGuess>;
    wineGeniusHandleGetMessages(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultWineGeniusMessage>;
    wineGeniusHandleGetVacation(params: {
        "sessionId": string;
        "vacationDateSet"?: Date;
        "vacationSuspendOn"?: Date;
        "vacationResumeOn"?: Date;
        "vacationVacationGuid"?: string;
    }, options?: any): Promise<ApiResultWineGeniusVacation>;
    wineGeniusHandlePostMessage(params: {
        "sessionId": string;
        "message": WineGeniusMessage;
    }, options?: any): Promise<ApiResultWineGeniusMessage>;
    wineGeniusHandlePostVacation(params: {
        "sessionId": string;
        "vacation": WineGeniusVacation;
    }, options?: any): Promise<ApiResultWineGeniusVacation>;
    wineGeniusListSessionOfferReservation(params: {
        "sessionId": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    wineGeniusPostWineGeniusIncludeOrExclude(params: {
        "offerSef": string;
        "model": GeniusExcl;
    }, options?: any): Promise<ApiResultGeniusExcl>;
    wineGeniusPutSessionOfferReservation(params: {
        "sessionId": string;
        "offerSef": string;
    }, options?: any): Promise<ApiResultOrderGeniusState>;
    wineGeniusSetSessionWineGeniusData(params: {
        "sessionId": string;
        "data": WineGeniusData;
    }, options?: any): Promise<ApiResultWineGeniusData>;
    wineGeniusWineGeniusPost(params: {
        "sessionId": string;
        "postData": WineGeniusData;
    }, options?: any): Promise<ApiResultWineGeniusData>;
};
/**
 * WineryApi - fetch parameter creator
 */
export declare const WineryApiFetchParamCreator: {
    wineryHandleGetWinery(params: {
        "winerySef": string;
    }, options?: any): FetchArgs;
    wineryHandleListWinery(params: {
        "skip"?: number;
        "take"?: number;
        "filter"?: string;
        "search"?: string;
    }, options?: any): FetchArgs;
    wineryHandleListWinery_1(params: {
        "winerySef": string;
    }, options?: any): FetchArgs;
    wineryHandlePostWinery(params: {
        "winery": WineryModel;
    }, options?: any): FetchArgs;
    wineryHandlePutWinery(params: {
        "winerySef": string;
        "winery": WineryModel;
    }, options?: any): FetchArgs;
};
/**
 * WineryApi - functional programming interface
 */
export declare const WineryApiFp: {
    wineryHandleGetWinery(params: {
        "winerySef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WineryModel>;
    wineryHandleListWinery(params: {
        "skip"?: number;
        "take"?: number;
        "filter"?: string;
        "search"?: string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WineryModel[]>;
    wineryHandleListWinery_1(params: {
        "winerySef": string;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemDetailEntity[]>;
    wineryHandlePostWinery(params: {
        "winery": WineryModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineryModel>;
    wineryHandlePutWinery(params: {
        "winerySef": string;
        "winery": WineryModel;
    }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiResultWineryModel>;
};
/**
 * WineryApi - object-oriented interface
 */
export declare class WineryApi extends BaseAPI {
    /**
     * Gets a winery by its id.
     * @param winerySef
     */
    wineryHandleGetWinery(params: {
        "winerySef": string;
    }, options?: any): Promise<WineryModel>;
    /**
     * Gets the list of wineries.
     * @param skip
     * @param take
     * @param filter
     * @param search
     */
    wineryHandleListWinery(params: {
        "skip"?: number;
        "take"?: number;
        "filter"?: string;
        "search"?: string;
    }, options?: any): Promise<WineryModel[]>;
    /**
     * Gets the list of wines made by a winery.
     * @param winerySef
     */
    wineryHandleListWinery_1(params: {
        "winerySef": string;
    }, options?: any): Promise<ItemDetailEntity[]>;
    /**
     * Creates a new winery.
     * @param winery
     */
    wineryHandlePostWinery(params: {
        "winery": WineryModel;
    }, options?: any): Promise<ApiResultWineryModel>;
    /**
     * Updates an existing winery.
     * @param winerySef
     * @param winery
     */
    wineryHandlePutWinery(params: {
        "winerySef": string;
        "winery": WineryModel;
    }, options?: any): Promise<ApiResultWineryModel>;
}
/**
 * WineryApi - factory interface
 */
export declare const WineryApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    wineryHandleGetWinery(params: {
        "winerySef": string;
    }, options?: any): Promise<WineryModel>;
    wineryHandleListWinery(params: {
        "skip"?: number;
        "take"?: number;
        "filter"?: string;
        "search"?: string;
    }, options?: any): Promise<WineryModel[]>;
    wineryHandleListWinery_1(params: {
        "winerySef": string;
    }, options?: any): Promise<ItemDetailEntity[]>;
    wineryHandlePostWinery(params: {
        "winery": WineryModel;
    }, options?: any): Promise<ApiResultWineryModel>;
    wineryHandlePutWinery(params: {
        "winerySef": string;
        "winery": WineryModel;
    }, options?: any): Promise<ApiResultWineryModel>;
};
