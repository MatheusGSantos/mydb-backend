import { NextFunction, Request, Response } from "express";
import AppError from "utils/AppError";
import UsersRepository from "repository/users/UsersRepository";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.retrieveUser(id);

  if (!user?.isAdmin) {
    throw new AppError("You dont have access to this route.", 401);
  }

  return next();
}