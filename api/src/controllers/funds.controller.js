import { fundModel } from '../models/fund.model.js';

const fundsController = {
  getAll(_req, res) {
    res.json(fundModel.findAll());
  },
};

export { fundsController };
