import Category from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  index(): Category[] {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const gategory = new Category();

    Object.assign(gategory, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(gategory);
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export default CategoriesRepository;
