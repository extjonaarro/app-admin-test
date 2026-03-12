import { Router } from 'express';
import { subscriptionsController } from '../controllers/subscriptions.controller.js';

const subscriptionsRouter = Router();

subscriptionsRouter.post('/', subscriptionsController.create);
subscriptionsRouter.post('/:id/cancel', subscriptionsController.cancel);

export { subscriptionsRouter };
