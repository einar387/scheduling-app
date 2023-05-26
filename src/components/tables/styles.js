import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

export default StyleSheet.create({
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
