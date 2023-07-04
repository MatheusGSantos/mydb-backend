import { NextFunction, Request, Response } from "express";
import { prisma } from "database";
import AppError from "utils/AppError";


export async function verifyIfIsAdminUser(request: Request, response: Response, next: NextFunction) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: request.user.id
    }
  })

  if (!user.isAdmin) {
    throw new AppError("You dont have access to this route.", 401);
  }

  return next();
}