import { NewRentalDTO } from "dtos/rentals/NewRentalDTO";
import { Rental } from "models/Rental";

export interface IRentalsRepository {
  saveNewRental: (data: NewRentalDTO) => Promise<Rental>;
  retrieveUserRentals: (userId: string) => Promise<Rental[]>;
  updateRental: (rentalId: string, data: Omit<Partial<Rental>, 'id'>) => Promise<Rental>;
}