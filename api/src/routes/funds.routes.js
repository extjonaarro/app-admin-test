import { Router } from 'express';
import { fundsController } from '../controllers/funds.controller.js';

const fundsRouter = Router();

fundsRouter.get('/', fundsController.getAll);

export { fundsRouter };
