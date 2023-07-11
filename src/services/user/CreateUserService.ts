import { prisma } from 'database/index.js';
import AppError from 'utils/AppError.js';
import { hash } from 'bcryptjs';
import { User } from 'models/User';

export class CreateUserService {
  async execute(user: User) {
    const { name, email, password } = user;

    if (!name || !email || !password) throw new AppError('Missing required fields', 400);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) throw new AppError('A user with this email already exists', 400);

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
