import { getRepository, Repository } from "typeorm";

import Category from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  private static INSTACE: CategoriesRepository;

  private constructor() {
    this.repository = getRepository(Category);
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTACE) {
      CategoriesRepository.INSTACE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTACE;
  }

  async index(): Promise<Category[]> {
    const categories = this.repository.find();

    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export default CategoriesRepository;
