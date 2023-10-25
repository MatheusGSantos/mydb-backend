import { UserUtilities } from 'models/User';
import RentalsRepository from 'repository/rentals/RentalsRepository';
import UsersRepository from 'repository/users/UsersRepository';
import AppError from 'utils/AppError.js';

export class ShowProfileService {
  async execute(userId: string) {
    const usersRepository = new UsersRepository();

    UserUtilities.validate({ id: userId }, { pick: ['id'] });

    const user = await usersRepository.retrieveUser(userId);

    if (!user) throw new AppError('User not found', 404);

    const rentalsRepository = new RentalsRepository();

    const numberOfRentals = await rentalsRepository.retrieveUserRentalsCount(userId);

    const { password: _, ...userWithoutPassword } = user;

    return { numberOfRentals, ...userWithoutPassword };
  }
}
