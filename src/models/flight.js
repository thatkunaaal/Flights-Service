"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
      });
    }
  }
  flight.init(
    {
      flightNumber: { type: DataTypes.STRING, allowNull: false },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Airplane",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Airport",
          key: "code",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Airport",
          key: "code",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      boardingGate: { type: DataTypes.STRING },
      totalSeats: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "flight",
    }
  );
  return flight;
};
