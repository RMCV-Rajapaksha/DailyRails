const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      UserID: {
        type: DataTypes.STRING(20),
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
    },
    {
      tableName: "USER",
      timestamps: true,
    }
  );

  return User;
};
