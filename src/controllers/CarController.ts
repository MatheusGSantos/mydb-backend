import { Request, Response } from "express";
import { CreateCarService } from "services/cars/CreateCarService";
import { RetrieveCarService } from "services/cars/RetrieveAvailableCarsService";

export class CarController {
  async getAvailables(request: Request, response: Response): Promise<Response> {
    const retrieveCarService = new RetrieveCarService();

    const car = await retrieveCarService.execute(request.query);

    return response.json(car)
  }

  async saveNewCar(request: Request, response: Response): Promise<Response> {
    const createCarService = new CreateCarService();
    
    const newCar = createCarService.execute(request.body);

    return response.json(newCar);
  }
}