import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';
import { Design } from '@/constants';

export default StyleSheet.create({
  gradient: {
    height: Design.tableRowHeight - 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
});
