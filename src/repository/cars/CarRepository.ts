import { ICarsRepository} from "./ICarRepository";
import { prisma } from "../../database";
import { NewCarDTO } from "dtos/cars/NewCarDTO";
import { AvailablesCarsRequestDTO } from "dtos/cars/AvailablesCarsRequestDTO";

export default class CarRepository implements ICarsRepository {
  async getAvailablesCar(data: AvailablesCarsRequestDTO) {
    const {name, brand, category} = data;

    const cars = await prisma.cars.findMany({
      where: {
        available: true,
        name: {
          contains: name
        },
        brand: {
          contains: brand
        },
        category: {
          name: category
        }
      },
      select: {
        id: true,
        name: true,
        brand: true,
        available: true,
        carImage: true,
        dailyRate: true,
        description: true,
        licensePlate: true,
        fineAmount: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      },
    });

    return cars;
  }

  async saveNewCar(data: NewCarDTO) {
    const {
      name,
      categoryId,
      carImage,
      description,
      dailyRate,
      fineAmount,
      brand,
      licensePlate,
    } = data;

    const newCar = await prisma.cars.create({
      data: {
        name,
        categoryId,
        carImage,
        description,
        dailyRate,
        fineAmount,
        brand,
        licensePlate,
      }
    });

    return newCar
  }
}

