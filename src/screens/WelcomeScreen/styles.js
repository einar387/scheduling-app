import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },

  container: {
    padding: 0,
    paddingHorizontal: 30,
    margin: 0,
    backgroundColor: '#fff',
  },

  logoContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingBottom: 42,
  },
  logoContainerLandscape: {
    marginTop: 18,
  },

  logoSession: {
    color: vars.primaryColor,
    fontFamily: vars.fontTitleBold,
    fontSize: 24,
    lineHeight: 30,
  },

  logoTracker: {
    color: vars.primaryColor,
    fontFamily: vars.fontTitle,
    fontSize: 24,
    lineHeight: 30,
  },

  title: {
    marginTop: 24,
  },

  subtitle: {
    paddingHorizontal: 30,
    marginBottom: 21,
  },

  tabs: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  tabContent: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
});
