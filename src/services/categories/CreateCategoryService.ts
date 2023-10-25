import { Prisma } from "@prisma/client";
import { NewCategoryDTO } from "dtos/categories/NewCategoryDTO";
import { CategoryUtilities } from "models/Category";
import CategoryRepository from "repository/categories/CategoryRepository";
import AppError from "utils/AppError";

export class CreateNewCategoryService {
  async execute(data: NewCategoryDTO): Promise<void> {
    const categoryRepository: CategoryRepository = new CategoryRepository();

    CategoryUtilities.validate(data, {
      omit: ['id']
    })

    try {
      return await categoryRepository.saveNewCategory(data)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('This category already exists')
      }
    }
  }
}