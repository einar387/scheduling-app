import { StyleSheet, Dimensions } from 'react-native';

import * as vars from '@/styles/variables';

const { width } = Dimensions.get('window');

const LIST_WIDTH = 476;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    height: '100%',
    paddingLeft: LIST_WIDTH > width ? 0 : (width - LIST_WIDTH) / 2,
    // paddingRight: 30,
    paddingVertical: 8,
    alignSelf: 'center',
  },

  listContainer: {
    width: LIST_WIDTH,
    justifyContent: 'space-between',
  },

  item: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: vars.middleGrey,
    backgroundColor: '#fff',
    // paddingTop: 8,
    paddingRight: 16,
    // paddingBottom: 6,
    paddingLeft: 16,
    marginRight: 0,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
  },

  activeItem: {
    borderColor: vars.primaryColor,
    backgroundColor: vars.secondaryColor,
  },
  lastItem: {
    marginRight: 15,
  },
  activeLabel: {
    color: vars.readableLight,
  },

  label: {
    fontSize: 16,
    lineHeight: 32,
    color: vars.grey,
    letterSpacing: 0.5,
  },
});

export default styles;
