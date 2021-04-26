import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUSersRepository } from "../IUsersRepository";

class UsersRepository implements IUSersRepository {
  private repositoy: Repository<User>;

  constructor() {
    this.repositoy = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repositoy.create({
      name,
      username,
      email,
      password,
      driver_license,
    });

    await this.repositoy.save(user);
  }
}

export { UsersRepository };
