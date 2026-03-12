export const API_BASE_URL = 'http://localhost:3000';

export const API_PATHS = {
  funds: '/funds',
  currentUserBalance: '/users/current/balance',
  currentUserSubscriptions: '/users/current/subscriptions',
  currentUserHistory: '/users/current/history',
  subscriptions: '/subscriptions',
  cancelSubscription: (subscriptionId: number) => `/subscriptions/${subscriptionId}/cancel`,
} as const;
