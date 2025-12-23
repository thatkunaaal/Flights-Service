"use strict";
const { Model } = require("sequelize");
const { Enum } = require("../utils/common");
const { BUSINESS, PREMIUM_ECONOMY, ECONOMY, FIRST_CLASS } = Enum.SEAT_TYPE;

module.exports = (sequelize, DataTypes) => {
  class seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
      });
    }
  }
  seat.init(
    {
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
      row: { type: DataTypes.INTEGER, allowNull: false },
      col: { type: DataTypes.STRING, allowNull: false },
      type: {
        type: DataTypes.ENUM,
        values: [BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS],
        defaultValue: ECONOMY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "seat",
    }
  );
  return seat;
};
