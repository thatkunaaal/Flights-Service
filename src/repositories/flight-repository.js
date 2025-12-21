const CrudRepository = require("./crud-repository");
const { flight } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(flight);
  }

  async getAllFlights(filter) {
    const flights = await flight.findAll({
      where: filter,
    });
    return flights;
  }
}

module.exports = FlightRepository;
