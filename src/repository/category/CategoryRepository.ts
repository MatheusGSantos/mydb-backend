import { NewCategoryDTO } from "dtos/categories/NewCategoryDTO";
import { ICategoryRepository } from "./ICategoryRepository";
import { prisma } from "../../database";

export default class CategoryRepository implements ICategoryRepository {
  saveNewCategory: (data: NewCategoryDTO) => Promise<void>;

  async retrieveAllCategories() {
    const categories = await prisma.categories.findMany();

    return categories;
  }

}
