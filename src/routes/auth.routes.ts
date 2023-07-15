import { AuthController } from 'controllers/AuthController';
import { Router } from 'express';

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post('/', authController.signIn);
