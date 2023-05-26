import { StyleSheet, Dimensions } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export default StyleSheet.create({
  top: {
    // flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  bottom: {
    // height: 40,
    // paddingBottom: 21,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeIcon: {
    color: vars.primaryColor,
  },

  iconsContainer: {
    marginTop: 21,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  icon: {},

  content: {
    marginTop: 21,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
    paddingBottom: 0,
  },

  header: {
    flexWrap: 'wrap',
    color: vars.readableDark,
    marginBottom: 0,
    paddingBottom: 0,
  },

  subtitle: {
    marginTop: 14,
  },

  bold: {
    color: vars.primaryColor,
    fontFamily: vars.fontTitleBold,
    fontSize: 20,
    lineHeight: 25,
    paddingTop: 5,
  },

  text: {
    lineHeight: 25,
    marginBottom: 0,
    fontFamily: vars.fontTitleSemiBold,
  },

  trackingText: {
    flexDirection: 'row',
    marginTop: 30,
    flexWrap: 'wrap',
    maxWidth: '100%',
    lineHeight: 18,
    alignItems: 'center',
  },
});
