import CarRepository from "repository/cars/CarRepository";
import { NewCarDTO } from "repository/cars/ICarRepository";

export class CreateCarService {
  async execute(data: NewCarDTO) {
    const carRepository: CarRepository = new CarRepository;

    return carRepository.saveNewCar(data);
  }
}
