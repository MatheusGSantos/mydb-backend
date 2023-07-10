import { NewCategoryDTO } from "dtos/categories/NewCategoryDTO";
import { ICategoryRepository } from "./ICategoryRepository";
import { prisma } from "../../database";
import AppError from "utils/AppError";

export default class CategoryRepository implements ICategoryRepository {
  async retrieveAllCategories() {
    const categories = await prisma.categories.findMany();

    return categories;
  }

  async saveNewCategory(data: NewCategoryDTO): Promise<void> {
    try {
      await prisma.categories.create({
        data: {
          ...data
        }
      })
    } catch (e) {
      throw new AppError("Failed on create new category", 404)
    }
  }
}