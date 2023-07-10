import { AvailablesCarsRequestDTO } from "dtos/cars/AvailablesCarsRequestDTO";
import { FormattedCarReturnDTO } from "dtos/cars/FormattedCarReturnDTO";
import { NewCarDTO } from "dtos/cars/NewCarDTO";
import { Car } from "models/Car";

export interface ICarsRepository {
  getAvailablesCar: (data: AvailablesCarsRequestDTO) => Promise<FormattedCarReturnDTO[]>;
  saveNewCar: (data: NewCarDTO) => Promise<Car>;
}