import { prisma } from "database";
import { AvailablesCarsRequestDTO, NewCarDTO } from "./ICarRepository";
import AppError from "utils/AppError";
import { Prisma } from "@prisma/client";

export default class CarRepository {
  async getAvailablesCar(data: AvailablesCarsRequestDTO) {
    const {name, brand, category} = data;

    const cars = await prisma.cars.findMany({
      where: {
        available: true,
        name,
        brand,
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
      available
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
        available
      },
      include: {
        categoryName: true
      }
    }).catch((e: Prisma.PrismaClientKnownRequestError) => {throw new AppError(`Invalid fields ${e.meta?.target}`, 404)});

    return newCar
  }
}

