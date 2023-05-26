import * as Contacts from 'expo-contacts';
import { Platform, Alert, Linking, NativeModules } from 'react-native';

export const requestContactPermission = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  return status;
};

export const checkContactPermission = async () => {
  const { status } = await Contacts.getPermissionsAsync();
  return status;
};

export const getUserContacts = async () => {
  const contacts = await Contacts.getContactsAsync();
  return contacts;
};

export const fetchUserContacts = async () => {
  return new Promise(function (resolve, reject) {
    checkContactPermission()
      .then(res => {
        if (res === 'granted') {
          getUserContacts()
            .then(allContacts => {
              resolve(allContacts);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          requestContactPermission()
            .then(status => {
              resolve(status);
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

const { RNAndroidOpenSettings } = NativeModules;

export const openAppSetting = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    RNAndroidOpenSettings.appDetailsSettings();
  }
};

export const openAppSettingAlert = async () => {
  return new Promise(function (resolve, reject) {
    checkContactPermission()
      .then(status => {
        if (status !== 'granted') {
          Alert.alert(
            'Please Allow Contact Permission',
            'Your contact services need to be turned on to import clients.',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  resolve(status);
                },
              },
              {
                text: 'Settings',
                onPress: () => {
                  resolve(status);
                  openAppSetting();
                },
              },
            ]
          );
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
