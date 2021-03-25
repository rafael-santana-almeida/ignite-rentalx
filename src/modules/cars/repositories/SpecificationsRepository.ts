import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void {
    console.log("TODO");
  }
}

export default SpecificationsRepository;
