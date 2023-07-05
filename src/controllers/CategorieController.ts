import { Request, Response } from "express";
import { RetrieveAllCategoriesService } from "services/categories/RetrieveAllCategoriesService";

export class CategoriesController {
  async getAllCategories(request: Request, response: Response): Promise<Response> {
    const retrieveAllCategoriesService = new RetrieveAllCategoriesService();

    const categories = await retrieveAllCategoriesService.execute();

    return response.json(categories);
  }
}