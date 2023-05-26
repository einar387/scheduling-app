export type PostCheckoutSession = {
  price_id: string;
};

export type PostCheckoutSessionResponse = {
  session_id: string;
  session_url: string;
};

export type Recurring = {
  interval: 'month' | 'year';
  interval_count: number;
  trial_period_days: number | null;
};

export type Product = {
  id: string;
  active: boolean;
  description: string;
  name: string;
  recurring: Recurring;
};

export type Price = {
  id: string;
  type: string;
  currency: string;
  active: boolean;
  product: Product;
  recurring: Recurring;
  unit_amount: number;
};

export type StripeData = {
  prices: {
    data: Price[];
    has_more: boolean;
    url: string;
  };
};

export type PaymentState = {
  prices: StripeData | null;
  portalUrl: string;
  checkoutId: string;
  checkoutUrl: string;

  getPricesFetch: FetchState;
  getPortalSessionFetch: FetchState;
  postCheckoutSessionFetch: FetchState;
};
