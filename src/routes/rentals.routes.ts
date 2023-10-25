import { RentalController } from 'controllers/RentalController';
import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/auth/ensureAuthenticated';

export const rentalRoutes = Router();

const rentalController = new RentalController();

rentalRoutes.post('/', ensureAuthenticated, rentalController.saveNewRental);
rentalRoutes.get('/user', ensureAuthenticated, rentalController.getAllUserRentals);
rentalRoutes.post('/:rentalId/end', ensureAuthenticated, rentalController.endRental);
