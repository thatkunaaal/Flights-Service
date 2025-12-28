const { Sequelize, col } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { flight, Airport, Airplane, sequelize } = require("../models");
const { addRowLockOnFlight } = require("./queries");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class FlightRepository extends CrudRepository {
  constructor() {
    super(flight);
  }

  async getAllFlights(filter, sortOrder) {
    const flights = await flight.findAll({
      where: filter,
      order: sortOrder,
      include: [
        {
          model: Airport,
          as: "arrivalAirport",
          required: true,
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
        },
        {
          model: Airport,
          as: "departureAirport",
          required: true,
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
        },
        { model: Airplane, required: true },
      ],
    });
    return flights;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await sequelize.transaction();

    try {
      await sequelize.query(addRowLockOnFlight(flightId), {
        transaction: transaction,
      });

      const flightInstance = await flight.findByPk(flightId, {
        transaction: transaction,
      });

      if (flightInstance.totalSeats == 200 && dec != true) {
        throw new AppError(
          "Cannot increase seats above the maximum capacity of the Airplane",
          StatusCodes.BAD_REQUEST
        );
      }

      if (Number(dec)) {
        await flightInstance.decrement("totalSeats", {
          by: seats,
          transaction: transaction,
        });
      } else {
        await flightInstance.increment("totalSeats", {
          by: seats,
          transaction: transaction,
        });
      }

      await transaction.commit();
      await flightInstance.reload();

      return flightInstance;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
