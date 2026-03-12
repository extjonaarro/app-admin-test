import { API_PORT } from './constants/app.constants.js';
import { databaseFilePath } from './config/database.js';
import './db/init.js';
import { app } from './app.js';

app.listen(API_PORT, () => {
  console.log(`API listening on http://localhost:${API_PORT}`);
  console.log(`SQLite database file: ${databaseFilePath}`);
});
