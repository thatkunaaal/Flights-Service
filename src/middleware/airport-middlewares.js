const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body) {
    ErrorResponse.message =
      "Name,code, cityId should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation:
        "Name,code, cityId should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.name) {
    ErrorResponse.message = "Name should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "Name should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.code) {
    ErrorResponse.message = "Code should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "Code should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.cityId) {
    ErrorResponse.message =
      "City Id should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "City Id should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
