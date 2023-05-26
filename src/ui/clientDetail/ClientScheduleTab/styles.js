import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
// import * as vars from '@/styles/variables';

const styles = StyleSheet.create({
  container: {
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

  moreContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default styles;
