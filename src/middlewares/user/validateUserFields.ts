import { NextFunction, Request, Response } from 'express';
import { User, UserUtilities } from 'models/User.js';

import AppError from 'utils/AppError.js';

export function validateUserFields({ validateAll = true }) {
  return function (request: Request, response: Response, next: NextFunction) {
    const { name, age, email, password } = request.body as unknown as User;

    try {
      UserUtilities.validateUserFields({ name, age, email, password }, validateAll);
      next();
    } catch (error) {
      const path = (error as Record<string, any>).issues[0].path[0];
      const message = (error as Record<string, any>).issues[0].message;
      throw new AppError(`[${path}]: ${message}`, 400);
    }
  };
}
