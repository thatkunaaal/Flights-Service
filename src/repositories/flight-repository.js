const { Sequelize, col } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { flight, Airport, Airplane } = require("../models");

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

}

module.exports = FlightRepository;
