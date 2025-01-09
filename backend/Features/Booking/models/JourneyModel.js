const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Journey = sequelize.define(
    "Journey",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      EndPoint: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "JOURNEY",
      timestamps: true,
    }
  );

  return Journey;
};