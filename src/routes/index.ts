import { Router } from 'express';
import { usersRoutes } from './user.routes.js';
import { authRoutes } from './auth.routes.js';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
