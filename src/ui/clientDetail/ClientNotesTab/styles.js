import { StyleSheet } from 'react-native';
import * as vars from '@/styles/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.white,
    paddingTop: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  header: {
    minHeight: 60,
    padding: 10,
    backgroundColor: vars.white,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
  },
  content: {
    padding: 20,
    backgroundColor: vars.white,
    minHeight: 200,
    width: '100%',
    position: 'relative',
  },
  active: {
    backgroundColor: vars.white,
  },
  rowBorderDivider: {
    height: 0.5,
    width: '90%',
    backgroundColor: vars.borderColor,
    alignSelf: 'center',
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexContainer: {
    flex: 0.05,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.9,
  },

  indexTitle: {
    fontSize: 14,
  },
  checkBoxContainer: {
    flex: 0.05,
    marginLeft: 10,
  },
  dateTimeContainer: {
    flex: 0.5,
  },
  dateText: {
    fontSize: 16,
    color: vars.readableDark,
  },
  timeText: {
    fontSize: 14,
    color: vars.grey,
    marginTop: 2,
  },
  notesBodyContainer: {
    paddingTop: 5,
    paddingHorizontal: 7.5,
    marginBottom: 25.6,
    borderRadius: 5,
    marginTop: 8,
    borderColor: vars.borderColor,
  },
  presentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presentText: {
    fontSize: 16,
    color: vars.readableDark,
    marginLeft: 5,
  },

  input: {
    // marginHorizontal: 5,
    fontSize: 16,
    alignSelf: 'center',
    color: vars.readableDark,
  },
  editButtonContainer: {
    // padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 10,
  },
  viewContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    fontSize: 16,
    color: vars.secondaryColor,
    marginLeft: 5,
    marginBottom: 10,
  },
  fullHeightWidthContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: vars.white,
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    alignSelf: 'center',
    color: vars.grey,
    fontSize: 16,
  },
  dimmer: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: vars.secondaryWhite,
    zIndex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ----------
  text: {
    fontFamily: vars.fontBody,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: vars.readableDark,
  },
  date: {
    color: vars.primaryColor,
    fontSize: 16,
    lineHeight: 20,
  },
  time: {
    fontSize: 14,
    lineHeight: 20,
    color: vars.grey,
  },
  notesIcon: {
    lineHeight: 20,
    alignSelf: 'center',
    color: vars.grey,
    marginLeft: 7,
  },

  notesOptionsContainer: {
    height: 60,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '100%',
  },

  notesOptionButton: {
    maxWidth: '50%',
  },
});

export default styles;
