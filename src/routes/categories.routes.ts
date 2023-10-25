import { CategoriesController } from "controllers/CategoriesController";
import { Router } from "express";
import { ensureAdmin } from "middlewares/auth/ensureAdmin";
import { ensureAuthenticated } from "middlewares/auth/ensureAuthenticated";

export const categoriesRoutes = Router();

const categoriesController = new CategoriesController();

categoriesRoutes.get('/', categoriesController.getAllCategories);
categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, categoriesController.saveNewCategory);
