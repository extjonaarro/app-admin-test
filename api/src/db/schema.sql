CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS balances (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS funds (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  minimum_amount INTEGER NOT NULL CHECK (minimum_amount > 0),
  category TEXT NOT NULL CHECK (category IN ('FPV', 'FIC'))
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  fund_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  amount INTEGER NOT NULL CHECK (amount > 0),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (fund_id) REFERENCES funds(id)
);

CREATE TABLE IF NOT EXISTS history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  fund_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Suscripcion', 'Cancelacion')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (fund_id) REFERENCES funds(id)
);
