const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });

    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json(error);
  }
}

async function destroyAirport(req, res) {
  try {
    const airportId = req.params.id;
    const airport = await AirportService.destroyAirport(airportId);

    SuccessResponse.data = airport;
    SuccessResponse.message = `Successfully deleted the airport, with id: ${airportId}
    `;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(ErrorResponse);
  }
}

async function getAirport(req, res) {
  try {
    const airportId = req.params.id;
    const airport = await AirportService.getAirport(airportId);

    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airport = await AirportService.getAirports();

    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  destroyAirport,
  getAirport,
  getAirports,
};
