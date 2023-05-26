import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as PaymentActions from '@/store/payment/actions';
import * as PaymentSelectors from '@/store/payment/selectors';
import {
  GET_PRICES,
  GET_PORTAL_SESSION,
  POST_CHECKOUT_SESSION,
} from '@/store/payment/constants';
import ApiService from '@/helpers/ApiService';
import { get2 } from '@/sagas';
import { Strings } from '@/constants';
import analytics from '@/analytics';
import { handleErrorMessage } from '@/helpers';

const getPrices = (): any =>
  get2({
    label: '(Mobile) Get Prices',
    fetch: ApiService.getPrices,
    prevData: PaymentSelectors.selectPrices,
    fetchSelector: PaymentSelectors.selectGetPricesFetch,
    pendingCreator: PaymentActions.dispatchGetPricesPending,
    successCreator: PaymentActions.dispatchGetPricesSuccess,
    errorCreator: PaymentActions.dispatchGetPricesError,
  });

const getPortalSession = (): any =>
  get2({
    label: '(Mobile) Get Portal Session',
    fetch: ApiService.getPortalSession,
    prevData: PaymentSelectors.selectPortalUrl,
    fetchSelector: PaymentSelectors.selectGetPortalSessionFetch,
    pendingCreator: PaymentActions.dispatchGetPortalSessionPending,
    successCreator: PaymentActions.dispatchGetPortalSessionSuccess,
    errorCreator: PaymentActions.dispatchGetPortalSessionError,
  });

function* postCheckoutSession(action): Generator {
  const { data } = action.payload;

  analytics.track('(Mobile) Payment Checkout Session', {});

  yield put(PaymentActions.dispatchPostCheckoutSessionPending());

  try {
    const result = yield call(ApiService.postCheckoutSession, data);

    const { success, data: _data, message } = result.data || {};

    if (success && _data) {
      // Success
      yield put(
        PaymentActions.dispatchPostCheckoutSessionSuccess(_data, message)
      );
    } else {
      yield put(
        PaymentActions.dispatchPostCheckoutSessionError(
          message || Strings.defaultError
        )
      );
    }
  } catch (error) {
    const message = handleErrorMessage(error);

    yield put(PaymentActions.dispatchPostCheckoutSessionError(message));
  }
}

function* sagas(): Generator {
  yield fork(takeLatest, GET_PRICES.base, getPrices());
  yield fork(takeLatest, GET_PORTAL_SESSION.base, getPortalSession());
  yield fork(takeLatest, POST_CHECKOUT_SESSION.base, postCheckoutSession);
}

export default sagas;
