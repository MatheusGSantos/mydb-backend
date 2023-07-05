import { NewCarDTO } from "dtos/cars/NewCarDTO";
import CarRepository from "repository/cars/CarRepository";

export class CreateCarService {
  async execute(data: NewCarDTO) {
    const carRepository: CarRepository = new CarRepository;

    return carRepository.saveNewCar(data);
  }
}
