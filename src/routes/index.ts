import { Router } from 'express';
import { usersRoutes } from './user.routes.js';
import { authRoutes } from './auth.routes.js';
import { carRoutes } from './car.routes.js';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/cars', carRoutes);
