import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repositoy: Repository<User>;

  constructor() {
    this.repositoy = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repositoy.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repositoy.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repositoy.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repositoy.findOne(id);

    return user;
  }
}

export { UsersRepository };
