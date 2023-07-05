import { ICarsRepository} from "./ICarRepository";
import { prisma } from "../../database";
import { NewCarDTO } from "dtos/cars/NewCarDTO";
import { AvailablesCarsRequestDTO } from "dtos/cars/AvailablesCarsRequestDTO";

export default class CarRepository implements ICarsRepository {
  async getAvailablesCar(data: AvailablesCarsRequestDTO) {
    const {name, brand, category} = data;

    const cars = await prisma.cars.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        dailyRate: true,
        fineAmount: true,
        licensePlate: true,
        categoryId: true,
        carImage: true,
        available: true
      },
      where: {
        available: true,
        name: {
          contains: name
        },
        brand: {
          contains: brand
        },
        categoryName: {
          name: category
        }
      },
      include: {
        categoryName: true
      }
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
        categoryName: {
          connect: {
            id: categoryId
          }
        },
        carImage,
        description,
        dailyRate,
        fineAmount,
        brand,
        licensePlate,
      },
      include: {
        categoryName: true
      }
    });

    return newCar
  }
}

