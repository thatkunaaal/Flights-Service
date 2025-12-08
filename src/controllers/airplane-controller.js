const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/*
    POST : /airplane
    req-body : {modelNumber : "ABC" ,capacity: 180}
*/

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    SuccessResponse.message = "Successfully created the airplane";

    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error;

    res.status(error.StatusCodes).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
