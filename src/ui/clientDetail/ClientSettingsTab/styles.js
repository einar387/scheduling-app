import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
// import * as vars from '@/styles/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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

  communications: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 30,
  },
});
