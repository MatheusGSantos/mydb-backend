import CategoryRepository from "repository/category/CategoryRepository";

export class RetrieveAllCategoriesService {
  async execute() {
    const categoryRepository = new CategoryRepository;

    return categoryRepository.retrieveAllCategories(); 
  } 
}