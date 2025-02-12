// TrainModel.js
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Train = sequelize.define(
    "Train",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      TrainID: {
        type: DataTypes.STRING(20),
        allowNull: false, //need to now allow null
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        required: true,
      },
      StartStations: {
        // Changed from StartStations
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      EndStations: {
        // Changed from EndStations
        type: DataTypes.STRING(50),
        allowNull: false,
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
    if (models.StoppingPoint) {
      Train.hasMany(models.StoppingPoint, {
        foreignKey: "TrainID",
        as: "stoppingPoints",
        onDelete: "CASCADE",
      });
    }
  };

  return Train;
};
