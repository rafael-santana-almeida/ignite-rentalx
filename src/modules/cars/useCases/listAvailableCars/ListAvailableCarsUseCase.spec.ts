import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "caregoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars available by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand2",
      category_id: "caregoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars available by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand3",
      category_id: "caregoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all cars available by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "caregoryIdCar4",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "caregoryIdCar4",
    });

    expect(cars).toEqual([car]);
  });
});
