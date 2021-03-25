import Category from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  index(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };
