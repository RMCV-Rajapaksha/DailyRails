const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Item = sequelize.define(
    "Item",
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
      ItemType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      ContactNo: {
        type: DataTypes.STRING(15),
      },
      Status: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "Not Approved",
      },
    },
    {
      tableName: "ITEM",
      timestamps: true,
    }
  );

  return Item;
};
