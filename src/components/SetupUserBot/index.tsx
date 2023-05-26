import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';

import * as UserSelectors from '@/store/user/selectors';
import * as UserActions from '@/store/user/actions';
import * as NetworkSelectors from '@/store/network/selectors';
import * as NetworkActions from '@/store/network/actions';
import { setupUser } from '@/helpers';
import {
  PermissionStatus,
  requestTrackingPermissionsAsync,
} from 'expo-tracking-transparency';

export type Props = {};

export const SetupUserBot: React.FC<Props> = () => {
  const [netListener, setNetListener] = useState<NetInfoSubscription>();

  const me = useSelector(UserSelectors.selectMe);
  const token = useSelector(UserSelectors.selectToken);
  const setupComplete = useSelector(UserSelectors.selectSetupComplete);
  const trackingStatus = useSelector(NetworkSelectors.selectTrackingStatus);

  const dispatch = useDispatch();
  const setSetupComplete = (setupComplete: boolean) =>
    dispatch(UserActions.dispatchSetSetupComplete(setupComplete));
  const setNetState = (netState: NetInfoState) =>
    dispatch(UserActions.dispatchSetNetState(netState));
  const setTrackingStatus = (status: PermissionStatus) =>
    dispatch(NetworkActions.dispatchSetTrackingStatus(status));

  const handleNetChange = (netState: NetInfoState) => setNetState(netState);

  useEffect(() => {
    const init = async () => {
      const netState = await NetInfo.fetch();

      setNetState(netState);
      setNetListener(NetInfo.addEventListener(handleNetChange));
    };

    init();

    return () => {
      if (netListener) netListener();
    };
  }, []);

  useEffect(() => {
    setupUser(me, token, trackingStatus);
    // if (me && token && !setupComplete) setSetupComplete(true);
    if (!setupComplete) setSetupComplete(true);
  }, [me, token, trackingStatus]);

  useEffect(() => {
    const fetch = async () => {
      const { status } = await requestTrackingPermissionsAsync();

      console.log('status', status);

      setTrackingStatus(status);
    };

    if (setupComplete) fetch();
  }, [setupComplete]);

  return null;
};
