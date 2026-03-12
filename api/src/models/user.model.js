import { db } from '../config/database.js';

const findByIdStatement = db.prepare(`
  SELECT
    id,
    first_name AS firstName,
    last_name AS lastName
  FROM users
  WHERE id = ?
`);

const userModel = {
  findById(id) {
    return findByIdStatement.get(id) ?? null;
  },
};

export { userModel };
