import CarRepository from "repository/cars/CarRepository";
import { AvailablesCarsRequestDTO } from "repository/cars/ICarRepository";

export class RetrieveCarService {
  async execute(data: AvailablesCarsRequestDTO) {
    const carsRepository = new CarRepository;

    return carsRepository.getAvailablesCar(data);
  }
}
