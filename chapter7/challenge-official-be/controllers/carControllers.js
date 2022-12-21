const carServices = require("../services/carServices");

const createCar = async (req, res) => {
  const {
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
  } = req.body;

  console.log(req.body);
  const picture = req.fileEncoded;
  const user = req.user;
  const { status, statusCode, message, data } =
    await carServices.createCarService({
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
    });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;
  const picture = req.fileEncoded;
  const user = req.user;
  const { status, statusCode, message, data } =
    await carServices.updateCarService({
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
    });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readAllCar = async (req, res) => {
  const query = req.query;
  
  const { status, statusCode, message, data } =
    await carServices.readAllCarService({ query });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readCar = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await carServices.readCarService({ id });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { status, statusCode, message, data } =
    await carServices.deleteCarService({ id, user });
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

module.exports = {
  createCar,
  updateCar,
  readAllCar,
  readCar,
  deleteCar,
};
