import { all } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';

function* sagas() {
  yield all([fork(networkSaga, { pingInterval: 30000 } as any)]);
}

export default sagas;
