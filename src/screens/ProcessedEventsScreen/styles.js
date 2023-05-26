import { StyleSheet } from 'react-native';

import {
  rowHeight,
  rightMenuWidth,
} from '@/components/ProcessedEventRow/styles';
import * as vars from '@/styles/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 0,
    paddingBottom: 0,
    paddingTop: 0,
    // position: 'relative',
  },
  list: {
    height: '100%',
    padding: 0,
    paddingTop: 10,
    margin: 0,
  },
  listHeader: {
    width: '100%',
    // height: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
    paddingLeft: 21,
    paddingRight: 21,
    paddingBottom: 21,
    zIndex: 4,

    elevation: 1,
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
  },
  listHeaderInner: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 5,
  },

  listFooter: {
    width: '100%',
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 42,
    paddingHorizontal: 30,
  },

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: '#fff',
  },

  listHeaderIcon: {
    color: '#fff',
    zIndex: 5,
    marginBottom: 7,

    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  listHeaderTitle: {
    fontFamily: vars.fontTitleBold,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 2,
    zIndex: 5,

    // elevation: 1,
    // shadowColor: '#2b2b2b',
    // shadowOffset: { width: 1, height: 0 },
    // shadowOpacity: 0.0525,
    // shadowRadius: 1,
  },

  listHeaderText: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    zIndex: 5,
  },

  listHeaderLink: {
    marginTop: 21,
    // width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 5,
  },
  swipeableItem: {
    // width: '100%',
    height: rowHeight + 2,
    // zIndex: 3,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: vars.middleGrey,
  },

  swipeableItemRight: {
    width: rightMenuWidth,
    height: rowHeight,
    minHeight: rowHeight,
    backgroundColor: '#f0f0f0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 6,
  },

  undoButton: {
    height: 40,
    width: 60,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  undoText: {
    fontSize: 14,
    letterSpacing: 1.0,
    fontFamily: vars.fontTitleBold,
  },
});

export default styles;
