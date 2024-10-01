const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "USER",
      timestamps: true,
    }
  );

  return User;
};
