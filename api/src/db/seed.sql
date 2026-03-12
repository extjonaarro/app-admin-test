INSERT OR IGNORE INTO users (id, first_name, last_name)
VALUES (1, 'Jonathan', 'Arroyo Reina');

INSERT OR IGNORE INTO balances (id, user_id, amount, updated_at)
VALUES (1, 1, 500000, CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO funds (id, name, minimum_amount, category)
VALUES
  (1, 'FPV_BTG_PACTUAL_RECAUDADORA', 75000, 'FPV'),
  (2, 'FPV_BTG_PACTUAL_ECOPETROL', 125000, 'FPV'),
  (3, 'DEUDAPRIVADA', 50000, 'FIC'),
  (4, 'FDO-ACCIONES', 250000, 'FIC'),
  (5, 'FPV_BTG_PACTUAL_DINAMICA', 100000, 'FPV');
