import { StyleSheet } from 'react-native';

import { Design } from '@/constants';
import * as vars from '@/styles/variables';

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    width: '100%',
    height: Design.inputHeight,
    marginBottom: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderBottomColor: vars.borderColor,
    borderBottomWidth: 1,
  },

  inputContainerMultiline: {
    minHeight: 108,
    marginTop: 7,
    borderBottomWidth: 0,
  },

  inputContainerFocused: {
    borderBottomWidth: 3,
  },

  inputContainerError: {
    borderBottomColor: vars.danger,
    borderBottomWidth: 3,
  },

  input: {
    width: '100%',
    height: 36,
    fontSize: 18,
    alignSelf: 'center',
    color: vars.readableDark,
  },

  inputMultiline: {
    ...vars.border,
    borderBottomWidth: 1,
    minHeight: 108,
    textAlignVertical: 'top',
    fontSize: 16,
    padding: 7,
    marginBottom: 0, // !important
  },

  inputMultilineError: {
    borderColor: vars.danger,
  },

  inputFocused: {
    marginBottom: -2,
    // borderBottomWidth: 1,
    // borderBottomColor: vars.borderColor,
  },

  showPasswordContainer: {
    position: 'absolute',
    right: 10,
    top: 21,
  },

  showPasswordButton: {
    fontSize: 20,
  },
});

export default styles;
