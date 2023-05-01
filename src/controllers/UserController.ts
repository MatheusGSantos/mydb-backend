import { Request, Response } from 'express';
import { CreateUserService } from 'services/user/CreateUserService.js';
import { DeleteUserService } from 'services/user/DeleteUserService';
import { ShowUserService } from 'services/user/ShowUserService.js';
import { UpdateUserService } from 'services/user/UpdateUserService';

export class UserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const showUserService = new ShowUserService();

    const users = await showUserService.execute(parseInt(userId));

    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService();

    await createUserService.execute(request.body);

    return response.status(201).json();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { name, age, email } = request.body;

    const updateUser = new UpdateUserService();

    await updateUser.execute(userId, { name, age, email });

    return response.status(200).json();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute(userId);

    return response.status(204).json();
  }
}
