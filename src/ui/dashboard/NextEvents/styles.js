import { Design } from '@/constants';
import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';

export default StyleSheet.create({
  content: {
    paddingBottom: 7,
    minHeight: 100
  },

  eventContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    height: Design.tableRowHeight,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: vars.borderColor,
    borderBottomWidth: 1,
  },

  eventLeft: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  eventRight: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
  },

  eventTitle: {
    marginBottom: 0,
    padding: 0,
  },

  eventSubtitle: {
    color: vars.grey,
    fontSize: 12,
  },

  eventTextRight: {
    fontSize: 14,
  },
});
