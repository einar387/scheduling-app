import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

export default StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  inner: {
    width: '100%',
    maxWidth: Design.maxWidth,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  contactContainer: {
    width: '100%',
  },

  detailsContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    marginBottom: 0,
  },

  col0: {
    // flex: 4,
    width: '70%',
  },
  col1: {
    // flex: 3,
    width: '30%',
  },
  col2: {
    // flex: 3,
    width: '20%',
  },

  warningIcon: {
    color: `${vars.danger}cc`,
    marginBottom: 1,
  },
  message: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
    zIndex: 3,
  },

  row: {
    width: '100%',
    height: Design.tableRowHeight,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: vars.middleGrey,
    backgroundColor: '#fff',
  },

  col: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: Design.tableRowHeight,
    paddingRight: 5,
    textAlign: 'left',
  },
});
