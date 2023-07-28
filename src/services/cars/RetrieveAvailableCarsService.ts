import { AvailablesCarsRequestDTO } from "dtos/cars/AvailablesCarsRequestDTO";
import { Car, CarUtilities } from "models/Car";
import { Category, CategoryUtilities } from "models/Category";
import CarRepository from "repository/cars/CarRepository";

export class RetrieveCarService {
  async execute(data: AvailablesCarsRequestDTO) {
    const carsRepository = new CarRepository();

    const validatedData = Object.entries(data).filter(([_, value]) => value);
    const carValidateOptions = validatedData.length > 0 ? {pick: Object.keys(validatedData).filter(key => ['brand', 'name'].includes(key)) as (keyof Car)[]} : undefined;
    const categoryValidateOptions = Object.keys(validatedData).includes('category') ? {pick: ['name'] as (keyof Category)[]} : undefined;

    CarUtilities.validate(data, carValidateOptions)
    CategoryUtilities.validate(data, categoryValidateOptions)

    return carsRepository.getAvailablesCar(data);
  }
}
