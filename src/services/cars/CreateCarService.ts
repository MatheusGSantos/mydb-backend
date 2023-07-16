import { NewCarDTO } from "dtos/cars/NewCarDTO";
import { CarUtilities } from "models/Car";
import CarRepository from "repository/cars/CarRepository";

export class CreateCarService {
  async execute(data: NewCarDTO) {
    const carRepository: CarRepository = new CarRepository;
    
    CarUtilities.validate(data, {
      omit: ['id', 'available']
    })
    
    return await carRepository.saveNewCar(data);
  }
}
