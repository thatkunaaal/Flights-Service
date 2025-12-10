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
    ErrorResponse.error = error;

    res.status(error.StatusCodes).json(ErrorResponse);
  }
}

/*
DELETE : /airplanes/:id  (req.params)
*/
async function destroyAirplane(req, res) {
  try {
    const airplaneId = req.params.id;
    console.log(`Airplane id: ${airplaneId}`);
    const airplane = await AirplaneService.destroyAirplane(airplaneId);

    SuccessResponse.data = airplane;
    SuccessResponse.message = `Successfully deleted the airplane, with id: ${airplaneId}`;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.StatusCodes).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  destroyAirplane,
};
