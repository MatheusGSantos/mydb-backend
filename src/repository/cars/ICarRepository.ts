import { AvailablesCarsRequestDTO } from "dtos/cars/AvailablesCarsRequestDTO";
import { NewCarDTO } from "dtos/cars/NewCarDTO";

export interface ICarsRepository {
  getAvailablesCar: (data: AvailablesCarsRequestDTO) => Promise<any>;
  saveNewCar: (data: NewCarDTO) => Promise<any>;
}