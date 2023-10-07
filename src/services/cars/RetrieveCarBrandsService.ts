import CarRepository from 'repository/cars/CarRepository';

export class RetrieveCarBrandsService {
  async execute() {
    const carsRepository = new CarRepository();

    return carsRepository.getCarBrands();
  }
}
