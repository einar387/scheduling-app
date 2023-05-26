import { StyleSheet } from 'react-native';

// import * as vars from '@/styles/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    minHeight: 100,
  },

  center: {
    flex: 1,
    overflow: 'hidden',
  },

  content: {
    position: 'absolute',
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 1,
  },
});
