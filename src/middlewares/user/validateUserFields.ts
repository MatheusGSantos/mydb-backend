import { NextFunction, Request, Response } from 'express';
import { User, UserUtilities, ommitableAttrs } from 'models/User.js';

import AppError from 'utils/AppError.js';

interface IValidateUserFieldsProps {
  attrsToOmit?: ommitableAttrs[];
}

/**
 * Validates user fields in the request body.
 * 
 * @param {IValidateUserFieldsProps} [props] - An object containing optional attributes to omit from validation.
 * @returns {Function} - An Express middleware function that validates user fields.
 * 
 * @throws {AppError} - If there is an error in the validation process.
 * 
 * @example
 * // To validate all user fields:
 * usersRoutes.post('/', validateUserFields(), usersController.create);
 * 
 * // To validate all user fields except password:
 * usersRoutes.patch('/:userId', validateUserFields({ attrsToOmit: ['password'] }), usersController.update);
 */
export function validateUserFields({ attrsToOmit }: IValidateUserFieldsProps = {}) {
  return function (request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body as unknown as User;

    try {
      UserUtilities.validateUserFields({ name, email, password }, attrsToOmit);
    } catch (error) {
      const path = (error as Record<string, any>).issues[0].path[0];
      const message = (error as Record<string, any>).issues[0].message;
      throw new AppError(`[${path}]: ${message}`, 400);
    }
    next();
  };
}
