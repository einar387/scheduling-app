import React from 'react';
import { connect } from 'react-redux';
import {
  Linking,
  Alert,
  View,
  AppState,
  StatusBar,
  Vibration,
  Platform,
  Dimensions,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  NetInfoConnectedStates,
  NetInfoDisconnectedStates,
  NetInfoUnknownState,
} from '@react-native-community/netinfo';
import { Persistor } from 'redux-persist';
import moment from 'moment-timezone';

import * as SessionTypesActions from '@/store/sessionTypes/actions';
import * as CalendarActions from '@/store/calendar/actions';
import * as UserSelectors from '@/store/user/selectors';
import * as CalendarSelectors from '@/store/calendar/selectors';
import * as NetworkSelectors from '@/store/network/selectors';
import * as UserActions from '@/store/user/actions';
// import * as TutorialSelectors from '@/store/tutorial/selectors';
// import * as TutorialActions from '@/store/tutorial/actions';
// import IntroTutorial from '@/ui/tutorial/IntroTutorial';
import NavigationService from '@/helpers/NavigationService';
import { toFetchState } from '@/helpers';
import { APP_STORE_LINK, Design } from '@/constants';
import AcceptTermsModal from '@/components/AcceptTermsModal';
import * as Sentry from '@/sentry';
import analytics from '@/analytics';
import { AuthedStack, WelcomeStack } from '@/routes';
import {
  CalendarEvent,
  FetchState,
  RootState,
  SmallEvent,
  User,
} from './types';
import { isDevice } from 'expo-device';

// import globalStyles from '@/styles';
import * as vars from '@/styles/variables';
import { Dispatch } from 'redux';

export type OwnProps = {
  persistor: Persistor;
};
export type ConnectedProps = {
  me: User | null;
  setupComplete: boolean;
  calendarEvents: SmallEvent[];
  pgEventsById: Record<string, CalendarEvent>;
  calendarEventFetches: Record<string, FetchState>;
};
export type DispatchProps = {
  fetchMe: (force?: boolean) => void;
  updateMe: (me: User) => void;
  getUserMeta: () => void;
  fetchSessionTypes: (force?: boolean) => void;
  fetchCalendarEvent: (eventId: string, force: boolean) => void;
  setDeviceOrientation: (orientation, width, height) => void;
};
export type Props = OwnProps & ConnectedProps & DispatchProps;
export type State = {
  appState: AppStateStatus;
  timeWentInactive: string | null;
  newVersionAlertTimeout: number;
  userTappedNotificationEventId: string | null;
};

class MainApp extends React.PureComponent<Props, State> {
  state: Readonly<State> = {
    appState: AppState.currentState,
    timeWentInactive: null,
    newVersionAlertTimeout: 0,
    userTappedNotificationEventId: null,
  };

  notificationSubscription: ScreenOrientation.Subscription | null = null;
  orientationSubscription: ScreenOrientation.Subscription | null = null;
  stateChangeListener: NativeEventSubscription | null = null;

  async componentDidMount() {
    // Listen for app state changes
    this.stateChangeListener = AppState.addEventListener(
      'change',
      this.handleAppStateChange
    );

    // This listener is fired whenever a user taps on or interacts with a notification
    // (works when app is foregrounded, backgrounded, or killed).
    // This listener is especially useful for routing users to a
    // particular screen after they tap on a particular notification.
    this.notificationSubscription =
      Notifications.addNotificationResponseReceivedListener(
        this.handleNotification
      );

    this.orientationSubscription =
      ScreenOrientation.addOrientationChangeListener(
        this.handleOrientationChange
      );

    // Lock portrait mode for phones
    if (!Design.isTablet) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }

