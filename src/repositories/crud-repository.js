const { Logger } = require("../config");
const { StatusCodes} = require("http-status-codes")
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(id) {
      const response = await this.model.destroy({
        where: {
          id: id,
        },
      });

      if(!response){
        throw new AppError("Not able to find resource",StatusCodes.NOT_FOUND);
      }

      return response;
  }

  async get(data) {
    try {
      const response = await this.model.findByPK(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in Crud repo : get");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in Crud repo : getAll");
      throw error;
    }
  }

  async update(id, data) {
    // data -> obj
    try {
      const response = this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in Crud repo : update");
      throw error;
    }
  }
}

module.exports = CrudRepository;
