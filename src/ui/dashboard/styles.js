import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';
// import { Design } from '@/constants';

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 2,
    marginBottom: 21,
    width: '100%',
    borderColor: vars.secondaryColor,
    borderWidth: 1,
  },

  sectionTitleContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 13,
    backgroundColor: '#fff',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomColor: vars.secondaryColor,
    borderBottomWidth: 1,
  },

  sectionTitle: {
    fontSize: 16,
    letterSpacing: 0.8,
    color: vars.primaryColor,
  },

  sectionContent: {
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
});
