const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PassengerAnnouncement = sequelize.define(
    "Stations",
    {
      Station_ID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      Contact_No: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },

      Address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "STATIONS",
      timestamps: true,
    }
  );

  return PassengerAnnouncement;
};
