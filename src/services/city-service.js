const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const cityRepository = new CityRepository();
const AppError = require("../utils/errors/app-error");

async function getCity(data) {
  try {
    const city = await cityRepository.get(data);
    return city;
  } catch (error) {
    if (error.StatusCodes === StatusCodes.NOT_FOUND)
      throw new AppError(
        "The city you requested is not present",
        error.StatusCodes
      );

    throw new AppError(
      "Cannot fetch data of the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllCity() {
  try {
    const city = await cityRepository.getAll();
    return city;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    throw new AppError(
      "Something went wrong while creating Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(data) {
  try {
    const city = await cityRepository.destroy(data);
    return city;
  } catch (error) {
    if (error.StatusCodes === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to delete is not present",
        error.StatusCodes
      );
    }

    throw new AppError(
      `Cannot able to destroy the city with id: ${data}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.StatusCodes === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to update is not present",
        error.StatusCodes
      );
    }

    throw new AppError(
      "Something went wrong, while updating the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getCity,
  getAllCity,
  createCity,
  destroyCity,
  updateCity,
};
