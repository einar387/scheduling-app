import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

export default StyleSheet.create({
  textContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  hasIcon: {
    marginLeft: 4,
  },
});
