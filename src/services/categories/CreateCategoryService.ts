import { NewCategoryDTO } from "dtos/categories/NewCategoryDTO";
import CategoryRepository from "repository/categories/CategoryRepository";

export class CreateNewCategoryService {
  async execute(data: NewCategoryDTO): Promise<void> {
    const categoryRepository: CategoryRepository = new CategoryRepository;

    return categoryRepository.saveNewCategory(data);
  }
}