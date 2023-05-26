import { NetInfoState } from '@react-native-community/netinfo';
import { PermissionStatus } from 'expo-tracking-transparency';

import * as C from './constants';

export const dispatchSetNetState = (netState: NetInfoState) => ({
  type: C.SET_NET_STATE,
  payload: { netState },
});

export const dispatchSetTrackingStatus = (
  trackingStatus: PermissionStatus
) => ({
  type: C.SET_TRACKING_STATUS,
  payload: { trackingStatus },
});
