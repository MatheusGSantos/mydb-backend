import { Router } from 'express';
import { usersRoutes } from './user.routes.js';
import { authRoutes } from './auth.routes.js';
import { carRoutes } from './car.routes.js';
import { categoriesRoutes } from './categories.routes.js';
import { rentalRoutes } from './rentals.routes.js';

export const routes = Router();

routes.use('/sessions', authRoutes);
routes.use('/rentals', rentalRoutes);
routes.use('/users', usersRoutes);
routes.use('/cars', carRoutes);
routes.use('/categories', categoriesRoutes);
