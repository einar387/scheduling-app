import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 0,
    zIndex: 9,
  },

  col0: {
    // flex: 4,
    width: '10%',
    maxWidth: 36,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  col1: {
    // flex: 3,
    width: '65%',
    flexGrow: 2,
  },
  col2: {
    // flex: 3,
    // width: 124,
    width: '25%',
  },
  addBannerContainer: {
    marginTop: -50,
  },

  swipableItemContainer: {
    marginBottom: 0,
  },

  swipeableItem: {
    width: '100%',
    marginBottom: 0,
    height: Design.tableRowHeight,
  },

  swipeableItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Design.tableRowHeight,
    paddingRight: 10,
  },

  swipeableButton: {
    height: 40,
    maxWidth: 80,
    minWidth: 80,
    marginLeft: 8,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },

  swipeableButtonText: {
    fontSize: 14,
  },
});
