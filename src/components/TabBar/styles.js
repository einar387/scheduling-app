import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';

const styles = StyleSheet.create({
  tabsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: vars.middleGrey,
    borderTopWidth: 1,
  },

  tabButton: {
    // flex: 1,
  },

  tabView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    height: 50,
  },

  tabViewActive: {
    borderBottomColor: vars.borderColor,
  },

  tabText: {
    fontSize: 18,
    fontFamily: vars.fontTitle,
    lineHeight: 30,
    letterSpacing: 0.5,
  },

  tabTextActive: {
    fontFamily: vars.fontTitleBold,
  },
});

export default styles;
