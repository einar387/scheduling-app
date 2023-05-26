import { Orientation } from 'expo-screen-orientation';

import { LOGOUT, LOGOUT_INIT } from '@/constants';

import * as C from './constants';

export const dispatchSetUser = (me?: User) => ({
  type: C.SET_USER,
  payload: { me },
});
export const dispatchSetToken = (token: ?string) => ({
  type: C.SET_TOKEN,
  payload: { token },
});
export const dispatchSetUserAndToken = (me?: User, token?: string) => ({
  type: C.SET_USER_AND_TOKEN,
  payload: { me, token },
});
export const dispatchSetSetupComplete = (setupComplete: boolean) => ({
  type: C.SET_SETUP_COMPLETE,
  payload: { setupComplete },
});
export const dispatchIncrementRequestErrors = () => ({
  type: C.INCREMENT_REQUEST_ERRORS,
  payload: {},
});

export const dispatchSetIsPasswordValid = (isValid: boolean) => ({
  type: C.SET_IS_PASSWORD_VALID,
  payload: { isValid },
});
export const dispatchSetServerTimeOffset = (offset: number) => ({
  type: C.SET_SERVER_TIME_OFFSET,
  payload: { offset },
});
export const dispatchSetNetState = netState => ({
  type: C.SET_NET_STATE,
  payload: { netState },
});

export const dispatchSetDeviceOrientation = (
  orientation: Orientation,
  width: number,
  height: number
) => ({
  type: C.SET_DEVICE_ORIENTATION,
  payload: { orientation, width, height },
});

export const dispatchAttemptLogin = (email: string, password: string) => ({
  type: C.ATTEMPT_LOGIN,
  payload: { email, password },
});
export const dispatchAttemptLoginPending = () => ({
  type: C.ATTEMPT_LOGIN_PENDING,
  payload: {},
});
export const dispatchAttemptLoginError = message => ({
  type: C.ATTEMPT_LOGIN_ERROR,
  payload: { message },
});
export const dispatchAttemptLoginSuccess = () => ({
  type: C.ATTEMPT_LOGIN_SUCCESS,
  payload: {},
});
export const dispatchClearLoginMessage = message => ({
  type: C.CLEAR_LOGIN_MESSAGE,
  payload: { message },
});

export const dispatchAttemptSignup = (payload: User) => ({
  type: C.ATTEMPT_SIGNUP,
  payload,
});
export const dispatchAttemptSignupPending = () => ({
  type: C.ATTEMPT_SIGNUP_PENDING,
  payload: {},
});
export const dispatchAttemptSignupError = message => ({
  type: C.ATTEMPT_SIGNUP_ERROR,
  payload: { message },
});
export const dispatchAttemptSignupSuccess = () => ({
  type: C.ATTEMPT_SIGNUP_SUCCESS,
  payload: {},
});
export const dispatchClearSignupMessage = message => ({
  type: C.CLEAR_SIGNUP_MESSAGE,
  payload: { message },
});

export const dispatchSendOtp = (email: string) => ({
  type: C.SEND_OTP,
  payload: { email },
});
export const dispatchSendOtpPending = () => ({
  type: C.SEND_OTP_PENDING,
  payload: {},
});
export const dispatchSendOtpError = message => ({
  type: C.SEND_OTP_ERROR,
  payload: { message },
});
export const dispatchSendOtpSuccess = () => ({
  type: C.SEND_OTP_SUCCESS,
  payload: {},
});
export const dispatchClearSendOtpMessage = () => ({
  type: C.CLEAR_SEND_OTP_MESSAGE,
  payload: {},
});

export const dispatchLoginOtp = (email: string, otp: string) => ({
  type: C.LOGIN_OTP,
  payload: { email, otp },
});
export const dispatchLoginOtpPending = () => ({
  type: C.LOGIN_OTP_PENDING,
  payload: {},
});
export const dispatchLoginOtpError = message => ({
  type: C.LOGIN_OTP_ERROR,
  payload: { message },
});
export const dispatchLoginOtpSuccess = () => ({
  type: C.LOGIN_OTP_SUCCESS,
  payload: {},
});
export const dispatchLoginOtpMessage = () => ({
  type: C.CLEAR_LOGIN_OTP_MESSAGE,
  payload: {},
});

export const dispatchForgotPassword = (email: string) => ({
  type: C.FORGOT_PASSWORD,
  payload: { email },
});
export const dispatchForgotPasswordPending = () => ({
  type: C.FORGOT_PASSWORD_PENDING,
  payload: {},
});
export const dispatchForgotPasswordError = message => ({
  type: C.FORGOT_PASSWORD_ERROR,
  payload: { message },
});
export const dispatchForgotPasswordSuccess = () => ({
  type: C.FORGOT_PASSWORD_SUCCESS,
  payload: {},
});
export const dispatchClearForgotPasswordMessage = () => ({
  type: C.CLEAR_FORGOT_PASSWORD_MESSAGE,
  payload: {},
});
export const dispatchResetForgotPassword = () => ({
  type: C.RESET_FORGOT_PASSWORD_FETCH,
  payload: {},
});

