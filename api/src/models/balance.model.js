import { db } from '../config/database.js';

const findByUserIdStatement = db.prepare(`
  SELECT
    id,
    user_id AS userId,
    amount,
    updated_at AS updatedAt
  FROM balances
  WHERE user_id = ?
`);

const updateByUserIdStatement = db.prepare(`
  UPDATE balances
  SET amount = ?, updated_at = ?
  WHERE user_id = ?
`);

const balanceModel = {
  findByUserId(userId) {
    return findByUserIdStatement.get(userId) ?? null;
  },

  updateByUserId(userId, amount, updatedAt) {
    updateByUserIdStatement.run(amount, updatedAt, userId);
    return this.findByUserId(userId);
  },
};

export { balanceModel };
