import {
  GET_PRICES,
  GET_PORTAL_SESSION,
  POST_CHECKOUT_SESSION,
} from './constants';
import {
  Price,
  PostCheckoutSession,
  PostCheckoutSessionResponse,
} from './types';

export const dispatchGetPrices = (force?: boolean) => ({
  type: GET_PRICES.base,
  payload: {},
  meta: { force },
});
export const dispatchGetPricesPending = () => ({
  type: GET_PRICES.pending,
  payload: {},
});
export const dispatchGetPricesError = (message?: string) => ({
  type: GET_PRICES.error,
  payload: { message },
});
export const dispatchGetPricesSuccess = (
  prices?: Price[],
  message?: string
) => ({
  type: GET_PRICES.success,
  payload: { prices, message },
});
export const dispatchClearGetPricesMessage = () => ({
  type: GET_PRICES.clearMessage,
  payload: {},
});

export const dispatchGetPortalSession = (force?: boolean) => ({
  type: GET_PORTAL_SESSION.base,
  payload: {},
  meta: { force },
});
export const dispatchGetPortalSessionPending = () => ({
  type: GET_PORTAL_SESSION.pending,
  payload: {},
});
export const dispatchGetPortalSessionError = (message?: string) => ({
  type: GET_PORTAL_SESSION.error,
  payload: { message },
});
export const dispatchGetPortalSessionSuccess = (
  data: { portal_url: string },
  message?: string
) => ({
  type: GET_PORTAL_SESSION.success,
  payload: { data, message },
});
export const dispatchClearGetPortalSessionMessage = () => ({
  type: GET_PORTAL_SESSION.clearMessage,
  payload: {},
});

export const dispatchPostCheckoutSession = (data: PostCheckoutSession) => ({
  type: POST_CHECKOUT_SESSION.base,
  payload: { data },
});
export const dispatchPostCheckoutSessionPending = () => ({
  type: POST_CHECKOUT_SESSION.pending,
  payload: {},
});
export const dispatchPostCheckoutSessionError = (message?: string) => ({
  type: POST_CHECKOUT_SESSION.error,
  payload: { message },
});
export const dispatchPostCheckoutSessionSuccess = (
  data: PostCheckoutSessionResponse,
  message?: string
) => ({
  type: POST_CHECKOUT_SESSION.success,
  payload: { data, message },
});
export const dispatchClearPostCheckoutSessionMessage = () => ({
  type: POST_CHECKOUT_SESSION.clearMessage,
  payload: {},
});
