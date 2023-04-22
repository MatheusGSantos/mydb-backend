import { Router } from 'express';
import { usersRoutes } from './user.routes.js';

export const routes = Router();

routes.use('/users', usersRoutes);
