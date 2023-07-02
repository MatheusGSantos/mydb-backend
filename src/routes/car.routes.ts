import { CarController } from "controllers/CarController";
import { Router } from "express";
import { ensureAuthenticated } from "middlewares/auth/ensureAuthenticated";
import { validateNewCarFields } from "middlewares/car/validateNewCarFields";
import { verifyIfIsAdminUser } from "middlewares/user/verifyIfIsAdminUser";

export const carRoutes = Router();

const carController = new CarController();

carRoutes.get("/available", carController.getAvailables);
carRoutes.post("/", ensureAuthenticated, verifyIfIsAdminUser, validateNewCarFields, carController.saveNewCar);
