import { prisma } from 'database/index.js';
import AppError from 'utils/AppError.js';
import { compare } from 'bcryptjs';
import { GenerateToken } from 'providers/GenerateToken';

interface RequestDTO {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute(signInData: RequestDTO) {
    const { email, password } = signInData;

    if (!email && !password) throw new AppError('Missing required fields', 400);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        age: true,
        email: true,
        password: true,
        roles: true,
      },
    });

    if (!user) throw new AppError('Incorrect e-mail/password', 404);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta.', 404);
    }

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(user.id.toString());

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: { ...userWithoutPassword } };
  }
}
