import { Request, Response } from 'express';
import { UserUtilities } from 'models/User';
import { AuthenticateUserService } from 'services/auth/AuthenticateUserService';
import AppError from 'utils/AppError';

export class AuthController {
  async signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email && !password) throw new AppError('Missing required fields', 400);

    UserUtilities.validate({email, password}, {pick: ['email', 'password']});

    const authenticateUserService = new AuthenticateUserService();

    const payload = await authenticateUserService.execute({ email, password });

    return response.status(201).json(payload);
  }
}
