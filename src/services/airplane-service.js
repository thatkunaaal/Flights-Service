const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Something went wrong while creating Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(data) {
  try {
    const airplane = await airplaneRepository.destroy(data);
    return airplane;
  } catch (error) {
    if (error.StatusCodes === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested to delete is not present",
        error.StatusCodes
      );
    }

    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplane(data) {
  try {
    const airplane = await airplaneRepository.get(data);
    return airplane;
  } catch (error) {
    if (error.StatusCodes === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested is not present",
        error.StatusCodes
      );
    }

    throw new AppError(
      "Cannot fetch data of the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirplane() {
  try {
    const airplane = await airplaneRepository.getAll();
    return airplane;
  } catch (error) {
    throw new AppError(
      "Something went wrong while fetching all the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  destroyAirplane,
  getAirplane,
  getAllAirplane,
};
