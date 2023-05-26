import produce from 'immer';

import { LOGOUT } from '@/constants';
import { AnyAction } from '@/types';
import * as C from './constants';
import { NetworkState } from './types';

export const initialState: NetworkState = {
  netState: null,
  trackingStatus: null,
};

const reducer = produce((state: NetworkState, action: AnyAction) => {
  switch (action.type) {
    case 'persist/REHYDRATE': {
      if (!action.payload) break;

      const { network: networkState = {} } = action.payload;
      const { trackingStatus } = networkState;

      state.netState = null;
      state.trackingStatus = trackingStatus || null;

      break;
    }

    case C.SET_NET_STATE:
      state.netState = action.payload.netState;

      break;

    case C.SET_TRACKING_STATUS:
      state.trackingStatus = action.payload.trackingStatus;

      break;

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}, initialState);

export default reducer;
