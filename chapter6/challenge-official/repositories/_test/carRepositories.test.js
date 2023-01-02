const carRepositories = require("../carRepositories");
const truncate = require("../../helpers/truncate");
describe("create car", () => {
  it("should create car to db", async () => {
    await truncate.car();

    const carToCreate = {
      name: "Avanza",
      price: 10000,
      size: "large",
      created_id: 1,
      picture_url:
        "https://res.cloudinary.com/dqzqbgi8e/image/upload/v1671200683/ckhnv61qjotjc9ueev7e.jpg",
    };

    const createdCar = await carRepositories.createCar(carToCreate);

    expect(createdCar.name).toEqual(carToCreate.name);
    expect(parseInt(createdCar.price)).toEqual(carToCreate.price);
    expect(createdCar.size).toEqual(carToCreate.size);
    expect(createdCar.created_id).toEqual(carToCreate.created_id);
    expect(createdCar.picture_url).toEqual(carToCreate.picture_url);

    await truncate.car();
  });
});

describe("update car", () => {
  it("should update the car", async () => {
    await truncate.car();

    const carToCreate = {
      name: "Avanza",
      price: 10000,
      size: "large",
      created_id: 1,
      picture_url:
        "https://res.cloudinary.com/dqzqbgi8e/image/upload/v1671200683/ckhnv61qjotjc9ueev7e.jpg",
    };

    const createdCar = await carRepositories.createCar(carToCreate);

    const updateCarData = {
      name: "Kijang",
      price: 20000,
      updated_id: 2,
    };

    const carIdToUpdate = createdCar.id;

    await carRepositories.updateCarById({
      id: carIdToUpdate,
      ...updateCarData,
    });

    const updatedCar = await carRepositories.readCarById({ id: carIdToUpdate });
    console.log(updatedCar);
    expect(updatedCar.name).toEqual(updateCarData.name);
    expect(parseInt(updatedCar.price)).toEqual(updateCarData.price);
    expect(updatedCar.size).toEqual(carToCreate.size);
    expect(updatedCar.picture_url).toEqual(carToCreate.picture_url);
    expect(updatedCar.updatedBy.id).toEqual(updateCarData.updated_id);
    expect(updatedCar.createdBy.id).toEqual(carToCreate.created_id);

    await truncate.car();
  });
});

describe("read all car", () => {
  it("should return all cars", async () => {
    await truncate.car();
    const carsToCreate = [
      {
        name: "Avanza",
        price: 10000,
        size: "large",
        created_id: 2,
        picture_url:
          "https://res.cloudinary.com/dqzqbgi8e/image/upload/v1671200683/ckhnv61qjotjc9ueev7e.jpg",
      },
      {
        name: "Kijang",
        price: 20000,
        size: "medium",
        created_id: 2,
        picture_url:
          "https://res.cloudinary.com/dqzqbgi8e/image/upload/v1671200168/w7f3tyspetn3xof6oezw.jpg",
      },
    ];

    for (car of carsToCreate) {
      await carRepositories.createCar(car);
    }

    const retrievedCars = await carRepositories.readAllCar({});

    for (i in carsToCreate) {
      expect(retrievedCars[i].name).toEqual(carsToCreate[i].name);
      expect(parseInt(retrievedCars[i].price)).toEqual(carsToCreate[i].price);
      expect(retrievedCars[i].size).toEqual(carsToCreate[i].size);
      expect(retrievedCars[i].picture_url).toEqual(carsToCreate[i].picture_url);
      expect(retrievedCars[i].createdBy.id).toEqual(carsToCreate[i].created_id);
    }
    await truncate.car();
  });
});

describe("read car by id", () => {
  it("should return wanted car", async () => {
    await truncate.car();

    const carToCreate = {
      name: "Avanza",
      price: 10000,
      size: "large",
      created_id: 1,
      picture_url:
        "https://res.cloudinary.com/dqzqbgi8e/image/upload/v1671200683/ckhnv61qjotjc9ueev7e.jpg",
    };

    const createdCar = await carRepositories.createCar(carToCreate);

    const retrievedCar = await carRepositories.readCarById({
      id: createdCar.id,
    });

    expect(retrievedCar.name).toEqual(carToCreate.name);
    expect(parseInt(retrievedCar.price)).toEqual(carToCreate.price);
    expect(retrievedCar.size).toEqual(carToCreate.size);
    expect(retrievedCar.picture_url).toEqual(carToCreate.picture_url);
    expect(retrievedCar.createdBy.id).toEqual(carToCreate.created_id);

    await truncate.car();
  });
});

describe("delete car by id", () => {
  it("should change deletedId column", async () => {
    await truncate.car();

    const carToCreate = {
      name: "Avanza",
      price: 10000,
      size: "large",
      created_id: 1,
      picture_url:
        "https://res.cloudinary.com/dqzqbgi8e/image/upload/v1671200683/ckhnv61qjotjc9ueev7e.jpg",
    };

    const createdCar = await carRepositories.createCar(carToCreate);

    await carRepositories.deleteCarById({ id: createdCar.id, deleted_id: 2 });

    const deletedCar = await carRepositories.readCarById({ id: createdCar.id });

    expect(deletedCar).toEqual(null);

    await truncate.car();
  });
});
