import { Request, Response } from 'express';
import { CreateCarService } from 'services/cars/CreateCarService';
import { RetrieveCarService } from 'services/cars/RetrieveAvailableCarsService';
import { RetrieveCarBrandsService } from 'services/cars/RetrieveCarBrandsService';

export class CarController {
  async getAvailableCars(request: Request, response: Response): Promise<Response> {
    const { brand, name, categories, priceRange, id } = request.query as Record<string, any>;

    const retrieveCarService = new RetrieveCarService();

    const cars = await retrieveCarService.execute({ brand, name, categories, priceRange, id });

    return response.json(cars);
  }

  async getBrands(request: Request, response: Response): Promise<Response> {
    const retrieveCarBrandsService = new RetrieveCarBrandsService();

    const brands = await retrieveCarBrandsService.execute();

    return response.json(brands);
  }

  async saveNewCar(request: Request, response: Response): Promise<Response> {
    const { name, categoryId, carImage, description, dailyRate, fineAmount, brand, licensePlate } = request.body;

    const createCarService = new CreateCarService();

    const newCar = await createCarService.execute({
      name,
      categoryId,
      carImage,
      description,
      dailyRate,
      fineAmount,
      brand,
      licensePlate,
    });

    return response.json(newCar);
  }
}