export const dispatchResetPassword = (
  email: string,
  token: string,
  password: string,
  confirmPassword: string
) => ({
  type: C.RESET_PASSWORD,
  payload: { email, token, password, confirmPassword },
});
export const dispatchResetPasswordPending = () => ({
  type: C.RESET_PASSWORD_PENDING,
  payload: {},
});
export const dispatchResetPasswordError = message => ({
  type: C.RESET_PASSWORD_ERROR,
  payload: { message },
});
export const dispatchResetPasswordSuccess = message => ({
  type: C.RESET_PASSWORD_SUCCESS,
  payload: { message },
});
export const dispatchClearResetPasswordMessage = message => ({
  type: C.CLEAR_RESET_PASSWORD_MESSAGE,
  payload: { message },
});
export const dispatchResetResetPassword = () => ({
  type: C.RESET_RESET_PASSWORD_FETCH,
  payload: {},
});

export const dispatchFetchMe = force => ({
  type: C.FETCH_ME,
  payload: {},
  meta: { force },
});
export const dispatchFetchMePending = () => ({
  type: C.FETCH_ME_PENDING,
  payload: {},
});
export const dispatchFetchMeError = message => ({
  type: C.FETCH_ME_ERROR,
  payload: message,
});
export const dispatchFetchMeSuccess = (me: User) => ({
  type: C.FETCH_ME_SUCCESS,
  payload: { me },
});

export const dispatchUpdateMe = me => ({
  type: C.UPDATE_ME,
  payload: { me },
});
export const dispatchUpdateMePending = () => ({
  type: C.UPDATE_ME_PENDING,
  payload: {},
});
export const dispatchUpdateMeError = message => ({
  type: C.UPDATE_ME_ERROR,
  payload: { message },
});
export const dispatchClearUpdateMeMessage = () => ({
  type: C.CLEAR_UPDATE_ME_MESSAGE,
  payload: {},
});
export const dispatchUpdateMeSuccess = (me: User) => ({
  type: C.UPDATE_ME_SUCCESS,
  payload: { me },
});

export const dispatchUpdateMyAvatar = (image: any) => ({
  type: C.UPDATE_MY_AVATAR,
  payload: { image },
});
export const dispatchUpdateMyAvatarPending = () => ({
  type: C.UPDATE_MY_AVATAR_PENDING,
  payload: {},
});
export const dispatchUpdateMyAvatarError = message => ({
  type: C.UPDATE_MY_AVATAR_ERROR,
  payload: { message },
});
export const dispatchUpdateMyAvatarSuccess = (me: User) => ({
  type: C.UPDATE_MY_AVATAR_SUCCESS,
  payload: { me },
});
export const dispatchClearUpdateMyAvatarMessage = () => ({
  type: C.CLEAR_UPDATE_MY_AVATAR_MESSAGE,
  payload: {},
});

export const dispatchAppleLogin = credentials => ({
  type: C.APPLE_LOGIN,
  payload: { credentials },
});
export const dispatchAppleLoginPending = () => ({
  type: C.APPLE_LOGIN_PENDING,
  payload: {},
});
export const dispatchAppleLoginError = message => ({
  type: C.APPLE_LOGIN_ERROR,
  payload: { message },
});
export const dispatchAppleLoginSuccess = message => ({
  type: C.APPLE_LOGIN_SUCCESS,
  payload: { message },
});
export const dispatchClearAppleLoginMessage = () => ({
  type: C.CLEAR_APPLE_LOGIN_MESSAGE,
  payload: {},
});

export const dispatchFacebookLogin = (token: string) => ({
  type: C.FACEBOOK_LOGIN,
  payload: { token },
});
export const dispatchFacebookLoginPending = () => ({
  type: C.FACEBOOK_LOGIN_PENDING,
  payload: {},
});
export const dispatchFacebookLoginError = message => ({
  type: C.FACEBOOK_LOGIN_ERROR,
  payload: { message },
});
export const dispatchFacebookLoginSuccess = message => ({
  type: C.FACEBOOK_LOGIN_SUCCESS,
  payload: { message },
});
export const dispatchClearFacebookLoginMessage = () => ({
  type: C.CLEAR_FACEBOOK_LOGIN_MESSAGE,
  payload: {},
});

export const dispatchGoogleLogin = (credentials: GoogleUser) => ({
  type: C.GOOGLE_LOGIN,
  payload: { credentials },
});
export const dispatchGoogleLoginPending = () => ({
  type: C.GOOGLE_LOGIN_PENDING,
  payload: {},
});
export const dispatchGoogleLoginError = message => ({
  type: C.GOOGLE_LOGIN_ERROR,
  payload: { message },
});
export const dispatchGoogleLoginSuccess = message => ({
  type: C.GOOGLE_LOGIN_SUCCESS,
  payload: { message },
});
export const dispatchClearGoogleLoginMessage = () => ({
  type: C.CLEAR_GOOGLE_LOGIN_MESSAGE,
  payload: {},
});

