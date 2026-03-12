import { CURRENT_USER_ID } from '../constants/app.constants.js';
import { balanceModel } from '../models/balance.model.js';
import { historyModel } from '../models/history.model.js';
import { subscriptionModel } from '../models/subscription.model.js';
import { userModel } from '../models/user.model.js';
import { AppError } from '../utils/app-error.js';

const usersController = {
  getCurrentUser(_req, res, next) {
    try {
      const user = userModel.findById(CURRENT_USER_ID);

      if (!user) {
        throw new AppError(404, 'Current user not found.');
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  getCurrentUserBalance(_req, res, next) {
    try {
      const balance = balanceModel.findByUserId(CURRENT_USER_ID);

      if (!balance) {
        throw new AppError(404, 'Current user balance not found.');
      }

      res.json(balance);
    } catch (error) {
      next(error);
    }
  },

  getCurrentUserSubscriptions(_req, res) {
    res.json(subscriptionModel.findByUserId(CURRENT_USER_ID));
  },

  getCurrentUserHistory(_req, res) {
    res.json(historyModel.findByUserId(CURRENT_USER_ID));
  },
};

export { usersController };
