import { Router } from 'express';
import { UserController } from 'controllers/UserController.js';
import { validateUserFields } from 'middlewares/user/validateUserFields.js';
import { ensureAuthenticated } from 'middlewares/auth/ensureAuthenticated';

export const usersRoutes = Router();

const usersController = new UserController();

usersRoutes.get('/:userId?', usersController.show);
usersRoutes.post('/', ensureAuthenticated, validateUserFields(), usersController.create);
usersRoutes.patch('/:userId', ensureAuthenticated, validateUserFields({ attrsToOmit: ['password'] }), usersController.update);
usersRoutes.delete('/:userId', ensureAuthenticated, usersController.delete);
