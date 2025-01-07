const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Station = sequelize.define(
    "Station",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      StationName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      StationID: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      StationAddress: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      StationLine: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      ContactNumber: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      tableName: "STATION",
      timestamps: true,
    }
  );

  return Station;
};
