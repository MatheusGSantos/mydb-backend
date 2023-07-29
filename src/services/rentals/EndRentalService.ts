import { RentalUtilities } from "models/Rental";
import DayjsDateProvider from "providers/DateProvider";
import CarRepository from "repository/cars/CarRepository";
import RentalsRepository from "repository/rentals/RentalsRepository";
import AppError from "utils/AppError";

export class EndRentalService {
  async execute(userId: string, rentalId: string) {
    const rentalRepository: RentalsRepository = new RentalsRepository();

    RentalUtilities.validate({id: rentalId, userId}, {
      pick: ['id', 'userId']
    })

    // check if the rental exists and is related to the user
    const rental = await rentalRepository.getRentalById(rentalId);

    if (!rental) {
      throw new AppError('Rental not found');
    }
    
    if (rental.userId !== userId) {
      throw new AppError('You are not allowed to end this rental');
    }

    if (rental.endDate !== null || rental.total !== null) {
      throw new AppError('This rental has already ended');
    }

    // checking if the dates are valid
    const dateProvider = new DayjsDateProvider();

    // 12 p.m. of the current day
    const now = dateProvider.dateNow();

    let daily = Math.ceil(dateProvider.compareInHours(now, rental.startDate) / 24);

    // minimum of 1 day of rental fee
    if (daily <= 0) {
      daily = 1;
    }

    const hoursOfTolerance = 2;

    const delay = Math.ceil(dateProvider.compareInHours(rental.expectedReturnDate, dateProvider.subtractHours(now, hoursOfTolerance)) / 24);

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * rental.car.fineAmount;
      total = calculateFine;
    }

    total += daily * rental.car.dailyRate;

    rental.endDate = now;
    rental.total = total;

    await rentalRepository.updateRental(rentalId, RentalUtilities.getSafeObject(rental));
    
    const carRepository: CarRepository = new CarRepository();
    
    await carRepository.updateAvailableCar(rental.carId, true);
  }
}