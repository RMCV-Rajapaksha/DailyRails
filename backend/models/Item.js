const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Item = sequelize.define(
    "Item",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      itemType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      contactNo: {
        type: DataTypes.STRING(15), // Adjusted length for phone number
      },
      status: {
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
