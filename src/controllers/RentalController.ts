import { Request, Response } from "express";
import { CreateRentalService } from "services/rentals/CreateRentalService";
import { EndRentalService } from "services/rentals/EndRentalService";
import { ShowUserRentalsService } from "services/rentals/ShowUserRentalsService";

export class RentalController {
  async getAllUserRentals(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const showUserRentalsService = new ShowUserRentalsService();

    const userRentals = await showUserRentalsService.execute(userId);

    return response.json(userRentals);
  }

  async saveNewRental(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const createRentalService = new CreateRentalService();

    const { carId, expectedReturnDate, startDate } = request.body;

    await createRentalService.execute({userId, carId, expectedReturnDate, startDate});
  
    return response.status(201).json()
  }

  async endRental(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { rentalId } = request.params;

    const endRentalService = new EndRentalService();

    await endRentalService.execute(userId, rentalId);

    return response.status(200).json();
  }
}