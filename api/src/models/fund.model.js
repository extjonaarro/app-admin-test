import { db } from '../config/database.js';

const findAllStatement = db.prepare(`
  SELECT
    id,
    name,
    minimum_amount AS minimumAmount,
    category
  FROM funds
  ORDER BY id
`);

const findByIdStatement = db.prepare(`
  SELECT
    id,
    name,
    minimum_amount AS minimumAmount,
    category
  FROM funds
  WHERE id = ?
`);

const fundModel = {
  findAll() {
    return findAllStatement.all();
  },

  findById(id) {
    return findByIdStatement.get(id) ?? null;
  },
};

export { fundModel };
