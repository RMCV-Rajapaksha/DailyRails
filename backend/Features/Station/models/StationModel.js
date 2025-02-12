const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Station = sequelize.define(
    "Station",
    {
      StationName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      StationID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      StationAddress: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      StationLine: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      ContactNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      tableName: "STATION",
      timestamps: true,
    }
  );

  Station.associate = (models) => {
    Station.hasMany(models.Journey, {
      foreignKey: "StartPoint",
      as: "departureJourneys",
    });
    Station.hasMany(models.Journey, {
      foreignKey: "EndPoint",
      as: "arrivalJourneys",
    });
    Station.hasMany(models.Train, {
      foreignKey: "StartStations",
      as: "departingTrains",
    });
    Station.hasMany(models.Train, {
      foreignKey: "EndStations",
      as: "arrivingTrains",
    });
  };

  return Station;
};
