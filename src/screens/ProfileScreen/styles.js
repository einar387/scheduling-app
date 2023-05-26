import { StyleSheet } from 'react-native';

import * as vars from '@/styles/variables';

export default StyleSheet.create({
  container: {
    position: 'relative',
    padding: 0,
    paddingHorizontal: 0,
  },

  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    // borderWidth: 3,
    // borderColor: vars.borderColor,
  },

  title: {
    marginTop: 14,
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  h2: {
    marginTop: 24,
    marginBottom: 0,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  h3: {
    marginTop: 6,
    marginBottom: 18,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  // editForm: {
  // },

  dropdownContainer: {
    width: '100%',
  },

  picker: {},

  inputContainer: {
    borderBottomColor: vars.borderColor,
    borderBottomWidth: 1,
  },

  editLabel: {
    marginTop: 18,
  },

  changeAvatarButton: {
    marginTop: 4,
  },

  versionLabel: {
    marginTop: 30,
    alignSelf: 'center',
    color: vars.secondaryColor,
  },

  avatarContainer: {
    position: 'relative',
  },

  proPill: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: vars.primaryColor,
    paddingVertical: 0,
    paddingHorizontal: 5,
    borderRadius: 8,
  },

  pillText: {
    color: '#fff',
    fontFamily: vars.fontTitleBold,
    fontSize: 12,
  },
});
