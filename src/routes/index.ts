import { Router } from 'express';
import { usersRoutes } from './user.routes.js';
import { authRoutes } from './auth.routes.js';
import { carRoutes } from './car.routes.js';
import { categoriesRoutes } from './categories.routes.js';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', authRoutes);
routes.use('/cars', carRoutes);
routes.use('/categories', categoriesRoutes);
