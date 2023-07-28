import { NewRentalDTO } from "dtos/rentals/NewRentalDTO";
import { RentalUtilities } from "models/Rental";
import DayjsDateProvider from "providers/DateProvider";
import CarRepository from "repository/cars/CarRepository";
import RentalsRepository from "repository/rentals/RentalsRepository";
import AppError from "utils/AppError";

export class CreateRentalService {
  async execute(data: NewRentalDTO) {
    const rentalRepository: RentalsRepository = new RentalsRepository();

    RentalUtilities.validate(data, {
      pick: ['carId', 'userId', 'expectedReturnDate', 'startDate']
    })

    const carRepository: CarRepository = new CarRepository();

    const requestedCar = await carRepository.getCarById(data.carId)

    if (!requestedCar) {
      throw new AppError('Car not found');
    }
    
    if (!requestedCar.available) {
      throw new AppError('The selected car is not available anymore');
    }

    const dateProvider = new DayjsDateProvider();

    const dateNow = dateProvider.dateNow();

    if (dateProvider.compareInHours(dateNow, data.expectedReturnDate) < 24) {
      throw new AppError('Invalid return date. The minimum rental period is 24 hours');
    }

    if (dateProvider.compareInHours(dateNow, data.startDate) < 0) {
      throw new AppError('Invalid start date. You cannot start a rental in the past');
    }
    
    const compare = dateProvider.compareInHours(
      data.startDate,
      data.expectedReturnDate
    );

    if (compare < 24) {
      throw new AppError('The minimum rental period is 24 hours');
    }

    await rentalRepository.saveNewRental(data);

    await carRepository.updateAvailableCar(data.carId, false);
  }
}