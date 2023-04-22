import { Request, Response } from 'express';
import { CreateUserService } from 'services/user/CreateUserService.js';
import { ShowUserService } from 'services/user/ShowUserService.js';

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
}
