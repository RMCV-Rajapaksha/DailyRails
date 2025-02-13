const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Journey = sequelize.define(
    "Journey",
    {
      JourneyID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      RouteID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      StartPoint: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "STATION",
          key: "StationID",
        },
      },
      EndPoint: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "STATION",
          key: "StationID",
        },
      },
    },
    {
      tableName: "JOURNEY",
      timestamps: true,
    }
  );

  Journey.associate = (models) => {
    Journey.belongsTo(models.Station, {
      foreignKey: "StartPoint",
      as: "startStation",
    });
    Journey.belongsTo(models.Station, {
      foreignKey: "EndPoint",
      as: "endStation",
    });
  };

  return Journey;
};
