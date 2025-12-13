const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body || !req.body.name) {
    ErrorResponse.message =
      "City name should  be passed while creating airplane.";
    ErrorResponse.error = {
      explanation: "City name should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

module.exports = {
  validateCreateRequest,
};
