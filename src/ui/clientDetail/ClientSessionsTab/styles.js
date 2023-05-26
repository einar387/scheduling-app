import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

const styles = StyleSheet.create({
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

  clientName: {
    marginBottom: 14,
    paddingHorizontal: 21,
    textAlign: 'center',
  },

  editClientFormContainer: {
    ...vars.border,
    width: '100%',
    padding: 14,
  },

  numberStepperContainer: {
    ...vars.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 21,
    marginTop: 7,
    marginBottom: 7,
    width: '100%',
  },

  isEditing: {
    // backgroundColor: vars.lightGrey,
  },

  editSessionContainer: {
    ...vars.border,
    paddingVertical: 14,
    paddingLeft: 14,
    marginLeft: 14,
  },

  sectionTitleRight: {
    marginBottom: 21,
  },

  notFoundText: {
    alignSelf: 'center',
    color: vars.grey,
    lineHeight: 50,
    height: 50,
  },

  bigNumber: {
    fontSize: 28,
    lineHeight: 36,
    marginLeft: 7,
    letterSpacing: 0.8,
    color: vars.readableDark,
  },

  sessionHistoryContainer: {
    minHeight: 200,
    width: '100%',
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
