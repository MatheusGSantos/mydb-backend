import { Router } from 'express';
import { UserController } from 'controllers/UserController.js';
import { ensureAuthenticated } from 'middlewares/auth/ensureAuthenticated';

export const usersRoutes = Router();

const usersController = new UserController();

usersRoutes.post('/', usersController.create);
usersRoutes.get('/profile', ensureAuthenticated, usersController.showProfile);
usersRoutes.patch('/profile', ensureAuthenticated, usersController.updateProfile);
