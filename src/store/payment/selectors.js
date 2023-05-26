import { toFetchState } from '@/helpers';
import { createSelector } from 'reselect';

export const selectPriceData = (state: RootState): StripeData | null =>
  state.payment.prices;
export const selectPortalUrl = (state: RootState): string =>
  state.payment.portalUrl;
export const selectCheckoutId = (state: RootState): string =>
  state.payment.checkoutId;
export const selectCheckoutUrl = (state: RootState): string =>
  state.payment.checkoutUrl;

export const selectGetPricesFetch = (state: RootState): FetchState =>
  state.payment.getPricesFetch || toFetchState();
export const selectGetPortalSessionFetch = (state: RootState): FetchState =>
  state.payment.getPortalSessionFetch || toFetchState();
export const selectPostCheckoutSessionFetch = (state: RootState): FetchState =>
  state.payment.postCheckoutSessionFetch || toFetchState();

export const selectPrices = createSelector(
  [selectPriceData],
  (priceData): Price[] => {
    if (!priceData) return [];

    return priceData.prices?.data || [];
  }
);

export const selectMonthlyPrice = createSelector(
  [selectPriceData],
  (priceData): Price | null => {
    if (!priceData || !priceData.prices) return null;

    return (
      priceData.prices?.data.find(
        (p: Price) => p.recurring.interval === 'month'
      ) || null
    );
  }
);

export const selectYearlyPrice = createSelector(
  [selectPriceData],
  (priceData): Price | null => {
    if (!priceData || !priceData.prices) return null;

    return (
      priceData.prices?.data.find(
        (p: Price) => p.recurring.interval === 'year'
      ) || null
    );
  }
);
