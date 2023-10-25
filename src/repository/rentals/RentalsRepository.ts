import { NewRentalDTO } from 'dtos/rentals/NewRentalDTO';
import { IRentalsRepository } from './IRentalsRepository';
import { Rental } from 'models/Rental';
import { prisma } from '../../database';

export default class RentalsRepository implements IRentalsRepository {
  async getRentalById(rentalId: string) {
    const rental = await prisma.rentals.findUnique({
      where: {
        id: rentalId,
      },
      include: {
        car: {
          include: {
            category: true,
          },
        },
      },
    });

    return rental;
  }

  async saveNewRental(data: NewRentalDTO) {
    await prisma.rentals.create({
      data: {
        ...data,
      },
    });
  }

  async retrieveUserRentals(userId: string) {
    const rentals = await prisma.rentals.findMany({
      where: {
        userId,
      },
      include: {
        car: {
          include: {
            category: true,
          },
        },
      },
    });

    return rentals;
  }

  async retrieveUserRentalsCount(userId: string) {
    const rentalsCount = await prisma.rentals.count({
      where: {
        userId,
      },
    });

    return rentalsCount;
  }

  async updateRental(rentalId: string, data: Omit<Partial<Rental>, 'id'>) {
    await prisma.rentals.update({
      where: {
        id: rentalId,
      },
      data: {
        ...data,
      },
    });
  }
}
