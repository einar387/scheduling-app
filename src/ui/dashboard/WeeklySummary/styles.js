import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

export default StyleSheet.create({
  weeklySummary: {
    position: 'relative',
    width: '100%',
  },
  longText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  label: {
    fontSize: 15,
    letterSpacing: 0.4,
  },
  labelSm: {
    color: vars.darkGrey,
    letterSpacing: 0.2,
  },
  chartInner: {
    width: '100%',
    minHeight: 195,
    marginTop: 4,
  },
  donutContainer: {
    flex: 1,
    maxWidth: Design.maxWidth - 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: Design.isTablet ? 'space-between' : 'space-around',
    marginTop: 7,
    paddingRight: 2,
  },

  donutLeft: {
    width: 150,
    marginLeft: -34,
    marginRight: 28,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  donutInner: {
    maxWidth: 150,
    position: 'relative',
  },

  donutRight: {
    alignSelf: 'center',
  },

  listItem: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 4,
    alignItems: 'center',
  },

  listClient: {
    marginLeft: 3,
    marginRight: 7,
    fontSize: 14,
  },

  listClientPercent: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
    letterSpacing: 0.1,
  },
});
