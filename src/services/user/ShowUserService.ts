import { prisma } from 'database/index.js';
import AppError from 'utils/AppError.js';

export class ShowUserService {
  async execute(userId?: number) {
    let users;

    if (!userId) {
      users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          roles: true,
        },
      });
    } else {
      users = await prisma.user.findMany({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          roles: true,
        },
      });

      if (users.length < 1) throw new AppError('Requested user does not exist', 404);
    }

    return users;
  }
}
