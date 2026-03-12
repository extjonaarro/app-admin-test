export type FundCategory = 'FPV' | 'FIC';

export interface Fund {
  readonly id: number;
  readonly name: string;
  readonly minimumAmount: number;
  readonly category: FundCategory;
}

export interface FundSubscriptionReceipt {
  readonly id: number;
  readonly fundId: number;
  readonly fundName: string;
  readonly subscribedAmount: number;
  readonly createdAt: string;
  readonly reference: string;
  readonly userId: number;
  readonly status: 'success' | 'error';
  readonly message: string;
}
