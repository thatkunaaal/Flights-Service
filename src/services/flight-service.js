const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");
const flightRepo = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepo.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      const value = error.value;
      const fields = error.fields.toString();

      throw new AppError(
        `Invalid value: ${value}, selected for fields: ${fields}. Please choose a valid value.`,
        StatusCodes.BAD_REQUEST
      );
    }

    if (error.name === "SequelizeValidationError") {
      let explanation = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Something went wrong while creating flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  try {
    const customFilter = {};
    let customSort = [];

    if (query.trips) {
      const [departureAirportId, arrivalAirportId] = query.trips.split("-");

      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
      const [minPrice, maxPrice] = query.price.split("-");

      customFilter.price = {
        [Op.between]: [!minPrice ? 0 : minPrice, !maxPrice ? 15000 : maxPrice],
      };
    }

    if (query.tripDate) {
      const tripStartTime = new Date(query.tripDate);
      const tripEndTime = new Date(query.tripDate);

      tripEndTime.setUTCDate(tripEndTime.getUTCDate() + 1);
      tripEndTime.setUTCMilliseconds(tripEndTime.getUTCMilliseconds() - 1);

      customFilter.departureTime = {
        [Op.between]: [tripStartTime, tripEndTime],
      };
    }

    if (query.sort) {
      const sortField = query.sort.split(",");
      const sort = sortField.map((sortingField) => sortingField.split("_"));

      customSort = sort;
    }

    const flights = await flightRepo.getAllFlights(customFilter, customSort);
    return flights;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Something went wrong while fetching the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
