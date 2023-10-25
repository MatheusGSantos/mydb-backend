import { NewCategoryDTO } from "dtos/categories/NewCategoryDTO";
import { ICategoryRepository } from "./ICategoryRepository";
import { prisma } from "../../database";

export default class CategoryRepository implements ICategoryRepository {
  async retrieveAllCategories() {
    const categories = await prisma.categories.findMany();

    return categories;
  }

  async saveNewCategory(data: NewCategoryDTO) {
    await prisma.categories.create({
      data: {
        ...data
      }
    })
  }
}