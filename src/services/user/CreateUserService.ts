import { prisma } from 'database/index.js';
import { User } from 'models/User.js';
import AppError from 'utils/AppError.js';

export class CreateUserService {
  async execute(user: User) {
    const { name, age, email, password } = user;

    if (!name || !age || !email || !password) throw new AppError('Missing required fields', 400);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) throw new AppError('A user with this email already exists', 400);

    await prisma.user.create({
      data: {
        name,
        age,
        email,
        password,
      },
    });
  }
}
