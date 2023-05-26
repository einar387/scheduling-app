import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';

export default StyleSheet.create({
  headerContainer: {
    // height: 184,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    lineHeight: 36,
    letterSpacing: 0.8,
    color: vars.primaryColor,
    textAlign: 'center',
    marginTop: 8,
  },
  lastSessionText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    color: vars.grey,
    textAlign: 'center',
    marginTop: 2,
  },
});
