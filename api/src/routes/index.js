import { Router } from 'express';
import { fundsRouter } from './funds.routes.js';
import { subscriptionsRouter } from './subscriptions.routes.js';
import { usersRouter } from './users.routes.js';

const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({
    message: 'API is running.',
  });
});

apiRouter.use('/funds', fundsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/subscriptions', subscriptionsRouter);

export { apiRouter };
