import { ICarsRepository } from './ICarRepository';
import { prisma } from '../../database';
import { NewCarDTO } from 'dtos/cars/NewCarDTO';
import { AvailablesCarsRequestDTO } from 'dtos/cars/AvailablesCarsRequestDTO';

type WhereClause = {
  available: boolean;
  name?: { contains: string | undefined };
  brand?: { contains: string | undefined };
  category?: { name: { in: string[] | undefined } };
  dailyRate?: { gte: number; lte: number };
};

export default class CarRepository implements ICarsRepository {
  async getAvailableCars(data: AvailablesCarsRequestDTO) {
    const { name, brand, categories, priceRange } = data;

    // Initialize the where clause with the filters that are always applied
    const whereClause: WhereClause = {
      available: true,
      name: {
        contains: name,
      },
      brand: {
        contains: brand,
      },
    };

    if (categories) {
      // If categories is defined, split it into an array and add the categories filter to the where clause
      const categoriesArray = categories.split(',');
      whereClause['category'] = {
        name: {
          in: categoriesArray,
        },
      };
    }

    // If priceRange is defined, split it into minPrice and maxPrice and add the dailyRate filter to the where clause
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(',').map(Number);
      whereClause['dailyRate'] = {
        gte: minPrice,
        lte: maxPrice,
      };
    }

    const cars = await prisma.cars.findMany({
      where: whereClause,
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
            icon: true,
          },
        },
      },
    });

    return cars;
  }

  async getCarById(carId: string) {
    const car = await prisma.cars.findUnique({
      where: {
        id: carId,
      },
    });

    return car;
  }

  async saveNewCar(data: NewCarDTO) {
    const { name, categoryId, carImage, description, dailyRate, fineAmount, brand, licensePlate } = data;

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
      },
    });

    return newCar;
  }

  async updateAvailableCar(carId: string, available: boolean) {
    const car = await prisma.cars.update({
      where: {
        id: carId,
      },
      data: {
        available,
      },
    });

    return car;
  }

  async getCarBrands() {
    const brands = await prisma.cars.groupBy({
      by: ['brand'],
    });

    return brands.map((brand) => brand.brand);
  }
}