export const dispatchChangePassword = data => ({
  type: C.CHANGE_PASSWORD,
  payload: { ...data },
});
export const dispatchChangePasswordPending = () => ({
  type: C.CHANGE_PASSWORD_PENDING,
  payload: {},
});
export const dispatchChangePasswordError = message => ({
  type: C.CHANGE_PASSWORD_ERROR,
  payload: { message },
});
export const dispatchChangePasswordSuccess = message => ({
  type: C.CHANGE_PASSWORD_SUCCESS,
  payload: { message },
});
export const dispatchClearChangePasswordMessage = () => ({
  type: C.CLEAR_CHANGE_PASSWORD_MESSAGE,
  payload: {},
});

export const dispatchPostSupportMessage = data => ({
  type: C.POST_SUPPORT_MESSAGE,
  payload: { ...data },
});
export const dispatchPostSupportMessagePending = () => ({
  type: C.POST_SUPPORT_MESSAGE_PENDING,
  payload: {},
});
export const dispatchPostSupportMessageError = message => ({
  type: C.POST_SUPPORT_MESSAGE_ERROR,
  payload: { message },
});
export const dispatchPostSupportMessageSuccess = message => ({
  type: C.POST_SUPPORT_MESSAGE_SUCCESS,
  payload: { message },
});
export const dispatchClearPostSupportMessageMessage = () => ({
  type: C.CLEAR_POST_SUPPORT_MESSAGE_MESSAGE,
  payload: {},
});

export const dispatchDeleteAccount = password => ({
  type: C.DELETE_ACCOUNT,
  payload: { password },
});
export const dispatchDeleteAccountPending = () => ({
  type: C.DELETE_ACCOUNT_PENDING,
  payload: {},
});
export const dispatchDeleteAccountSuccess = message => ({
  type: C.DELETE_ACCOUNT_SUCCESS,
  payload: { message },
});
export const dispatchDeleteAccountError = message => ({
  type: C.DELETE_ACCOUNT_ERROR,
  payload: { message },
});
export const dispatchClearDeleteAccountMessage = () => ({
  type: C.CLEAR_DELETE_ACCOUNT_MESSAGE,
  payload: {},
});

export const dispatchGetUserMeta = force => ({
  type: C.GET_USER_META,
  payload: {},
  meta: { force },
});
export const dispatchGetUserMetaPending = () => ({
  type: C.GET_USER_META_PENDING,
  payload: {},
});
export const dispatchGetUserMetaSuccess = userMeta => ({
  type: C.GET_USER_META_SUCCESS,
  payload: { userMeta },
});
export const dispatchGetUserMetaError = message => ({
  type: C.GET_USER_META_ERROR,
  payload: { message },
});
export const dispatchClearGetUserMetaMessage = () => ({
  type: C.CLEAR_GET_USER_META_MESSAGE,
  payload: {},
});

export const dispatchGetUserMetaKey = (metaKey, force) => ({
  type: C.GET_USER_META_KEY,
  payload: { metaKey },
  meta: { force },
});
export const dispatchGetUserMetaKeyPending = () => ({
  type: C.GET_USER_META_KEY_PENDING,
  payload: {},
});
export const dispatchGetUserMetaKeySuccess = (metaKey, metaValue) => ({
  type: C.GET_USER_META_KEY_SUCCESS,
  payload: { metaKey, metaValue },
});
export const dispatchGetUserMetaKeyError = message => ({
  type: C.GET_USER_META_KEY_ERROR,
  payload: { message },
});
export const dispatchClearGetUserMetaKeyMessage = () => ({
  type: C.CLEAR_GET_USER_META_KEY_MESSAGE,
  payload: {},
});

export const dispatchSetUserMetaKey = (metaKey, metaValue) => ({
  type: C.SET_USER_META_KEY,
  payload: { metaKey, metaValue },
});
export const dispatchSetUserMetaKeyPending = () => ({
  type: C.SET_USER_META_KEY_PENDING,
  payload: {},
});
export const dispatchSetUserMetaKeySuccess = (metaKey, metaValue) => ({
  type: C.SET_USER_META_KEY_SUCCESS,
  payload: { metaKey, metaValue },
});
export const dispatchSetUserMetaKeyError = message => ({
  type: C.SET_USER_META_KEY_ERROR,
  payload: { message },
});
export const dispatchClearSetUserMetaKeyMessage = () => ({
  type: C.CLEAR_SET_USER_META_KEY_MESSAGE,
  payload: {},
});

export const dispatchLogout = () => ({
  type: LOGOUT_INIT,
  payload: {},
});

export const dispatchResetStore = () => ({
  type: LOGOUT,
  payload: {},
});
