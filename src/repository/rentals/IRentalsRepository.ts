import { FormattedCarReturnDTO } from 'dtos/cars/FormattedCarReturnDTO';
import { NewRentalDTO } from 'dtos/rentals/NewRentalDTO';
import { Rental } from 'models/Rental';

interface OutputRental extends Omit<Rental, 'endDate' | 'startDate' | 'expectedReturnDate'> {
  endDate: Date | null;
  startDate: Date | null;
  expectedReturnDate: Date | null;
  car: FormattedCarReturnDTO;
}

export interface IRentalsRepository {
  getRentalById: (rentalId: string) => Promise<OutputRental | null>;
  saveNewRental: (data: NewRentalDTO) => Promise<void>;
  retrieveUserRentals: (userId: string) => Promise<OutputRental[]>;
  updateRental: (rentalId: string, data: Omit<Partial<Rental>, 'id'>) => Promise<void>;
}
