import { CarController } from "controllers/CarController";
import { Router } from "express";
import { ensureAdmin } from "middlewares/auth/ensureAdmin";
import { ensureAuthenticated } from "middlewares/auth/ensureAuthenticated";

export const carRoutes = Router();

const carController = new CarController();

carRoutes.get("/available", carController.getAvailableCars);
carRoutes.post("/", ensureAuthenticated, ensureAdmin, carController.saveNewCar);
