import { RentalUtilities } from "models/Rental";
import RentalsRepository from "repository/rentals/RentalsRepository";

export class ShowUserRentalsService {
  async execute(userId: string) {
    const rentalRepository: RentalsRepository = new RentalsRepository();

    RentalUtilities.validate({userId}, {
      pick: ['userId']
    })

    return await rentalRepository.retrieveUserRentals(userId);
  }
}