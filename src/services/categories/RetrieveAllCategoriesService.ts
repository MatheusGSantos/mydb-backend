import CategoryRepository from "repository/categories/CategoryRepository";

export class RetrieveAllCategoriesService {
  async execute() {
    const categoryRepository = new CategoryRepository;

    return categoryRepository.retrieveAllCategories(); 
  } 
}