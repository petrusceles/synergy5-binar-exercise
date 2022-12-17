const CarRepositories = require("../repositories/carRepositories");
const cloudinary = require("../config/cloudinary");

function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
}

const createCarService = async ({
  plate,
  manufacture,
  model,
  picture,
  price,
  capacity,
  description,
  transmission,
  type,
  year,
  options,
  specs,
  availableAt,
  user,
}) => {
  try {
    // console.log(name, price, size);
    if (
      !plate ||
      !manufacture ||
      !model ||
      !picture ||
      !price ||
      !capacity ||
      !description ||
      !transmission ||
      !type ||
      !year ||
      !options ||
      !specs ||
      !availableAt
    ) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "all fields must not be empty",
        data: {
          created_car: null,
        },
      };
    }

    const query = {
      plate,
    };
    const isCarExist = await CarRepositories.readAllCar({ query });

    if (isCarExist.length) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "car has already exist",
        data: {
          created_car: null,
        },
      };
    }
    const createdBy = user.id;

    const fileResponse = await uploadToCloudinary(picture);

    const newCar = await CarRepositories.createCar({
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
      pictureUrl: fileResponse.url,
    });

    return {
      status: "CREATED",
      statusCode: 201,
      message: "new car added",
      data: {
        created_car: newCar,
      },
    };
  } catch (err) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        created_car: null,
      },
    };
  }
};

const updateCarService = async ({
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
  user,
  picture,
  id,
}) => {
  try {
    if (
      !plate &&
      !manufacture &&
      !model &&
      !price &&
      !capacity &&
      !description &&
      !transmission &&
      !type &&
      !year &&
      !options &&
      !specs &&
      !availableAt &&
      !picture
    ) {
      return {
        status: "BAD_REQUEST",
        statusCode: 400,
        message: "no fields data received",
        data: {
          updated_car: null,
        },
      };
    }
    let pictureUrl = undefined;
    if (picture) {
      const fileResponse = await uploadToCloudinary(picture);
      pictureUrl = fileResponse.url;
    }

    const updatedBy = user.id;
    const updatedCar = await CarRepositories.updateCarById({
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
    });

    return {
      status: "OK",
      statusCode: 200,
      message: "car updated",
      data: {
        updated_car: updatedCar,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        updated_car: null,
      },
    };
  }
};

const readAllCarService = async ({ query }) => {
  try {
    const cars = await CarRepositories.readAllCar({ query });
    if (!cars.length) {
      return {
        status: "NOT_FOUND",
        statusCode: 404,
        message: "car not found",
        data: {
          retrieved_car: null,
        },
      };
    }

    return {
      status: "OK",
      statusCode: 200,
      message: "car found",
      data: {
        retrieved_car: cars,
      },
    };
  } catch (err) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        created_car: null,
      },
    };
  }
};

const readCarService = async ({ id }) => {
  try {
    const car = await CarRepositories.readCarById({ id });
    if (!car) {
      return {
        status: "NOT_FOUND",
        statusCode: 404,
        message: "car not found",
        data: {
          retrieved_car: null,
        },
      };
    }
    return {
      status: "OK",
      statusCode: 200,
      message: "car found",
      data: {
        retrieved_car: car,
      },
    };
  } catch (err) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        created_car: null,
      },
    };
  }
};

const deleteCarService = async ({ id, user }) => {
  try {
    const deletedBy = user.id;
    const deletedCar = await CarRepositories.deleteCarById({ id, deletedBy });
    if (deletedCar[0] == 0) {
      return {
        status: "NOT_FOUND",
        statusCode: 404,
        message: "car not found",
        data: {
          deleted_car: null,
        },
      };
    }
    return {
      status: "OK",
      statusCode: 200,
      message: "car deleted",
      data: {
        deleted_car: deletedCar,
      },
    };
  } catch (err) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
      message: err,
      data: {
        deleted_car: null,
      },
    };
  }
};
module.exports = {
  createCarService,
  updateCarService,
  readAllCarService,
  readCarService,
  deleteCarService,
};
