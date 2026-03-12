import { db } from '../config/database.js';

const insertStatement = db.prepare(`
  INSERT INTO subscriptions (user_id, fund_id, created_at, amount)
  VALUES (?, ?, ?, ?)
`);

const findByUserIdStatement = db.prepare(`
  SELECT
    subscriptions.id,
    subscriptions.user_id AS userId,
    subscriptions.fund_id AS fundId,
    funds.name AS fundName,
    funds.category AS category,
    subscriptions.created_at AS createdAt,
    subscriptions.amount
  FROM subscriptions
  INNER JOIN funds ON funds.id = subscriptions.fund_id
  WHERE subscriptions.user_id = ?
  ORDER BY subscriptions.created_at DESC
`);

const findByIdStatement = db.prepare(`
  SELECT
    subscriptions.id,
    subscriptions.user_id AS userId,
    subscriptions.fund_id AS fundId,
    funds.name AS fundName,
    funds.category AS category,
    subscriptions.created_at AS createdAt,
    subscriptions.amount
  FROM subscriptions
  INNER JOIN funds ON funds.id = subscriptions.fund_id
  WHERE subscriptions.id = ?
`);

const deleteByIdStatement = db.prepare(`
  DELETE FROM subscriptions
  WHERE id = ?
`);

const subscriptionModel = {
  create({ userId, fundId, createdAt, amount }) {
    const result = insertStatement.run(userId, fundId, createdAt, amount);

    return {
      id: Number(result.lastInsertRowid),
      userId,
      fundId,
      createdAt,
      amount,
    };
  },

  findByUserId(userId) {
    return findByUserIdStatement.all(userId);
  },

  findById(id) {
    return findByIdStatement.get(id) ?? null;
  },

  deleteById(id) {
    deleteByIdStatement.run(id);
  },
};

export { subscriptionModel };
