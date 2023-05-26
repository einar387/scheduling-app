import { Dimensions } from 'react-native';
import { Orientation } from 'expo-screen-orientation';
import { produce } from 'immer';

import { LOGOUT } from '@/constants';
import {
  toFetchState,
  toFetchPending,
  toFetchError,
  toFetchSuccess,
} from '@/helpers';
import * as C from './constants';

const initialWindow = Dimensions.get('window');
// console.log('initialWindow', initialWindow.width, initialWindow.height);

export const initialState = {
  // User
  me: null,
  token: '',
  userMeta: null,
  setupComplete: false,
  numRequestErrors: 0,
  // Server time
  timeOffset: 0,
  // Internet connection
  netState: null,
  // Device
  deviceOrientation:
    initialWindow.height >= initialWindow.width
      ? Orientation.PORTRAIT_UP
      : Orientation.LANDSCAPE_LEFT,
  windowWidth: initialWindow.width,
  windowHeight: initialWindow.height,
  // Fetches
  loginFetch: toFetchState(),
  signupFetch: toFetchState(),
  appleLoginFetch: toFetchState(),
  facebookLoginFetch: toFetchState(),
  googleLoginFetch: toFetchState(),
  closeAccountFetch: toFetchState(),
  getMeFetch: toFetchState(),
  updateMeFetch: toFetchState(),
  updateMyAvatarFetch: toFetchState(),
  sendOtpFetch: toFetchState(),
  loginOtpFetch: toFetchState(),
  forgotPasswordFetch: toFetchState(),
  resetPasswordFetch: toFetchState(),
  changePasswordFetch: toFetchState(),
  postSupportMessageFetch: toFetchState(),
  getUserMetaFetch: toFetchState(),
  setUserMetaKeyFetch: toFetchState(),
};

