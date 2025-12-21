const CrudRepository = require("./crud-repository");
const { flight } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(flight);
  }

  async getAllFlights(filter, sortOrder) {
    const flights = await flight.findAll({
      where: filter,
      order: sortOrder,
    });
    return flights;
  }
}

module.exports = FlightRepository;
