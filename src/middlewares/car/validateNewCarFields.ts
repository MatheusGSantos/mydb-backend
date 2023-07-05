import { NextFunction, Request, Response } from "express";
import AppError from "utils/AppError";

export function validateNewCarFields(request: Request, response: Response, next: NextFunction) {
  const requiredFields = ['name', 'categoryId', 'description', 'dailyRate', 'brand', 'licensePlate', 'carImage', 'fineAmount'];

  const missingFields = [];

  for (const field of requiredFields) {
    !request.body[field] && missingFields.push(field)
  }

  if (missingFields.length > 0) throw new AppError(`Missing required fields -> ${missingFields}`, 404)

  next();
}