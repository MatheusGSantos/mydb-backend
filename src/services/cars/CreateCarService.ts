import { Prisma } from "@prisma/client";
import { NewCarDTO } from "dtos/cars/NewCarDTO";
import { CarUtilities } from "models/Car";
import CarRepository from "repository/cars/CarRepository";
import AppError from "utils/AppError";

export class CreateCarService {
  async execute(data: NewCarDTO) {
    const carRepository: CarRepository = new CarRepository();
    
    CarUtilities.validate(data, {
      omit: ['id', 'available']
    })
    
    try {
      return await carRepository.saveNewCar(data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('This car already exists')
      }
    }
  }
}
