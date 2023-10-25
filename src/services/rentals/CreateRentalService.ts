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

    // check if the car exists and if it's available
    const carRepository: CarRepository = new CarRepository();

    const requestedCar = await carRepository.getCarById(data.carId)

    if (!requestedCar) {
      throw new AppError('Car not found');
    }
    
    if (!requestedCar.available) {
      throw new AppError('The selected car is not available anymore');
    }

    // checking if the dates are valid
    const dateProvider = new DayjsDateProvider();

    // 12 p.m. of the current day
    const today = dateProvider.getMidDayDate();
    const startDate = dateProvider.getMidDayDate(data.startDate);
    const expectedReturnDate = dateProvider.getMidDayDate(data.expectedReturnDate);

    if (dateProvider.compareInHours(today, expectedReturnDate) < 24) {
      throw new AppError('Invalid return date. The minimum rental period is 24 hours');
    }

    if (dateProvider.compareIfBefore(startDate, today)) {
      throw new AppError('Invalid start date. You cannot start a rental in the past');
    }
    
    const compare = dateProvider.compareInHours(
      startDate,
      expectedReturnDate
    );

    if (compare < 24) {
      throw new AppError('The minimum rental period is 24 hours');
    }

    await rentalRepository.saveNewRental({...data, startDate, expectedReturnDate});

    await carRepository.updateAvailableCar(data.carId, false);
  }
}