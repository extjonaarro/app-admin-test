import { AppError } from '../utils/app-error.js';

function notFoundHandler(req, _res, next) {
  next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found.`));
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode ?? 500;
  const message =
    statusCode === 500 ? 'An unexpected error occurred while processing the request.' : error.message;

  res.status(statusCode).json({
    code: error.code ?? null,
    message,
  });
}

export { errorHandler, notFoundHandler };
