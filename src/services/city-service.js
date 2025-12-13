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

module.exports = {
  getCity,
};
