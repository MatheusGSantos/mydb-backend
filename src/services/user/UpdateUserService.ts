import { prisma } from 'database/index.js';
import { User } from 'models/User/User.js';
import AppError from 'utils/AppError.js';
import { upperCaseFirstLetter } from 'utils/helpers';

export class UpdateUserService {
  async execute(userId: string, user: Omit<User, 'password'>) {
    const { name, email } = user;

    if (!name && !email) throw new AppError('Update action needs at least one attribute. Got none.', 400);

    try {
      await prisma.user.update({
        where: {
          id: parseInt(userId, 10),
        },
        data: {
          name,
          email,
        },
      });
    } catch (error: any) {
      const message = error?.meta?.target
        ? `${upperCaseFirstLetter(error?.meta?.target[0])} already exists`
        : error?.meta?.cause;
      const statusCode = error?.meta?.target ? 400 : 404;
      throw new AppError(message, statusCode);
    }
  }
}
