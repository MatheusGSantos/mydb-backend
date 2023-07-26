import { NextFunction, Request, Response } from 'express';
import { authConfig } from 'config/auth';
import { verify } from 'jsonwebtoken';

import AppError from 'utils/AppError';
import { UserUtilities } from 'models/User';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing authentication token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

    UserUtilities.validate({ id: user_id }, {
      pick: ['id']
    });

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError('token.invalid', 401);
  }
}
