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
        allowNull: false, //need to now allow null
        references: { 
          model: "TRAINS",
          key: "ID",
        },
      },
      StationName: {
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
