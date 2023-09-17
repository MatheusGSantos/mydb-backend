import { Request, Response } from 'express';
import { UserUtilities } from 'models/User';
import { CreateUserService } from 'services/user/CreateUserService.js';
import { ShowProfileService } from 'services/user/ShowProfileService';
import { UpdateProfileService } from 'services/user/UpdateProfileService';

export class UserController {
  async showProfile(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute(userId);

    return response.json(user);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const data = { ...UserUtilities.getSafeObject(request.body), confirmPassword: request.body?.confirmPassword };
    const createUserService = new CreateUserService();

    await createUserService.execute(data);

    return response.status(201).json();
  }

  async updateProfile(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { name, driverLicense } = request.body;

    const updateProfileService = new UpdateProfileService();

    await updateProfileService.execute(userId, { name, driverLicense });

    return response.status(200).json();
  }
}