  async componentDidUpdate(prevProps) {
    const {
      me,
      setupComplete,
      calendarEvents,
      calendarEventFetches,
      pgEventsById,
    } = this.props;
    const { userTappedNotificationEventId } = this.state;

    // Send initial user data
    if (!prevProps.setupComplete && setupComplete) {
      this.fetchStuff();
      this.sendUserInfo();
    }

    // Start intro tutorial
    // if (
    //   userMeta &&
    //   prevProps.getUserMetaFetch.pending &&
    //   !getUserMetaFetch.pending
    // ) {
    //   if (userMeta.shouldDisplayMobileAppTutorial) {
    //     setIntroTutStep(0);
    //     setIntroTutActive(true);
    //   }
    // }

    // Activate account popup
    if (!prevProps.setupComplete && setupComplete) {
      if (!__DEV__ && me && !me.is_activated) {
        Alert.alert(
          `Don't get locked out! Please activate your account.`,
          'Check your email inbox for instructions.',
          [
            {
              text: 'Okay',
              style: 'default',
            },
          ],
          { cancelable: true }
        );
      }
    }

    // User tapped a notification
    if (userTappedNotificationEventId) {
      const pgEvent = pgEventsById[userTappedNotificationEventId.split('-')[0]];
      const prevFetch =
        prevProps.calendarEventFetches[String(userTappedNotificationEventId)] ||
        toFetchState();
      const fetch =
        calendarEventFetches[String(userTappedNotificationEventId)] ||
        toFetchState();

      if (pgEvent || (prevFetch.pending && !fetch.pending)) {
        this.setState({ userTappedNotificationEventId: null });

        const found = calendarEvents.find(
          c => String(c.id) === String(userTappedNotificationEventId)
        );

        if (found) {
          setTimeout(
            () =>
              NavigationService.navigate('Calendar', {
                screen: 'CalendarEventScreen',
                params: {
                  eventId: userTappedNotificationEventId,
                },
              }),
            1
          );

          return;
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.stateChangeListener) this.stateChangeListener.remove();

    if (this.orientationSubscription) {
      ScreenOrientation.removeOrientationChangeListener(
        this.orientationSubscription
      );
    }
  }

  fetchStuff = () => {
    const {
      setupComplete,
      fetchMe,
      // fetchClients,
      getUserMeta,
      fetchSessionTypes,
    } = this.props;

    if (!setupComplete) return;

    fetchMe();
    getUserMeta();
    // fetchClients();
    fetchSessionTypes(); // Will not halt AppLoading

    this.sendUserInfo();
  };

  registerForPushNotificationsAsync = async () => {
    const { me } = this.props;

    let expoPushToken = me?.expo_push_token || '';

    if (isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return expoPushToken;
      }

      try {
        const obj = await Notifications.getExpoPushTokenAsync();
        if (obj) expoPushToken = obj.data;
      } catch (error) {
        Sentry.captureException(error);
        console.error(error);
      }
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        lightColor: vars.primaryColor,
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    return expoPushToken;
  };

  handleOrientationChange = event => {
    setTimeout(() => {
      const { width: width, height } = Dimensions.get('window');

      this.props.setDeviceOrientation(
        event.orientationInfo.orientation,
        width,
        height
      );
    }, 10);
  };

  handleNewVersionAlert = () => {
    const { me } = this.props;
    const { newVersionAlertTimeout } = this.state;

    const time = new Date().getTime();

    if (!me || time < newVersionAlertTimeout) return;

    const appVersion = Constants?.manifest?.version || '0.0';
    const availableAppVersion = me.available_app_version;

    console.log('appVersion', appVersion);
    console.log('availableAppVersion', availableAppVersion);

    // Display an alert if there is a new app version
    if (availableAppVersion && appVersion !== availableAppVersion) {
      // Wait before displaying again
      this.setState({ newVersionAlertTimeout: time + 3600000 }); // 1hr

      // Calculate some number based off the version, not sure if this is correct
      const appVerSplit = appVersion.split('.');
      const appVerNum =
        parseInt(appVerSplit[0]) * 100 +
        parseInt(appVerSplit[1]) * 10 +
        parseInt(appVerSplit[2]);
      const availVerSplit = availableAppVersion.split('.');
      const availVerNum =
        parseInt(availVerSplit[0]) * 100 +
        parseInt(availVerSplit[1]) * 10 +
        parseInt(availVerSplit[2]);

      console.log('diff version detected!');
      console.log(`current ${appVersion} (${appVerNum})`);
      console.log(`available ${availableAppVersion} (${availVerNum})`);

      // Make sure the version is actually newer, not just different
      if (availVerNum > appVerNum) {
        analytics.track('(Mobile) Display New Version Alert', {});

        Alert.alert(
          `New App version available!`,
          `v${availableAppVersion} is now active. Please download for the latest experience.`,
          [
            {
              text: 'Later',
              onPress: () => console.log('Later Pressed'),
              style: 'cancel',
            },
            {
              text: 'Update',
              onPress: () => Linking.openURL(APP_STORE_LINK as string),
              style: 'default',
            },
          ],
          { cancelable: true }
        );
      }
    }
  };

  sendUserInfo = async () => {
    const { me, updateMe } = this.props;

    if (!me) return;
    // if (__DEV__) return;

    // console.log('sending user info');

    // Collect user info
    const tz = me.tz || moment.tz.guess();
    const appVersion = Constants?.manifest?.version;
    const expoPushToken = await this.registerForPushNotificationsAsync();

    if (
      me.expo_push_token !== expoPushToken ||
      me.app_version !== appVersion ||
      me.tz !== tz
    ) {
      analytics.track('(Mobile) Send User Info', {});

      // Send user info to server
      updateMe({
        ...me,
        expo_push_token: expoPushToken,
        app_version: appVersion,
        tz,
      });
    }

    // Maybe display a new version alert
    this.handleNewVersionAlert();
  };

  handleNotification = action => {
    const { fetchCalendarEvent } = this.props;
    Vibration.vibrate();

    console.log('NOTIFICATION', action);

    if (action && action.notification?.request?.content) {
      const { eventId } = action.notification?.request.content.data || {};

      analytics.track('(Mobile) Recieved Event Notification', { eventId });

      if (eventId) {
        this.setState({ userTappedNotificationEventId: eventId });
        fetchCalendarEvent(eventId, true);
      }
    }
  };

  handleAppStateChange = nextAppState => {
    const { appState, timeWentInactive } = this.state;

    if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      // console.log('App is going away!')
      this.setState({ timeWentInactive: moment().format() });
    }

    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // console.log('App has come to the foreground!')

      // Maybe display a new version alert when the user returns
      this.handleNewVersionAlert();

      // If it's been more than 1hr
      if (
        moment().isAfter(
          moment(timeWentInactive || undefined).add(30, 'minute')
        )
      ) {
        // console.log('Fetching data again');
        // Fetch user data again
        this.fetchStuff();
      }

      // Set initial orientation
      // this.props.setDeviceOrientation(isPortrait() ? 'portrait' : 'landscape');
    }

    this.setState({ appState: nextAppState });
  };

