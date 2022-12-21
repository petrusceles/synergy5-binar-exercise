const { Car, User } = require("../models");
const { Op } = require("sequelize");
const CAR_ATTRIBUTES = {
  include: [
    {
      model: User,
      as: "createdByUser",
      attributes: ["name", "email"],
    },
    {
      model: User,
      as: "updatedByUser",
      attributes: ["name", "email"],
    },
    {
      model: User,
      as: "deletedByUser",
      attributes: ["name", "email"],
    },
  ],
  attributes: {
    exclude: ["createdBy", "updatedBy", "deletedBy"],
  },
};
class CarRepositories {
  static async createCar({
    plate,
    manufacture,
    model,
    price,
    capacity,
    description,
    transmission,
    type,
    year,
    options,
    specs,
    availableAt,
    createdBy,
    pictureUrl,
  }) {
    const newCar = await Car.create({
      plate,
      manufacture,
      model,
      price,
      capacity,
      description,
      transmission,
      type,
      year,
      options,
      specs,
      availableAt,
      createdBy,
      pictureUrl,
    });

    return newCar;
  }

  static async updateCarById({
    plate,
    manufacture,
    model,
    price,
    capacity,
    description,
    transmission,
    type,
    year,
    options,
    specs,
    availableAt,
    updatedBy,
    pictureUrl,
    id,
  }) {
    // console.log(id,name,price,updated_id)
    const updatedCar = await Car.update(
      {
        plate,
        manufacture,
        model,
        price,
        capacity,
        description,
        transmission,
        type,
        year,
        options,
        specs,
        availableAt,
        updatedBy,
        pictureUrl,
      },
      {
        where: {
          id,
          deletedAt: null,
        },
      }
    );

    return updatedCar;
  }

  static async readAllCar({ query }) {
    if (query.availableAt) {
      query.availableAt = {
        [Op.gte]: query.availableAt,
      };
    }
    if (query.capacity) {
      query.capacity = {
        [Op.gte]: query.capacity
      }
    }
    console.log(query);
    const cars = await Car.findAll({
      where: {
        ...query,
        deletedAt: null,
      },
      ...CAR_ATTRIBUTES,
    });
    console.log(cars)
    return cars;
  }

  static async readCarById({ id }) {
    const car = await Car.findOne({
      where: {
        id,
        deletedAt: null,
      },
      ...CAR_ATTRIBUTES,
    });
    return car;
  }

  static async deleteCarById({ id, deletedBy }) {
    const deletedCar = await Car.update(
      {
        deletedBy,
        deletedAt: new Date(),
      },
      {
        where: {
          id,
          deletedAt: null,
        },
      }
    );
    return deletedCar;
  }
}

module.exports = CarRepositories;
