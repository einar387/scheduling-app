import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';

import * as UserActions from '@/store/user/actions';
import * as UserSelectors from '@/store/user/selectors';
import { Message } from '@/components/Message';
import Button from '@/components/Button';
import * as Sentry from '@/sentry';
import appleIcon from '@/assets/images/apple-logo.png';
// import fbIcon from '@/assets/images/fb-logo.png';
import gIcon from '@/assets/images/g-logo.png';
import {
  APPLE_STORAGE_ID,
  GOOGLE_STORAGE_ID,
  APPLE_SECRET,
  GOOGLE_CONFIG,
} from './constants';

import { Strings } from '@/constants';

// import styles from './styles';

export type Props = {
  isLogin: boolean;
};

export const SocialLoginOptions: React.FC<Props> = props => {
  const { isLogin } = props;

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest(GOOGLE_CONFIG);

  const [appleCredentials, setAppleCredentials] = useState<any>();
  const [googleCredentials, setGoogleCredentials] = useState<any>();
  const [generalAuthError, setGeneralAuthError] = useState<string | null>();

  const appleLoginError = useSelector(UserSelectors.selectAppleLoginError);
  // const facebookLoginError = useSelector(UserSelectors.selectFacebookLoginError);
  const googleLoginError = useSelector(UserSelectors.selectGoogleLoginError);
  const dispatch = useDispatch();
  const appleLogin = (token: string) =>
    dispatch(UserActions.dispatchAppleLogin(token));
  // const facebookLogin = (token: string) =>
  //   dispatch(UserActions.dispatchFacebookLogin(token));
  const googleLogin = credentials =>
    dispatch(UserActions.dispatchGoogleLogin(credentials));
  const clearAppleLoginError = () =>
    dispatch(UserActions.dispatchClearAppleLoginMessage());
  // const clearFacebookLoginError = () => dispatch(UserActions.dispatchClearFacebookLoginMessage());
  const clearGoogleLoginError = () =>
    dispatch(UserActions.dispatchClearGoogleLoginMessage());

  useEffect(() => {
    const readLoginTokens = async () => {
      try {
        // Attempt to read AsyncStorage
        const storedAppleCreds = await AsyncStorage.getItem(APPLE_STORAGE_ID);
        // const storedFbToken = await AsyncStorage.getItem(FACEBOOK_STORAGE_ID);
        const storedGoogleCreds = await AsyncStorage.getItem(GOOGLE_STORAGE_ID);
        // Otherwise a quick login will generate a warning
        setAppleCredentials(JSON.parse(storedAppleCreds || 'null'));
        // setFacebookAccessToken(storedFbToken);
        setGoogleCredentials(JSON.parse(storedGoogleCreds || 'null'));
      } catch (error) {
        Sentry.captureException(error);
        console.error(error);
      }
    };

    readLoginTokens();
  }, []);

  useEffect(() => {
    writeLoginToken(APPLE_STORAGE_ID, '');
    setAppleCredentials(null);
  }, [appleLoginError]);

  useEffect(() => {
    writeLoginToken(GOOGLE_STORAGE_ID, '');
    setGoogleCredentials(null);
  }, [googleLoginError]);

  const writeLoginToken = async (name: string, token?: string) => {
    try {
      // Write to AsyncStorage
      if (token) {
        AsyncStorage.setItem(name, token);
      } else {
        AsyncStorage.removeItem(name);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }
  };

  const handleAppleLogin = async () => {
    const handleFail = (error?: Error) => {
      // Clear token, just incase token expired?
      writeLoginToken(APPLE_STORAGE_ID, '');
      setGeneralAuthError(error?.message || Strings.defaultError);

      if (error) {
        Sentry.captureException(error);
      }
    };

    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        state: APPLE_SECRET,
      });

      const validCreds = credentials && credentials.user ? true : false;

      const { user, email, state, identityToken } = validCreds
        ? credentials
        : appleCredentials || {};

      // apToken = identityToken;

      if (state !== APPLE_SECRET) {
        handleFail(new Error('Apple Secret does not match.'));

        return;
      }

      // Save token (if email is provided)
      if (validCreds) {
        writeLoginToken(APPLE_STORAGE_ID, JSON.stringify(credentials));
        setAppleCredentials(credentials);
      }
      // Send credentials to server
      appleLogin(
        (validCreds ? credentials : appleCredentials) ||
          credentials ||
          appleCredentials
      );
    } catch (err: any) {
      console.log('err', err);
      if (err?.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
        handleFail();
      } else {
        // handle other errors
        handleFail(err);
      }
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse;

      const fetchUserInfo = async token => {
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        let user = await response.json();
        if (!user) user = googleCredentials || {};

        const credentials = {
          ...authentication,
          type: googleResponse.type,
          user: {
            ...user,
            id: user.sub,
          },
        };

        setGoogleCredentials(googleCredentials);
        writeLoginToken(GOOGLE_STORAGE_ID, JSON.stringify(credentials));
        googleLogin(credentials);
      };

      if (authentication?.accessToken)
        fetchUserInfo(authentication.accessToken);
    } else {
      writeLoginToken(GOOGLE_STORAGE_ID, '');
    }
  }, [googleResponse]);

  const handleClearGenError = () => setGeneralAuthError('');

  const appleError = appleLoginError ? (
    <Message
      type="error"
      message={appleLoginError}
      onPress={clearAppleLoginError}
    />
  ) : null;
  // const facebookError = facebookLoginError ? (
  //   <Message
  //     type="error"
  //     message={facebookLoginError}
  //     onPress={clearFacebookLoginError}
  //   />
  // ) : null;
  const googleError = googleLoginError ? (
    <Message
      type="error"
      message={googleLoginError}
      onPress={clearGoogleLoginError}
    />
  ) : null;
  const generalError = generalAuthError ? (
    <Message
      type="error"
      message={generalAuthError}
      onPress={handleClearGenError}
    />
  ) : null;

  return (
    <View style={{ marginBottom: 24 }}>
      {generalError}
      {Platform.OS === 'ios' ? (
        <View style={{ marginTop: 7 }}>
          {appleError}
          <Button
            wide
            // Apple needs this to be "Sign in"...
            label={`${isLogin ? 'Sign in' : 'Sign up'} with Apple`}
            onPress={handleAppleLogin}
            imageLeftSrc={appleIcon}
          />
        </View>
      ) : null}
      {/* <View style={{ marginTop: Platform.OS === 'ios' ? 14 : 7 }}>
        {facebookError}
        <Button
          wide
          label={`${isLogin ? 'Log in' : 'Sign up'} with Facebook`}
          onPress={this.handleFacebookLogin}
          imageLeftSrc={fbIcon}
        />
      </View> */}
      <View style={{ marginTop: 14 }}>
        {googleError}
        <Button
          wide
          label={`${isLogin ? 'Log in' : 'Sign up'} with Google`}
          onPress={() => googlePromptAsync()}
          imageLeftSrc={gIcon}
        />
      </View>
    </View>
  );
};
