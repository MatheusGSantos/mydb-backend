import { NewUserDTO } from "dtos/users/NewUserDTO";
import { UpdateUserDTO } from "dtos/users/UpdateUserDTO";
import { User } from "models/User";


export interface IUsersRepository {
  saveNewUser: (data: NewUserDTO) => Promise<void>;
  retrieveUser: (id: string) => Promise<User | null>;
  updateUser: (id: string, data: UpdateUserDTO) => Promise<void>;
}