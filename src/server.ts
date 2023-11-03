import 'express-async-errors';

import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import AppError from 'utils/AppError.js';
import { routes } from 'routes/index.js';
import { logger } from 'utils/logger';

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'https://rentxwebapp.netlify.app',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

if (['development', undefined].includes(process.env.NODE_ENV)) {
  app.use(logger);
}

app.use(routes);

app.use((err: ErrorRequestHandler, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(8080, () => {
  console.log(`Listening on port ${8080}`);
});
