import produce from 'immer';

import {
  toFetchError,
  toFetchPending,
  toFetchState,
  toFetchSuccess,
} from '@/helpers';
import { LOGOUT } from '@/constants';
import {
  GET_PRICES,
  GET_PORTAL_SESSION,
  POST_CHECKOUT_SESSION,
} from './constants';
import { PaymentState } from './types';

export const initialState: PaymentState = {
  prices: null,
  portalUrl: '',
  checkoutId: '',
  checkoutUrl: '',

  getPricesFetch: toFetchState(),
  getPortalSessionFetch: toFetchState(),
  postCheckoutSessionFetch: toFetchState(),
};

const reducer = produce((state: PaymentState, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE': {
      if (!action.payload) break;

      const { payment: paymentState = {} } = action.payload;
      const { prices } = paymentState;

      state.prices = prices || null;
      state.portalUrl = '';
      state.checkoutId = '';
      state.checkoutUrl = '';

      state.getPricesFetch = toFetchState();
      state.getPortalSessionFetch = toFetchState();
      state.postCheckoutSessionFetch = toFetchState();

      break;
    }

    case GET_PRICES.pending: {
      state.getPricesFetch = toFetchPending();
      break;
    }
    case GET_PRICES.error: {
      state.getPricesFetch = toFetchError(action);
      break;
    }
    case GET_PRICES.success: {
      const { prices } = action.payload;

      state.prices = prices;
      state.getPricesFetch = toFetchSuccess(action, state.getPricesFetch);
      break;
    }
    case GET_PRICES.clearMessage: {
      state.getPricesFetch.message = '';
      break;
    }

    case GET_PORTAL_SESSION.pending: {
      state.getPortalSessionFetch = toFetchPending();
      break;
    }
    case GET_PORTAL_SESSION.error: {
      state.getPortalSessionFetch = toFetchError(action);
      break;
    }
    case GET_PORTAL_SESSION.success: {
      const { data = {} } = action.payload;

      state.portalUrl = data.portal_url || '';
      state.getPortalSessionFetch = toFetchSuccess(
        action,
        state.getPortalSessionFetch
      );
      break;
    }
    case GET_PORTAL_SESSION.clearMessage: {
      state.getPortalSessionFetch.message = '';
      break;
    }

    case POST_CHECKOUT_SESSION.pending: {
      state.postCheckoutSessionFetch = toFetchPending();
      break;
    }
    case POST_CHECKOUT_SESSION.error: {
      state.postCheckoutSessionFetch = toFetchError(action);
      break;
    }
    case POST_CHECKOUT_SESSION.success: {
      const { data } = action.payload;

      state.checkoutId = data.session_id || '';
      state.checkoutUrl = data.session_url || '';
      state.postCheckoutSessionFetch = toFetchSuccess(
        action,
        state.postCheckoutSessionFetch
      );

      break;
    }
    case POST_CHECKOUT_SESSION.clearMessage: {
      state.postCheckoutSessionFetch.message = '';
      break;
    }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}, initialState);

export default reducer;
