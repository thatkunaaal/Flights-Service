const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
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

    if (query.trips) {
      const [departureAirportId, arrivalAirportId] = query.trips.split("-");
      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;
    }

    const flights = await flightRepo.getAllFlights(customFilter);
    return flights;
  } catch (error) {
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
