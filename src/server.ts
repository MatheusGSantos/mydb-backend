import 'express-async-errors';

import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import AppError from 'utils/AppError.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.use((err: ErrorRequestHandler, req: Request, res: Response, _: NextFunction) => {
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
