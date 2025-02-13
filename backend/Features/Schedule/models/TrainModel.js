// TrainModel.js
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Train = sequelize.define(
    "Train",
    {
      TrainID: {
        type: DataTypes.STRING(20),
        allowNull: false, //need to now allow null
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(50),
        required: true,
      },
      StartStations: {
        // Changed from StartStations
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "STATION",
          key: "StationID",
        },
      },
      EndStations: {
        // Changed from EndStations
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "STATION",
          key: "StationID",
        },
      },
      StartTime: {
        type: DataTypes.TIME,
        allowNull: false, //need to now allow null
      },
      EndTime: {
        type: DataTypes.TIME,
        allowNull: false, //need to now allow null
      },
    },
    {
      tableName: "TRAINS",
      timestamps: true,
    }
  );

  Train.associate = (models) => {
    Train.hasMany(models.StoppingPoint, {
      foreignKey: "TrainID",
      as: "stoppingPoints",
      onDelete: "CASCADE",
    });

    Train.belongsTo(models.Station, {
      foreignKey: "StartStations",
      as: "startStation",
    });

    Train.belongsTo(models.Station, {
      foreignKey: "EndStations",
      as: "endStation",
    });
  };

  return Train;
};
