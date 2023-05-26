import { NetInfoState } from '@react-native-community/netinfo';
import { PermissionStatus } from 'expo-tracking-transparency';

export type NetworkState = {
  netState: NetInfoState | null;
  trackingStatus: PermissionStatus | null;
};
