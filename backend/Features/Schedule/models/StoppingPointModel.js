const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StoppingPoint = sequelize.define(
    "StoppingPoint",
    {
      PointID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      TrainID: {
        type: DataTypes.STRING(20),
        allowNull: false, //need to now allow null
        references: {
          model: "TRAINS",
          key: "TrainID",
        },
      },
      StationID: {
        type: DataTypes.STRING(50),
        allowNull: false, //need to now allow null
      },
      ArrivalTime: {
        type: DataTypes.TIME,
        allowNull: false, //need to now allow null
      },
      DepartureTime: {
        type: DataTypes.TIME,
        allowNull: false, //need to now allow null
      },
    },
    {
      tableName: "STOPPING_POINTS",
      timestamps: true,
    }
  );

  StoppingPoint.associate = (models) => {
    StoppingPoint.belongsTo(models.Train, {
      foreignKey: "TrainID",
      as: "train",
      onDelete: "CASCADE",
    });

    StoppingPoint.belongsTo(models.Station, {
      foreignKey: "StationID",
      targetKey: "StationID",
      as: "station",
    });
  };

  return StoppingPoint;
};
