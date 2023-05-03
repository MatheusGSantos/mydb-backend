import { Router } from 'express';
import { UserController } from 'controllers/UserController.js';
import { validateUserFields } from 'middlewares/user/validateUserFields.js';

export const usersRoutes = Router();

const usersController = new UserController();

usersRoutes.get('/:userId?', usersController.show);
usersRoutes.post('/', validateUserFields({ validateAll: true }), usersController.create);
usersRoutes.patch('/:userId', validateUserFields({ validateAll: false }), usersController.update);
usersRoutes.delete('/:userId', usersController.delete);
