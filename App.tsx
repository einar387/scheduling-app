import React, { useEffect, useState } from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableES5 } from 'immer';
import { NavigationContainer } from '@react-navigation/native';
import * as Device from 'expo-device';

import { SetupUserBot } from '@/components/SetupUserBot';
import * as Sentry from '@/sentry';
import { storeFactory, initialState } from '@/store';
import { Strings } from '@/constants';
import { Main } from '@/Main';
import { navigationRef, isReadyRef } from '@/helpers/NavigationService';
// import StorybookUI from './.storybook';

enableES5();

AppRegistry.registerComponent(Strings.appName, () => App);

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs([
  "Deprecation in 'createStackNavigator'",
  'Invalid prop `textStyle` supplied to `PhoneInput`',
  'SentryError: SDK not enabled',
  'Unsafe legacy lifecycles will not be called',
  'componentWillUpdate has been renamed, and',
  'componentWillReceiveProps has been renamed, and',
  'componentWillMount has been renamed, and',
  'Remote debugger is in a background tab',
  "Modal with 'fullScreen'",
]);

const { store, persistor } = storeFactory(initialState);

// Load fonts
const loadFonts = async () => {
  try {
    return await Font.loadAsync({
      FontAwesome: require('./src/assets/fonts/fontawesome-webfont.ttf'),
      PTSansBold: require('./src/assets/fonts/PTSansBold.ttf'),
      PTSansRegular: require('./src/assets/fonts/PTSansRegular.ttf'),
      Baloo2Bold: require('./src/assets/fonts/Baloo2-Bold.ttf'),
      Baloo2SemiBold: require('./src/assets/fonts/Baloo2-SemiBold.ttf'),
      Baloo2Regular: require('./src/assets/fonts/Baloo2-Regular.ttf'),
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
  }

  return null;
};

// Load images
const loadImages = async () => {
  const images = [
    require('./src/assets/images/weather-clear.jpg'),
    require('./src/assets/images/weather-rain.jpg'),
    require('./src/assets/images/blank-profile.png'),
    require('./src/assets/images/prova-steve.jpg'),
    require('./src/assets/images/fb-logo.png'),
    require('./src/assets/images/g-logo.png'),
    require('./src/assets/images/add.png'),
  ];

  // Preload assets
  await Asset.loadAsync(images);
};

// Check for updates
const checkForUpdates = async () => {
  if (__DEV__) return;

  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log('error', error);
    Sentry.captureException(error);
  }
};

type Props = {};

const App: React.FC<Props> = () => {
  // const { isConnected } = useNetInfo();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadFonts();
      await loadImages();
      // if (isConnected)
      await checkForUpdates();
      await SplashScreen.hideAsync();
      const type = await Device.getDeviceTypeAsync();
      if (type === Device.DeviceType.TABLET)
        await ScreenOrientation.unlockAsync();

      setReady(true);
    };

    init();
  }, []);

  if (!store || !ready) return null;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              // @ts-ignore
              isReadyRef.current = true;
            }}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Main persistor={persistor} />
            </GestureHandlerRootView>
          </NavigationContainer>
          <SetupUserBot />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
// export default StorybookUI;
