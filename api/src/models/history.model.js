import { db } from '../config/database.js';

const insertStatement = db.prepare(`
  INSERT INTO history (user_id, fund_id, created_at, type)
  VALUES (?, ?, ?, ?)
`);

const findByUserIdStatement = db.prepare(`
  SELECT
    history.id,
    history.user_id AS userId,
    history.fund_id AS fundId,
    funds.name AS fundName,
    history.created_at AS createdAt,
    history.type
  FROM history
  INNER JOIN funds ON funds.id = history.fund_id
  WHERE history.user_id = ?
  ORDER BY history.created_at DESC
`);

const historyModel = {
  create({ userId, fundId, createdAt, type }) {
    const result = insertStatement.run(userId, fundId, createdAt, type);

    return {
      id: Number(result.lastInsertRowid),
      userId,
      fundId,
      createdAt,
      type,
    };
  },

  findByUserId(userId) {
    return findByUserIdStatement.all(userId);
  },
};

export { historyModel };
