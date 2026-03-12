import { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';

const usersRouter = Router();

usersRouter.get('/current', usersController.getCurrentUser);
usersRouter.get('/current/balance', usersController.getCurrentUserBalance);
usersRouter.get('/current/subscriptions', usersController.getCurrentUserSubscriptions);
usersRouter.get('/current/history', usersController.getCurrentUserHistory);

export { usersRouter };
