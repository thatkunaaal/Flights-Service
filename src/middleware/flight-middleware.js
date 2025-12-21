const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { DatetimeHelper } = require("../utils/helper");
const { AirportCodeHelper } = require("../utils/helper");

function validateCreateRequest(req, res, next) {
  if (!req.body) {
    (ErrorResponse.message = "Something went wrong while creating Flight"),
      (ErrorResponse.error = {
        explanation:
          "You should pass necessary properties while creating flight",
      });

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.flightNumber) {
    ErrorResponse.message =
      "flightNumber should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "flightNumber should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message =
      "airplaneId should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "airplaneId should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message =
      "departureAirportId should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation:
        "departureAirportId should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErrorResponse.message =
      "arrivalAirportId should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation:
        "arrivalAirportId should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalTime) {
    ErrorResponse.message =
      "arrivalTime should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "arrivalTime should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureTime) {
    ErrorResponse.message =
      "departureTime should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "departureTime should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.price) {
    ErrorResponse.message = "price should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "price should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.totalSeats) {
    ErrorResponse.message =
      "totalSeats should be passed while creating an airplane";
    ErrorResponse.error = {
      explanation: "totalSeats should be passed while creating an airplane",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateDepartureAndArrivalTime(req, res, next) {
  const deptTime = req.body.departureTime;
  const arrTime = req.body.arrivalTime;

  if (!DatetimeHelper.compareTime(deptTime, arrTime)) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = {
      explanation: "Dept time should be always less than arrival time",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateDepartureAndArrivalAirportId(req, res, next) {
  const departureAirportCode = req.body.departureAirportId;
  const arrivalAirportCode = req.body.arrivalAirportId;

  if (
    AirportCodeHelper.checkDeptarureAndArrivalAirportCodeIsEqual(
      departureAirportCode,
      arrivalAirportCode
    )
  ) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = {
      explanation:
        "Departure airport code & arrival airport code should not be equal",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateDepartureAndArrivalTime,
  validateDepartureAndArrivalAirportId,
};
