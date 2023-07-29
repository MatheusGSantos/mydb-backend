import { AvailablesCarsRequestDTO } from "dtos/cars/AvailablesCarsRequestDTO";
import { Car, CarUtilities } from "models/Car";
import { Category, CategoryUtilities } from "models/Category";
import CarRepository from "repository/cars/CarRepository";

export class RetrieveCarService {
  async execute(data: AvailablesCarsRequestDTO) {
    const carsRepository = new CarRepository();
    const { brand, name, category } = data;

    if (brand || name) {
      const toValidate = [];

      brand && toValidate.push('brand');
      name && toValidate.push('name');

      const carValidateOptions = {pick: toValidate as (keyof Car)[]};
      CarUtilities.validate(data, carValidateOptions);
    }

    if (category) {
      const categoryValidateOptions = {pick: ['name'] as (keyof Category)[]};
      CategoryUtilities.validate({name: data.category}, categoryValidateOptions);
    }

    return carsRepository.getAvailableCars(data);
  }
}
