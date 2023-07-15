import { compare } from 'bcryptjs';

import { GenerateToken } from 'providers/GenerateToken';
import UsersRepository from 'repository/users/UsersRepository';

import AppError from 'utils/AppError.js';

interface RequestDTO {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute(signInData: RequestDTO) {
    const { email, password } = signInData;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect e-mail/password', 404);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect e-mail/password.', 404);
    }

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(user.id);

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: { ...userWithoutPassword } };
  }
}
