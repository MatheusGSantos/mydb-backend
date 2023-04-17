import express, { NextFunction, Request, Response } from 'express';

import AppError from 'utils/AppError.js';

const app = express();

app.get('/', (req, res) => {

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(8080, () => {
  console.log(`Listening on port ${8080}`);
});
