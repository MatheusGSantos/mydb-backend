import { AvailablesCarsRequestDTO } from "dtos/cars/AvailablesCarsRequestDTO";
import CarRepository from "repository/cars/CarRepository";

export class RetrieveCarService {
  async execute(data: AvailablesCarsRequestDTO) {
    const carsRepository = new CarRepository();

    return carsRepository.getAvailablesCar(data);
  }
}