const reducer = produce((state, action: StandardAction) => {
  switch (action.type) {
    case 'persist/REHYDRATE': {
      if (!action.payload) break;

      const { user: userState = {} } = action.payload;
      const { me, token, userMeta } = userState;

      state.me = me;
      state.token = token;
      state.userMeta = null; // userMeta;
      state.setupComplete = false;
      state.timeOffset = 0;
      state.netState = null;
      state.numRequestErrors = 0;

      state.loginFetch = toFetchState();
      state.signupFetch = toFetchState();
      state.appleLoginFetch = toFetchState();
      state.facebookLoginFetch = toFetchState();
      state.googleLoginFetch = toFetchState();
      state.closeAccountFetch = toFetchState();
      state.getMeFetch = toFetchState();
      state.updateMeFetch = toFetchState();
      state.updateMyAvatarFetch = toFetchState();
      state.sendOtpFetch = toFetchState();
      state.loginOtpFetch = toFetchState();
      state.forgotPasswordFetch = toFetchState();
      state.resetPasswordFetch = toFetchState();
      state.changePasswordFetch = toFetchState();
      state.postSupportMessageFetch = toFetchState();
      state.getUserMetaFetch = toFetchState();
      state.setUserMetaKeyFetch = toFetchState();

      break;
    }

    case C.SET_USER:
      state.me = action.payload.me;
      break;
    case C.SET_TOKEN:
      state.token = action.payload.token;
      break;
    case C.SET_USER_AND_TOKEN:
      state.me = action.payload.me;
      state.token = action.payload.token;
      break;
    case C.SET_SETUP_COMPLETE:
      state.setupComplete = action.payload.setupComplete;
      break;
    case C.INCREMENT_REQUEST_ERRORS:
      state.numRequestErrors = (state.numRequestErrors || 0) + 1;
      break;

    case C.SET_SERVER_TIME_OFFSET:
      state.timeOffset = action.payload.offset;
      break;

    case C.SET_NET_STATE:
      state.netState = action.payload.netState;
      break;

    case C.SET_DEVICE_ORIENTATION: {
      const { orientation, width, height } = action.payload;

      state.deviceOrientation = orientation;
      state.windowWidth = width;
      state.windowHeight = height;

      break;
    }

    case C.ATTEMPT_LOGIN_PENDING:
      // state.me = null;
      // state.token = null;
      state.loginFetch = toFetchPending();

      break;
    case C.ATTEMPT_LOGIN_ERROR:
      state.me = null;
      state.token = null;
      state.loginFetch = toFetchError(action);

      break;
    case C.ATTEMPT_LOGIN_SUCCESS:
      state.loginFetch = toFetchSuccess(action, state.loginFetch);

      break;
    case C.CLEAR_LOGIN_MESSAGE:
      state.loginFetch.message = '';

      break;

    case C.ATTEMPT_SIGNUP_PENDING:
      state.me = null;
      state.token = null;
      state.signupFetch = toFetchPending();

      break;
    case C.ATTEMPT_SIGNUP_ERROR:
      state.me = null;
      state.token = null;
      state.signupFetch = toFetchError(action);

      break;
    case C.ATTEMPT_SIGNUP_SUCCESS:
      state.signupFetch = toFetchSuccess(action, state.signupFetch);

      break;
    case C.CLEAR_SIGNUP_MESSAGE:
      state.signupFetch.message = '';

      break;

    case C.FORGOT_PASSWORD_PENDING:
      state.forgotPasswordFetch = toFetchPending();

      break;

    case C.FORGOT_PASSWORD_ERROR:
      state.forgotPasswordFetch = toFetchError(action);

      break;

    case C.FORGOT_PASSWORD_SUCCESS:
      state.forgotPasswordFetch = toFetchSuccess(
        action,
        state.forgotPasswordFetch
      );

      break;
    case C.CLEAR_FORGOT_PASSWORD_MESSAGE:
      state.forgotPasswordFetch.message = '';

      break;

    case C.SEND_OTP_PENDING:
      state.sendOtpFetch = toFetchPending();

      break;
    case C.SEND_OTP_ERROR:
      state.sendOtpFetch = toFetchError(action);

      break;
    case C.SEND_OTP_SUCCESS:
      state.sendOtpFetch = toFetchSuccess(action, state.sendOtpFetch);

      break;
    case C.CLEAR_SEND_OTP_MESSAGE:
      state.sendOtpFetch.message = '';

      break;

    case C.LOGIN_OTP_PENDING:
      state.loginOtpFetch = toFetchPending();

      break;
    case C.LOGIN_OTP_ERROR:
      state.loginOtpFetch = toFetchError(action);

      break;
    case C.LOGIN_OTP_SUCCESS:
      state.loginOtpFetch = toFetchSuccess(action, state.loginOtpFetch);

      break;
    case C.CLEAR_LOGIN_OTP_MESSAGE:
      state.loginOtpFetch.message = '';

      break;
    case C.RESET_FORGOT_PASSWORD_FETCH:
      state.forgotPasswordFetch = toFetchState();

      break;

    case C.RESET_PASSWORD_PENDING:
      state.resetPasswordFetch = toFetchPending();

      break;
    case C.RESET_PASSWORD_ERROR:
      state.resetPasswordFetch = toFetchError(action);

      break;
    case C.RESET_PASSWORD_SUCCESS:
      state.resetPasswordFetch = toFetchSuccess(
        action,
        state.resetPasswordFetch
      );

      break;
    case C.CLEAR_RESET_PASSWORD_MESSAGE:
      state.resetPasswordFetch.message = '';

      break;
    case C.RESET_RESET_PASSWORD_FETCH:
      state.resetPasswordFetch = toFetchState();

      break;

    case C.CHANGE_PASSWORD_PENDING:
      state.changePasswordFetch = toFetchPending();

      break;
    case C.CHANGE_PASSWORD_ERROR:
      state.changePasswordFetch = toFetchError(action);

      break;
    case C.CHANGE_PASSWORD_SUCCESS:
      state.changePasswordFetch = toFetchSuccess(
        action,
        state.changePasswordFetch
      );

      break;
    case C.CLEAR_CHANGE_PASSWORD_MESSAGE:
      state.changePasswordFetch.message = '';

      break;

    case C.POST_SUPPORT_MESSAGE_PENDING:
      state.postSupportMessageFetch = toFetchPending();

      break;
    case C.POST_SUPPORT_MESSAGE_ERROR:
      state.postSupportMessageFetch = toFetchError(action);

      break;
    case C.POST_SUPPORT_MESSAGE_SUCCESS:
      state.postSupportMessageFetch = toFetchSuccess(
        action,
        state.postSupportMessageFetch
      );

      break;
    case C.CLEAR_POST_SUPPORT_MESSAGE_MESSAGE:
      state.postSupportMessageFetch.message = '';

      break;

    case C.FETCH_ME_PENDING:
      state.getMeFetch = toFetchPending();

      break;
    case C.FETCH_ME_ERROR:
      state.me = null;
      state.token = null;
      state.getMeFetch = toFetchError(action);

      break;
    case C.FETCH_ME_SUCCESS:
      state.me = action.payload.me;
      state.getMeFetch = toFetchSuccess(action, state.getMeFetch);

      break;

    case C.UPDATE_ME_PENDING:
      state.updateMeFetch = toFetchPending();
      break;
    case C.UPDATE_ME_ERROR:
      state.updateMeFetch = toFetchError(action);
      break;
    case C.UPDATE_ME_SUCCESS:
      state.me = action.payload.me;
      state.updateMeFetch = toFetchSuccess(action, state.updateMeFetch);

      break;
    case C.CLEAR_UPDATE_ME_MESSAGE:
      state.updateMeFetch.message = '';

      break;

    case C.UPDATE_MY_AVATAR_PENDING:
      state.updateMyAvatarFetch = toFetchPending();

      break;
    case C.UPDATE_MY_AVATAR_ERROR:
      state.updateMyAvatarFetch = toFetchError(action);

      break;
    case C.UPDATE_MY_AVATAR_SUCCESS:
      state.me = action.payload.me;
      state.updateMyAvatarFetch = toFetchSuccess(
        action,
        state.updateMyAvatarFetch
      );

      break;
    case C.CLEAR_UPDATE_MY_AVATAR_MESSAGE:
      state.updateMyAvatarFetch.message = '';

      break;

    case C.APPLE_LOGIN_PENDING:
      state.appleLoginFetch = toFetchPending();

      break;
    case C.APPLE_LOGIN_ERROR:
      state.appleLoginFetch = toFetchError(action);

      break;
    case C.APPLE_LOGIN_SUCCESS:
      state.appleLoginFetch = toFetchSuccess(action, state.appleLoginFetch);

      break;
    case C.CLEAR_APPLE_LOGIN_MESSAGE:
      state.appleLoginFetch.message = '';

      break;

    case C.FACEBOOK_LOGIN_PENDING:
      state.facebookLoginFetch = toFetchPending();
      break;

    case C.FACEBOOK_LOGIN_ERROR:
      state.facebookLoginFetch = toFetchError(action);
      break;

    case C.FACEBOOK_LOGIN_SUCCESS:
      state.facebookLoginFetch = toFetchSuccess(
        action,
        state.facebookLoginFetch
      );

      break;
    case C.CLEAR_FACEBOOK_LOGIN_MESSAGE:
      state.facebookLoginFetch.message = '';

      break;

    case C.GOOGLE_LOGIN_PENDING:
      state.googleLoginFetch = toFetchPending();

      break;
    case C.GOOGLE_LOGIN_ERROR:
      state.googleLoginFetch = toFetchError(action);

      break;
    case C.GOOGLE_LOGIN_SUCCESS:
      state.googleLoginFetch = toFetchSuccess(action, state.googleLoginFetch);

      break;
    case C.CLEAR_GOOGLE_LOGIN_MESSAGE:
      state.googleLoginFetch.message = '';

      break;

    case C.GET_USER_META_PENDING:
      state.getUserMetaFetch = toFetchPending();

      break;
    case C.GET_USER_META_ERROR:
      state.getUserMetaFetch = toFetchError(action);

      break;
    case C.GET_USER_META_SUCCESS: {
      const { userMeta } = action.payload;

      state.userMeta = userMeta;
      state.getUserMetaFetch = toFetchSuccess(action, state.getUserMetaFetch);

      break;
    }
    case C.CLEAR_GET_USER_META_MESSAGE:
      state.getUserMetaFetch.message = '';

      break;

    case C.SET_USER_META_KEY_PENDING:
      state.setUserMetaKeyFetch = toFetchPending();

      break;
    case C.SET_USER_META_KEY_ERROR:
      state.setUserMetaKeyFetch = toFetchError(action);

      break;
    case C.SET_USER_META_KEY_SUCCESS: {
      const { metaKey, metaValue } = action.payload;

      if (!state.userMeta) state.userMeta = {};

      state.userMeta[metaKey] = metaValue;
      state.setUserMetaKeyFetch = toFetchSuccess(
        action,
        state.setUserMetaKeyFetch
      );

      break;
    }
    case C.CLEAR_SET_USER_META_KEY_MESSAGE:
      state.setUserMetaKeyFetch.message = '';

      break;

    case C.DELETE_ACCOUNT_PENDING:
      state.closeAccountFetch = toFetchPending();

      break;
    case C.DELETE_ACCOUNT_ERROR:
      state.closeAccountFetch = toFetchError(action);

      break;
    case C.DELETE_ACCOUNT_SUCCESS:
      state.closeAccountFetch = toFetchSuccess(action, state.closeAccountFetch);

      break;
    case C.CLEAR_DELETE_ACCOUNT_MESSAGE:
      state.closeAccountFetch.message = '';

      break;

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}, initialState);

export default reducer;
