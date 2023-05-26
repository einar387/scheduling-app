import { StyleSheet } from 'react-native';
// import { Design } from '@/constants';

import * as vars from '@/styles/variables';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 42,
    // backgroundColor: Design.defaultSessionTypeColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    borderBottomWidth: 1,
    borderBottomColor: vars.middleGrey,
    marginTop: 36,
  },

  label: {},
});
