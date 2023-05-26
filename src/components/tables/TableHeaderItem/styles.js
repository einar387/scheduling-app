import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    // paddingTop: 7
  },

  sortIndicator: {
    fontSize: 10,
    color: vars.primaryColor,
    marginLeft: 4,
  },

  rowHeaderText: {
    color: vars.secondaryColor,
    lineHeight: 32,
  },
});
