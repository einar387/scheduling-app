import { RootState } from '@/types';

export const selectNetState = (state: RootState) => state.network.netState;
export const selectTrackingStatus = (state: RootState) =>
  state.network.trackingStatus;
