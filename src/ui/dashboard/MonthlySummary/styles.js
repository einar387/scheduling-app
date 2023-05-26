import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';
// import { Design } from '@/constants';

export default StyleSheet.create({
  sessionSummary: {
    // marginBottom: 30,
    minHeight: 200,
  },
  options: {
    marginBottom: 21,
    flexDirection: 'row',
    padding: 0,
  },
  option: {
    marginRight: 14,
  },
  active: {
    color: vars.readableDark,
  },
  chartContainer: {
    marginTop: 14,
    height: 200,
    overflow: 'hidden',
  },
  barChart: {
    borderRadius: 40,
    transform: [{ translateX: -20 }],
  },
});
