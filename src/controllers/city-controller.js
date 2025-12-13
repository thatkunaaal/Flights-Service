const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { CityService } = require("../services");

async function getCity(req, res) {
  try {
    const cityId = req.params.id;
    const city = await CityService.getCity(cityId);

    SuccessResponse.data = city;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(ErrorResponse);
  }
}

async function getAllCity(req, res) {
  try {
    const city = await CityService.getAllCity();

    SuccessResponse.data = city;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(ErrorResponse);
  }
}

async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });

    SuccessResponse.data = city;

    return res.status(StatusCodes.CREATED).json(city);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(error);
  }
}

async function destroyCity(req, res) {
  try {
    const cityId = req.params.id;
    const city = await CityService.destroyCity(cityId);

    SuccessResponse.data = city;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(ErrorResponse);
  }
}

module.exports = {
  getCity,
  getAllCity,
  createCity,
  destroyCity,
};
