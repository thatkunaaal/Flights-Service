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

module.exports = {
  getCity,
};
