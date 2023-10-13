import { AvailablesCarsRequestDTO } from 'dtos/cars/AvailablesCarsRequestDTO';
import { Car, CarUtilities } from 'models/Car';
import { Category, CategoryUtilities } from 'models/Category';
import CarRepository from 'repository/cars/CarRepository';

export class RetrieveCarService {
  async execute(data: AvailablesCarsRequestDTO) {
    const carsRepository = new CarRepository();
    const { brand, name, categories, priceRange } = data;

    if (brand || name) {
      const toValidate = [];

      brand && toValidate.push('brand');
      name && toValidate.push('name');

      const carValidateOptions = { pick: toValidate as (keyof Car)[] };
      CarUtilities.validate(data, carValidateOptions);
    }

    if (categories) {
      const categoryValidateOptions = { pick: ['name'] as (keyof Category)[] };
      categories.split(',').forEach((category) => {
        CategoryUtilities.validate({ name: category }, categoryValidateOptions);
      });
    }

    if (priceRange) {
      try {
        const [minPrice, maxPrice] = priceRange.split(',');

        if (minPrice && maxPrice) {
          const minPriceNumber = Number(minPrice);
          const maxPriceNumber = Number(maxPrice);

          if (minPriceNumber > maxPriceNumber) {
            throw new Error('Min price cannot be greater than max price');
          }
        }
      } catch (error) {
        throw new Error('Invalid price range');
      }
    }

    return carsRepository.getAvailableCars(data);
  }
}
