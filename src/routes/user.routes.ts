import { Router } from 'express';
import { UserController } from 'controllers/UserController.js';
import { validateUserFields } from 'middlewares/user/ValidateUserFields.js';

export const usersRoutes = Router();

const usersController = new UserController();

usersRoutes.get('/:userId?', usersController.show);
usersRoutes.post('/', validateUserFields, usersController.create);
