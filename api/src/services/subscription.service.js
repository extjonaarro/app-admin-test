import { db } from '../config/database.js';
import { balanceModel } from '../models/balance.model.js';
import { fundModel } from '../models/fund.model.js';
import { historyModel } from '../models/history.model.js';
import { subscriptionModel } from '../models/subscription.model.js';
import { userModel } from '../models/user.model.js';
import { AppError } from '../utils/app-error.js';

function generateReference() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

const executeSubscription = db.transaction(({ userId, fundId, amount }) => {
  const user = userModel.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  const fund = fundModel.findById(fundId);

  if (!fund) {
    throw new AppError(404, 'Fund not found.');
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new AppError(400, 'The subscription amount must be greater than zero.');
  }

  if (amount < fund.minimumAmount) {
    throw new AppError(400, `The amount must be equal to or greater than ${fund.minimumAmount}.`);
  }

  const currentBalance = balanceModel.findByUserId(userId);

  if (!currentBalance) {
    throw new AppError(404, 'Balance not found.');
  }

  if (amount > currentBalance.amount) {
    throw new AppError(400, 'No tienes saldo suficiente.', 'INSUFFICIENT_BALANCE');
  }

  const createdAt = new Date().toISOString();

  const subscription = subscriptionModel.create({
    userId,
    fundId,
    createdAt,
    amount,
  });

  const updatedBalance = balanceModel.updateByUserId(userId, currentBalance.amount - amount, createdAt);

  historyModel.create({
    userId,
    fundId,
    createdAt,
    type: 'Suscripcion',
  });

  return {
    message: 'Subscription created successfully.',
    receipt: {
      id: subscription.id,
      reference: generateReference(),
      createdAt,
      fundId,
      fundName: fund.name,
      subscribedAmount: amount,
      userId,
    },
    balance: updatedBalance,
  };
});

const subscriptionService = {
  createSubscription({ userId, fundId, amount }) {
    return executeSubscription({ userId, fundId, amount });
  },

  cancelSubscription({ userId, subscriptionId }) {
    return db.transaction(() => {
      const user = userModel.findById(userId);

      if (!user) {
        throw new AppError(404, 'User not found.');
      }

      const subscription = subscriptionModel.findById(subscriptionId);

      if (!subscription || subscription.userId !== userId) {
        throw new AppError(404, 'Subscription not found.');
      }

      const currentBalance = balanceModel.findByUserId(userId);

      if (!currentBalance) {
        throw new AppError(404, 'Balance not found.');
      }

      const createdAt = new Date().toISOString();

      subscriptionModel.deleteById(subscriptionId);

      const updatedBalance = balanceModel.updateByUserId(
        userId,
        currentBalance.amount + subscription.amount,
        createdAt,
      );

      historyModel.create({
        userId,
        fundId: subscription.fundId,
        createdAt,
        type: 'Cancelacion',
      });

      return {
        message: 'Subscription cancelled successfully.',
        balance: updatedBalance,
        cancelledSubscription: {
          id: subscription.id,
          fundId: subscription.fundId,
          fundName: subscription.fundName,
          amount: subscription.amount,
        },
      };
    })();
  },
};

export { subscriptionService };
