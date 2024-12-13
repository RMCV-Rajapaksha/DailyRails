const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StoppingPoint = sequelize.define(
    "StoppingPoint",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      TrainID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "TRAINS",
          key: "ID",
        },
      },
      StationName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ArrivalTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      DepartureTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "STOPPING_POINTS",
      timestamps: true,
    }
  );

  StoppingPoint.associate = (models) => {
    if (models.Train) {
      StoppingPoint.belongsTo(models.Train, {
        foreignKey: "TrainID",
        as: "train",
        onDelete: "CASCADE",
      });
    }
  };

  return StoppingPoint;
};
