import { Request, Response } from "express";
import { CreateCarService } from "services/cars/CreateCarService";
import { RetrieveCarService } from "services/cars/RetrieveAvailableCarsService";

export class CarController {
  async getAvailableCars(request: Request, response: Response): Promise<Response> {
    const { brand, name, category } = request.query as Record<string, any>;
    
    const retrieveCarService = new RetrieveCarService();

    const cars = await retrieveCarService.execute({ brand, name, category });

    return response.json(cars)
  }

  async saveNewCar(request: Request, response: Response): Promise<Response> {
    const { name, categoryId, carImage, description, dailyRate, fineAmount, brand, licensePlate } = request.body;

    const createCarService = new CreateCarService();
    
    const newCar = await createCarService.execute({ name, categoryId, carImage, description, dailyRate, fineAmount, brand, licensePlate });

    return response.json(newCar);
  }
}