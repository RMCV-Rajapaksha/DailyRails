// TrainModel.js
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Journey = sequelize.define("Journey", {
    JourneyID: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: "JourneyID"
    },
    RouteID: {
      type: DataTypes.INTEGER,
      field: "RouteID"
    },
    Price: {
      type: DataTypes.INTEGER,
      field: "Price"
    },
    StartPoint: {
      type: DataTypes.STRING,
      field: "StartPoint"
    },
    EndPoint: {
      type: DataTypes.STRING,
      field: "EndPoint"
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "createdAt"
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updatedAt"
    }
  }, {
    tableName: "Journey",
    freezeTableName: true,
    timestamps: true
  });

  return Journey;
};
