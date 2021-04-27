import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUSersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUSersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<void> {
    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
