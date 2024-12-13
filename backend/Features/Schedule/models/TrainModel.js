const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Train = sequelize.define(
    "Train",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      StartStations: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      EndStations: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      StartTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      EndTime: {
        type: DataTypes.TIME,
        allowNull: false,
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
