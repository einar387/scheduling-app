import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';

const styles = StyleSheet.create({
  introContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
    paddingVertical: 64,
    color: '#fff',
  },

  dimmerStep0: {
    bottom: 83,
  },
  dimmerStep1: {
    top: 92,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    // paddingVertical: 21,
    // paddingHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 14,
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1.0,
    shadowRadius: 50,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
  },

  labels: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 21,
    alignItems: 'center',
  },

  navContainer: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  navButtonContainer: {
    flex: 1,
  },
  navButton: {
    paddingVertical: 7,
    paddingHorizontal: 0,
    width: '100%',
  },

  titleContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginBottom: 21,
    backgroundColor: vars.tertiaryColor,
    paddingVertical: 4,
  },
  titleText: {
    fontSize: 19,
    fontFamily: vars.fontTitleBold,
    color: vars.black,
    letterSpacing: 0.9,
  },
  titleStep: {
    position: 'absolute',
    top: 8,
    right: 8,
    letterSpacing: 1,
    // paddingTop: 4,
  },

  text: {
    textAlign: 'left',
    marginBottom: 10,
    width: '100%',
  },
});

export default styles;
