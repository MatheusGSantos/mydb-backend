import { prisma } from 'database/index.js';
import AppError from 'utils/AppError.js';

export class DeleteUserService {
  async execute(userId: string) {
    try {
      await prisma.user.delete({
        where: {
          id: parseInt(userId, 10),
        },
      });
    } catch (error: any) {
      const message = error?.meta?.cause;
      throw new AppError(message, 404);
    }
  }
}
