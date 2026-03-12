import { Balance } from './balance.interface';
import { FundSubscriptionReceipt } from './fund.interface';

export interface UserSubscription {
  readonly id: number;
  readonly userId: number;
  readonly fundId: number;
  readonly fundName: string;
  readonly category: 'FPV' | 'FIC';
  readonly createdAt: string;
  readonly amount: number;
}

export interface CancelSubscriptionResponse {
  readonly message: string;
  readonly balance: Balance;
  readonly cancelledSubscription: {
    readonly id: number;
    readonly fundId: number;
    readonly fundName: string;
    readonly amount: number;
  };
}

export interface CreateSubscriptionRequest {
  readonly fundId: number;
  readonly amount: number;
}

export interface CreateSubscriptionResponse {
  readonly message: string;
  readonly receipt: FundSubscriptionReceipt;
  readonly balance: Balance;
}
