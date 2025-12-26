const { Sequelize, col } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { flight, Airport, Airplane, sequelize } = require("../models");

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
    await sequelize.query(
      `SELECT * FROM flights WHERE id = ${flightId} FOR UPDATE;`
    );

    const flightInstance = await flight.findByPk(flightId);

    if (Number(dec)) {
      await flightInstance.decrement("totalSeats", { by: seats });
    } else {
      await flightInstance.increment("totalSeats", { by: seats });
    }

    await flightInstance.reload();
    return flightInstance;
  }
}

module.exports = FlightRepository;
