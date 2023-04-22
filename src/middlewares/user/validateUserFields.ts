import { NextFunction, Request, Response } from 'express';
import { User, userSchema } from 'models/User.js';

import AppError from 'utils/AppError.js';

export async function validateUserFields(request: Request, response: Response, next: NextFunction) {
  const { name, age, email, password } = request.body as unknown as User;

  try {
    userSchema.parse({ name, age, email, password });
    next();
  } catch (error) {
    const path = (error as Record<string, any>).issues[0].path[0];
    const message = (error as Record<string, any>).issues[0].message;
    throw new AppError(`[${path}]: ${message}`, 400);
  }
}
