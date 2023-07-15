import { UserUtilities } from 'models/User';
import UsersRepository from 'repository/users/UsersRepository';
import AppError from 'utils/AppError.js';

export class ShowProfileService {
  async execute(userId: string) {
    const usersRepository = new UsersRepository();

    UserUtilities.validate({ id: userId }, { pick: ['id'] });

    const user = await usersRepository.retrieveUser(userId);

    if (!user) throw new AppError('User not found', 404);

    const { password: _, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  }
}
