import { Request, Response } from 'express';
import { AuthenticateUserService } from 'services/auth/AuthenticateUserService';

export class AuthController {
  async signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService();

    const payload = await authenticateUserService.execute({ email, password });

    return response.status(201).json(payload);
  }
}
