import { NewCategoryDTO } from "dtos/categories/NewCategoryDTO";
import { CategoryUtilities } from "models/Category";
import CategoryRepository from "repository/categories/CategoryRepository";

export class CreateNewCategoryService {
  async execute(data: NewCategoryDTO): Promise<void> {
    const categoryRepository: CategoryRepository = new CategoryRepository;

    CategoryUtilities.validate(data, {
      omit: ['id']
    })

    return categoryRepository.saveNewCategory(data);
  }
}