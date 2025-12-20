const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const AirportRepo = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await AirportRepo.create(data);
    return airport;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Something went wrong while creating airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(data) {
  try {
    const airport = await AirportRepo.destroy(data);
    return airport;
  } catch (error) {
    if (error.StatusCodes === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested to delete is not present",
        error.StatusCodes
      );
    }

    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirport(data) {
  try {
    const airport = await AirportRepo.get(data);
    return airport;
  } catch (error) {
    if (error.StatusCodes === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested is not present",
        error.StatusCodes
      );
    }

    throw new AppError(
      "Cannot fetch data of the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airport = await AirportRepo.getAll();
    return airport;
  } catch (error) {
    throw new AppError(
      "Something went wrong while fetching all the Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const airport = await AirportRepo.update(id, data);
    return airport;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = [];

      for (err of error.errors) {
        explanation.push(err.message + ", " + err.value);
      }

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error.StatusCodes === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested to update is not present.",
        error.StatusCodes
      );
    }

    throw new AppError(
      "Something went wrong while updating all the Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  destroyAirport,
  getAirport,
  getAirports,
  updateAirport,
};
