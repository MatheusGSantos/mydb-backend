import { CategoriesController } from "controllers/CategorieController";
import { Router } from "express";

export const categoriesRoutes = Router();

const categoriesController = new CategoriesController();

categoriesRoutes.get('/', categoriesController.getAllCategories);
