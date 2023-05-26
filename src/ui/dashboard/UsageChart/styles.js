import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';
// import { Design } from '@/constants';

const dateHeight = 23;

export default StyleSheet.create({
  usageChart: {
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
  },
  chartInner: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 0,
    marginLeft: 0,
  },
  usageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usageCircle: {
    padding: 4,
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: vars.successHover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usageCircleActive: { backgroundColor: vars.successHover },
  line: {
    flex: 1,
    height: 2,
    maxWidth: 20,
    width: '100%',
    marginBottom: 20,
    backgroundColor: vars.middleGrey,
  },
  checkIcon: { color: '#fff', marginLeft: 3 },
  dateLabel: {
    fontFamily: vars.fontBody,
    color: vars.readableDark,
    lineHeight: dateHeight,
    fontSize: 14,
  },
  totalCircle: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: vars.middleGrey,
    marginBottom: dateHeight,
    marginLeft: 2,
  },
  totalLabel: {
    fontSize: 18,
    color: vars.readableDark,
    paddingBottom: 4,
    lineHeight: 19,
  },
});
