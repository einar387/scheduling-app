// User
export const selectMe = state => state.user.me;
export const selectToken = state => state.user.token;
export const selectSetupComplete = state => state.user.setupComplete;
export const selectNumRequestErrors = state => state.user.numRequestErrors;

// Server time
export const selectTimeOffset = state => state.user?.timeOffset;

// Device
export const selectDeviceOrientation = state => state.user.deviceOrientation;
export const selectNetState = state => state.user.netState;
export const selectWindowWidth = state => state.user.windowWidth;
export const selectWindowHeight = state => state.user.windowHeight;

// Login
export const selectLoginFetch = state => state.user.loginFetch;
export const selectLoginPending = state => state.user.loginFetch?.pending;
export const selectLoginSuccess = state => state.user.loginFetch?.success;
export const selectLoginMessage = state => state.user.loginFetch?.message;

// Signup
export const selectSignupFetch = state => state.user.signupFetch;
export const selectSignupPending = state => state.user.signupFetch?.pending;
export const selectSignupSuccess = state => state.user.signupFetch?.success;
export const selectSignupMessage = state => state.user.signupFetch?.message;

// Status
export const selectGetMeFetch = state => state.user.getMeFetch;
export const selectGetMeFetchPending = state => state.user.getMeFetch?.pending;
export const selectGetMeFetchSuccess = state => state.user.getMeFetch?.success;
export const selectGetMeFetchMessage = state => state.user.getMeFetch?.message;
export const selectGetMeFetchTime = state => state.user.getMeFetch?.time;

// Update profile
export const selectUpdateMeFetch = state => state.user.updateMeFetch;
export const selectUpdateMePending = state => state.user.updateMeFetch?.pending;
export const selectUpdateMeSuccess = state => state.user.updateMeFetch?.success;
export const selectUpdateMeMessage = state => state.user.updateMeFetch?.message;

// Support issue
export const selectPostSupportMessageFetch = state =>
  state.user.postSupportMessageFetch;
export const selectPostSupportMessagePending = state =>
  state.user.postSupportMessageFetch?.pending;
export const selectPostSupportMessageSuccess = state =>
  state.user.postSupportMessageFetch?.success;
export const selectPostSupportMessageMessage = state =>
  state.user.postSupportMessageFetch?.message;

// Update avatar
export const selectUpdateMyAvatarFetch = state =>
  state.user.updateMyAvatarFetch;
export const selectUpdateMyAvatarPending = state =>
  state.user.updateMyAvatarFetch?.pending;
export const selectUpdateMyAvatarSuccess = state =>
  state.user.updateMyAvatarFetch?.success;
export const selectUpdateMyAvatarError = state =>
  state.user.updateMyAvatarFetch?.message;

// Forgot password
export const selectForgotPasswordFetch = state =>
  state.user.forgotPasswordFetch;
export const selectForgotPasswordPending = state =>
  state.user.forgotPasswordFetch?.pending;
export const selectForgotPasswordSuccess = state =>
  state.user.forgotPasswordFetch?.success;
export const selectForgotPasswordError = state =>
  state.user.forgotPasswordFetch?.message;

// Send Otp
export const selectSendOtpFetch = state => state.user.sendOtpFetch;
export const selectSendOtpPending = state => state.user.sendOtpFetch?.pending;
export const selectSendOtpSuccess = state => state.user.sendOtpFetch?.success;
export const selectSendOtpError = state => state.user.sendOtpFetch?.message;

// Login Otp
export const selectLoginOtpFetch = state => state.user.loginOtpFetch;
export const selectLoginOtpPending = state => state.user.loginOtpFetch?.pending;
export const selectLoginOtpSuccess = state => state.user.loginOtpFetch?.success;
export const selectLoginOtpError = state => state.user.loginOtpFetch?.message;

// Reset Password
export const selectResetPasswordFetch = state => state.user.resetPasswordFetch;
export const selectResetPasswordPending = state =>
  state.user.resetPasswordFetch?.pending;
export const selectResetPasswordSuccess = state =>
  state.user.resetPasswordFetch?.success;
export const selectResetPasswordMessage = state =>
  state.user.resetPasswordFetch?.message;
export const selectResetPasswordError = state =>
  state.user.resetPasswordFetch?.message;

// Change Password
export const selectChangePasswordFetch = state =>
  state.user.changePasswordFetch;

// Apple login
export const selectAppleLoginFetch = state => state.user.appleLoginFetch;
export const selectAppleLoginPending = state =>
  state.user.appleLoginFetch?.pending;
export const selectAppleLoginSuccess = state =>
  state.user.appleLoginFetch?.success;
export const selectAppleLoginError = state =>
  state.user.appleLoginFetch?.message;

// Facebook login
export const selectFacebookLoginFetch = state => state.user.facebookLoginFetch;
export const selectFacebookLoginPending = state =>
  state.user.facebookLoginFetch?.pending;
export const selectFacebookLoginSuccess = state =>
  state.user.facebookLoginFetch?.success;
export const selectFacebookLoginError = state =>
  state.user.facebookLoginFetch?.message;

// Google login
export const selectGoogleLoginFetch = state => state.user.googleLoginFetch;
export const selectGoogleLoginPending = state =>
  state.user.googleLoginFetch?.pending;
export const selectGoogleLoginSuccess = state =>
  state.user.googleLoginFetch?.success;
export const selectGoogleLoginError = state =>
  state.user.googleLoginFetch?.message;

// Close Account
export const selectCloseAccountFetch = state => state.user.closeAccountFetch;
export const selectCloseAccountPending = state =>
  state.user.closeAccountFetch?.pending;
export const selectCloseAccountSuccess = state =>
  state.user.closeAccountFetch?.success;
export const selectCloseAccountError = state =>
  state.user.closeAccountFetch?.error;
export const selectCloseAccountMessage = state =>
  state.user.closeAccountFetch?.message;

// User Meta
export const selectUserMeta = state => state.user.userMeta;
export const selectGetUserMetaFetch = state => state.user.getUserMetaFetch;
export const selectSetUserMetaKeyFetch = state =>
  state.user.setUserMetaKeyFetch;
