import AppError from 'utils/AppError.js';
import { hash } from 'bcryptjs';
import { UserUtilities } from 'models/User';
import { NewUserDTO } from 'dtos/users/NewUserDTO';
import UsersRepository from 'repository/users/UsersRepository';

interface RequestDTO extends NewUserDTO {
  repeatPassword: string;
}

export class CreateUserService {
  async execute(data: RequestDTO) {
    const { name, email, password, repeatPassword, driverLicense } = data;

    UserUtilities.validate(
      {
        name,
        email,
        password,
        driverLicense,
      },
      {
        omit: ['id', 'isAdmin'],
      },
    );

    if (password !== repeatPassword) throw new AppError('Passwords do not match', 400);

    const usersRepository = new UsersRepository();

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) throw new AppError('A user with this email already exists', 400);

    const hashedPassword = await hash(password, 8);

    await usersRepository.saveNewUser({
      name,
      email,
      password: hashedPassword,
      driverLicense,
    });
  }
}
