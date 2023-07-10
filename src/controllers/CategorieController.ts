import { Request, Response } from "express";
import { CreateNewCategoryService } from "services/categories/CreateCategoryService";
import { RetrieveAllCategoriesService } from "services/categories/RetrieveAllCategoriesService";

export class CategoriesController {
  async getAllCategories(request: Request, response: Response): Promise<Response> {
    const retrieveAllCategoriesService = new RetrieveAllCategoriesService();

    const categories = await retrieveAllCategoriesService.execute();

    return response.json(categories);
  }

  async saveNewCategory(request: Request, response: Response): Promise<Response> {
    const createNewCategoryService = new CreateNewCategoryService();

    const { name, icon, description } = request.body;

    await createNewCategoryService.execute({ name, icon, description });
  
    return response.json('Created')
  }
}