import { NewUserDTO } from "dtos/users/NewUserDTO";
import { UpdateUserDTO } from "dtos/users/UpdateUserDTO";
import { prisma } from "../../database";
import { IUsersRepository } from "./IUsersRepository";
import { User } from "models/User";


export default class UsersRepository implements IUsersRepository {
  async saveNewUser(data: NewUserDTO): Promise<void> {
    await prisma.user.create({
      data: { ...data },
    });
  }

  async retrieveUser(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }
}