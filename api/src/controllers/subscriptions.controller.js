import { CURRENT_USER_ID } from '../constants/app.constants.js';
import { subscriptionService } from '../services/subscription.service.js';

const subscriptionsController = {
  create(req, res, next) {
    try {
      const result = subscriptionService.createSubscription({
        userId: CURRENT_USER_ID,
        fundId: Number(req.body.fundId),
        amount: Number(req.body.amount),
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  cancel(req, res, next) {
    try {
      const result = subscriptionService.cancelSubscription({
        userId: CURRENT_USER_ID,
        subscriptionId: Number(req.params.id),
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};

export { subscriptionsController };
