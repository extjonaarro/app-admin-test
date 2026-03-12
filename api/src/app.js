import cors from 'cors';
import express from 'express';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';
import { apiRouter } from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  }),
);

app.use(express.json());
app.use(apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
