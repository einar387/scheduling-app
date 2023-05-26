import { delay } from 'redux-saga';
import { call, put, select, takeLatest, fork } from 'redux-saga/effects';

import * as UserActions from '@/store/user/actions';
import * as UserConstants from '@/store/user/constants';
import * as UserSelectors from '@/store/user/selectors';
import {
  setupUser,
  updateUser,
  handle401,
  handleErrorMessage,
  waitForMinLoadTime,
  shouldFetchRun,
} from '@/helpers';
import ApiService from '@/helpers/ApiService';
import analytics from '@/analytics';
import { Strings, Design, LOGOUT_INIT } from '@/constants';
// import * as Sentry from '@/sentry';

function* welcome(me, token) {
  // Write token and user
  yield put(UserActions.dispatchSetUserAndToken(me, token));
}

function* attemptLogin(action) {
  const { email, password } = action.payload;

  analytics.track('(Mobile) Attempt Login', {});

  yield put(UserActions.dispatchAttemptLoginPending());

  try {
    const result = yield call(ApiService.attemptLogin, email, password);

    const { success, message, data } = result.data;

    if (success && data && data.me) {
      const { me, token } = data;

      // Success
      yield put(UserActions.dispatchAttemptLoginSuccess());
      // Welcome
      yield call(welcome, me, token);
    } else {
      yield put(
        UserActions.dispatchAttemptLoginError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchAttemptLoginError(message));
  }
}

function* attemptSignup(action) {
  analytics.track('(Mobile) Attempt Signup', {});

  yield put(UserActions.dispatchAttemptSignupPending());

  try {
    const result = yield call(ApiService.attemptSignup, action.payload);

    const { success, message, data } = result.data;

    if (success && data && data.me) {
      const { me, token } = data;

      // Success
      yield put(UserActions.dispatchAttemptSignupSuccess());
      // Welcome
      yield call(welcome, me, token);
    } else {
      yield put(
        UserActions.dispatchAttemptSignupError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchAttemptSignupError(message));
  }
}

function* forgotPassword(action) {
  const { email } = action.payload;

  analytics.track('(Mobile) Forgot Password', { email });

  yield put(UserActions.dispatchForgotPasswordPending());

  try {
    const result = yield call(ApiService.forgotPassword, email);

    const { success, message } = result.data;

    if (success) {
      yield put(UserActions.dispatchForgotPasswordSuccess());
    } else {
      yield put(
        UserActions.dispatchForgotPasswordError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(
      UserActions.dispatchForgotPasswordError(message || Strings.defaultError)
    );
  }
}

function* sendOtp(action) {
  const { email } = action.payload;
  analytics.track('(Mobile) Email one-time send otp', { email });
  yield put(UserActions.dispatchSendOtpPending());

  try {
    const result = yield call(ApiService.sendOtp, email);
    const { success, message } = result.data;
    if (success) {
      yield put(UserActions.dispatchSendOtpSuccess(message));
    } else {
      yield put(
        UserActions.dispatchSendOtpError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);
    yield put(
      UserActions.dispatchSendOtpError(message || Strings.defaultError)
    );
  }
}

function* loginOtp(action) {
  const { email, otp } = action.payload;
  analytics.track('(Mobile) Email one-time password', { email });
  yield put(UserActions.dispatchLoginOtpPending());
  try {
    const result = yield call(ApiService.loginOtp, email, otp);

    const { success, message, data } = result.data;

    if (success && data && data.me) {
      const { me, token } = data;
      // Success
      yield put(UserActions.dispatchLoginOtpSuccess());
      // Welcome
      yield call(welcome, me, token);
    } else {
      yield put(
        UserActions.dispatchLoginOtpError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);
    yield put(
      UserActions.dispatchLoginOtpError(message || Strings.defaultError)
    );
  }
}

function* resetPassword(action) {
  const { email, token, password, confirmPassword } = action.payload;

  analytics.track('(Mobile) Reset Password', {});

  yield put(UserActions.dispatchResetPasswordPending());

  try {
    const result = yield call(ApiService.resetPassword, {
      email,
      token,
      password,
      confirmPassword,
    });

    const { success, message } = result.data;

    if (success) {
      yield put(UserActions.dispatchResetPasswordSuccess(message));
    } else {
      yield put(
        UserActions.dispatchResetPasswordError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchResetPasswordError(message));
  }
}

function* changePassword(action) {
  const { oldPassword, password, confirmPassword } = action.payload;

  analytics.track('(Mobile) Change Password', {});

  yield put(UserActions.dispatchChangePasswordPending());

  try {
    const result = yield call(ApiService.changeMyPassword, {
      oldPassword,
      password,
      confirmPassword,
    });
    const { success, message } = result.data;

    if (success) {
      yield put(UserActions.dispatchChangePasswordSuccess(message));
    } else {
      yield put(
        UserActions.dispatchChangePasswordError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchChangePasswordError(message));
  }
}

function* postSupportMessage(action) {
  const { to, subject, message } = action.payload;

  // console.log('to, subject, message', to, subject, message);
  analytics.track('(Mobile) Post Support Message', {});

  yield put(UserActions.dispatchPostSupportMessagePending());

  try {
    const result = yield call(ApiService.postSupportMessage, {
      subject,
      message,
    });
    const { success, message: _mess } = result.data;

    if (success) {
      yield put(UserActions.dispatchPostSupportMessageSuccess(_mess));
    } else {
      yield put(
        UserActions.dispatchPostSupportMessageError(
          _mess || Strings.defaultError
        )
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchPostSupportMessageError(message));
  }
}

function* appleLogin(action) {
  const { credentials } = action.payload;

  analytics.track('(Mobile) Apple Login', {});

  yield put(UserActions.dispatchAppleLoginPending());

  try {
    const result = yield call(ApiService.appleLogin, { credentials });

    const { success, message, data } = result.data;

    if (success && data && data.me) {
      const { me, token } = data;

      // Success
      yield put(UserActions.dispatchAppleLoginSuccess());
      // Welcome
      yield call(welcome, me, token);
    } else {
      yield put(
        UserActions.dispatchAppleLoginError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchAppleLoginError(message));
  }
}

function* facebookLogin(action) {
  const { token: access_token } = action.payload;

  analytics.track('(Mobile) Facebook Login', {});

  yield put(UserActions.dispatchFacebookLoginPending());

  try {
    const result = yield call(ApiService.facebookLogin, { access_token });

    const { success, message, data } = result.data;

    if (success && data && data.me) {
      const { me, token } = data;

      // Success
      yield put(UserActions.dispatchFacebookLoginSuccess());
      // Welcome
      yield call(welcome, me, token);
    } else {
      yield put(
        UserActions.dispatchFacebookLoginError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchFacebookLoginError(message));
  }
}

function* googleLogin(action) {
  const { credentials } = action.payload;

  analytics.track('(Mobile) Google Login', {});

  yield put(UserActions.dispatchGoogleLoginPending());

  try {
    const result = yield call(ApiService.googleLogin, { credentials });

    const { success, data } = result.data;

    if (success && data && data.me) {
      const { me, token } = data;

      // Success
      yield put(UserActions.dispatchGoogleLoginSuccess());
      // Welcome
      yield call(welcome, me, token);
    } else {
      yield put(UserActions.dispatchGoogleLoginError(Strings.defaultError));
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchGoogleLoginError(message));
  }
}

function* fetchMe(action) {
  const { force } = action.meta;

  const startTime = new Date().getTime();
  const prevData = yield select(UserSelectors.selectMe);
  const prevTime = yield select(UserSelectors.selectGetMeFetchTime);
  const netState = yield select(UserSelectors.selectNetState);

  if (netState && !netState.isInternetReachable) {
    console.log('not attempting fetch');
    return;
  }

  if (
    prevData &&
    !force &&
    prevTime &&
    startTime < prevTime + Design.fetchTimeout
  ) {
    console.log('too soon');
    return;
  }

  analytics.track('(Mobile) Fetch Me', {});

  yield put(UserActions.dispatchFetchMePending());

  try {
    const result = yield call(ApiService.fetchMe);

    // Implement minimum "loading" time
    const requestTime = new Date().getTime() - startTime;
    const additionalDelay =
      requestTime < Design.minFetchTime ? Design.minFetchTime - requestTime : 0;

    if (additionalDelay > 0) {
      yield delay(additionalDelay);
    }

    const { success, data, message } = result.data;

    if (success && data) {
      // Update user
      updateUser(data);
      // Success
      yield put(UserActions.dispatchFetchMeSuccess(data));
    } else {
      yield put(
        UserActions.dispatchFetchMeError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    // No need to log error...
    // User may not have signed up yet, or their token has expired
    // console.log(error, error.response, error.config)
    // Sentry.captureException(error)

    let message = Strings.defaultError;
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }

    yield put(UserActions.dispatchFetchMeError(message));
    // Check 401 status
    yield call(handle401, error);
  }
}

function* updateMe(action) {
  const { me } = action.payload;

  analytics.track('(Mobile) Update Me', {});

  yield put(UserActions.dispatchUpdateMePending());

  try {
    const result = yield call(ApiService.updateMe, me);

    const { success, data, message } = result.data;

    if (success && data) {
      // Update user
      updateUser(data);
      // Success
      yield put(UserActions.dispatchUpdateMeSuccess(data));
    } else {
      yield put(
        UserActions.dispatchUpdateMeError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchUpdateMeError(message));
    // Check 401 status
    yield call(handle401, error);
  }
}

function* updateMyAvatar(action) {
  const { image } = action.payload;

  analytics.track('(Mobile) Update My Avatar', {});

  yield put(UserActions.dispatchUpdateMyAvatarPending());

  try {
    const result = yield call(ApiService.updateMyAvatar, image);

    const { success, data, message } = result.data;

    if (success && data) {
      // Update user
      updateUser(data);
      // Success
      yield put(UserActions.dispatchUpdateMyAvatarSuccess(data));
    } else {
      yield put(
        UserActions.dispatchUpdateMyAvatarError(message || Strings.defaultError)
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(UserActions.dispatchUpdateMyAvatarError(message));
    // Check 401 status
    yield call(handle401, error);
  }
}

function* deleteAccount(action) {
  const { password } = action.payload;

  analytics.track('(Mobile) Close Account', {});

  yield put(UserActions.dispatchDeleteAccountPending());

  const startTime = new Date().getTime();

  try {
    const result = yield call(ApiService.deleteAccount, { password });

    yield call(waitForMinLoadTime, startTime, 800);

    const { success, message } = result.data;

    if (success) {
      yield put(UserActions.dispatchDeleteAccountSuccess(message));
      yield delay(500);
      yield call(logout);
    }
  } catch (error) {
    const message = handleErrorMessage(error);
    yield call(waitForMinLoadTime, startTime, 1000);

    yield put(
      UserActions.dispatchDeleteAccountError(message || Strings.defaultError)
    );
    // Check 401 status
    yield call(handle401, error);
  }
}

function* getUserMeta(action) {
  const { force } = action.meta;

  const startTime = new Date().getTime();
  const prevData = yield select(UserSelectors.selectUserMeta);
  const prevFetch = yield select(UserSelectors.selectGetUserMetaFetch);
  const shouldRun = yield call(
    shouldFetchRun,
    startTime,
    force,
    prevFetch,
    !!prevData
  );

  if (!shouldRun) return;

  analytics.track('(Mobile) Get User Meta', {});

  yield put(UserActions.dispatchGetUserMetaPending());

  try {
    const result = yield call(ApiService.getUserMeta);

    yield call(waitForMinLoadTime, startTime, 800);

    const { success, message, data } = result.data;

    if (success) {
      const { userMeta } = data;

      yield put(UserActions.dispatchGetUserMetaSuccess(userMeta));
    } else {
      yield put(UserActions.dispatchGetUserMetaError(message));
    }
  } catch (error) {
    const message = handleErrorMessage(error);
    yield call(waitForMinLoadTime, startTime, 1000);

    yield put(
      UserActions.dispatchGetUserMetaError(message || Strings.defaultError)
    );
    // Check 401 status
    yield call(handle401, error);
  }
}

function* setUserMetaKey(action) {
  const { metaKey, metaValue } = action.payload;

  analytics.track('(Mobile) Set User Meta', {});

  yield put(UserActions.dispatchSetUserMetaKeyPending());

  const startTime = new Date().getTime();

  try {
    const result = yield call(ApiService.setUserMetaKey, metaKey, metaValue);

    yield call(waitForMinLoadTime, startTime);

    const { success, message, data } = result.data;

    if (success) {
      const { metaKey, metaValue } = data;

      yield put(UserActions.dispatchSetUserMetaKeySuccess(metaKey, metaValue));
    } else {
      yield put(UserActions.dispatchSetUserMetaKeyError(message));
    }
  } catch (error) {
    const message = handleErrorMessage(error);
    yield call(waitForMinLoadTime, startTime);

    yield put(
      UserActions.dispatchSetUserMetaKeyError(message || Strings.defaultError)
    );
    // Check 401 status
    yield call(handle401, error);
  }
}

function* logout() {
  analytics.track('(Mobile) Logout', {});

  yield put(UserActions.dispatchResetStore());

  setupUser(null, null, null);
}

function* sagas() {
  yield fork(takeLatest, UserConstants.ATTEMPT_LOGIN, attemptLogin);
  yield fork(takeLatest, UserConstants.ATTEMPT_SIGNUP, attemptSignup);
  yield fork(takeLatest, UserConstants.SEND_OTP, sendOtp);
  yield fork(takeLatest, UserConstants.LOGIN_OTP, loginOtp);
  yield fork(takeLatest, UserConstants.FORGOT_PASSWORD, forgotPassword);
  yield fork(takeLatest, UserConstants.RESET_PASSWORD, resetPassword);
  yield fork(takeLatest, UserConstants.CHANGE_PASSWORD, changePassword);
  yield fork(takeLatest, UserConstants.APPLE_LOGIN, appleLogin);
  yield fork(takeLatest, UserConstants.FACEBOOK_LOGIN, facebookLogin);
  yield fork(takeLatest, UserConstants.GOOGLE_LOGIN, googleLogin);
  yield fork(takeLatest, UserConstants.FETCH_ME, fetchMe);
  yield fork(takeLatest, UserConstants.UPDATE_ME, updateMe);
  yield fork(
    takeLatest,
    UserConstants.POST_SUPPORT_MESSAGE,
    postSupportMessage
  );
  yield fork(takeLatest, UserConstants.UPDATE_MY_AVATAR, updateMyAvatar);
  yield fork(takeLatest, UserConstants.DELETE_ACCOUNT, deleteAccount);
  yield fork(takeLatest, UserConstants.GET_USER_META, getUserMeta);
  yield fork(takeLatest, UserConstants.SET_USER_META_KEY, setUserMetaKey);
  yield fork(takeLatest, LOGOUT_INIT, logout);
}

export default sagas;