  render() {
    const { me, setupComplete } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

        {me && !me.has_accepted_terms ? <AcceptTermsModal /> : null}
        {/* <IntroTutorial /> */}

        {setupComplete && me ? <AuthedStack /> : null}
        {!setupComplete || !me ? <WelcomeStack /> : null}
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): ConnectedProps => ({
  me: UserSelectors.selectMe(state),
  setupComplete: UserSelectors.selectSetupComplete(state),
  calendarEvents: CalendarSelectors.selectEvents(state),
  pgEventsById: CalendarSelectors.selectPgEventsById(state),
  calendarEventFetches: CalendarSelectors.selectGetCalendarEventFetches(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchMe: (force?: boolean) => dispatch(UserActions.dispatchFetchMe(force)),
  updateMe: (me: User) => dispatch(UserActions.dispatchUpdateMe(me)),
  getUserMeta: () => dispatch(UserActions.dispatchGetUserMeta()),
  fetchSessionTypes: (force?: boolean) =>
    dispatch(SessionTypesActions.dispatchFetchSessionTypes(force)),
  fetchCalendarEvent: (eventId: string, force: boolean) =>
    dispatch(CalendarActions.dispatchFetchCalendarEvent(eventId, force)),
  setDeviceOrientation: (orientation, width, height) =>
    dispatch(
      UserActions.dispatchSetDeviceOrientation(orientation, width, height)
    ),
});

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainApp);
