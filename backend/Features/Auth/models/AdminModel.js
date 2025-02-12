const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "Admin",
    {
      EmployeeID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      JobTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "ADMIN",
      timestamps: true,
    }
  );

  return User;
};
