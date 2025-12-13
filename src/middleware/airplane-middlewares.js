const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body || !req.body.modelNumber) {
    ErrorResponse.message =
      "ModelNumber should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "ModelNumber should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateReqeuest(req, res, next) {
  if (!req.body || !req.body.capacity) {
    ErrorResponse.message =
      "Capacity should be provided while updating the airplane";
    ErrorResponse.error = {
      explanation: "Capacity should be provided while updating the airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateReqeuest,
};
