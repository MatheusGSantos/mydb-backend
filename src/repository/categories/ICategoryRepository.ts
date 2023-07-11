import { NewCategoryDTO } from "dtos/categories/NewCategoryDTO";
import { Category } from "models/Category";


export interface ICategoryRepository {
  saveNewCategory: (data: NewCategoryDTO) => Promise<void>;
  retrieveAllCategories: () => Promise<Category[]>;
}