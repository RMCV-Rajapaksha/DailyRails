const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PassengerAnnouncement = sequelize.define(
    "PassengerAnnouncement",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Announcement_To: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING(50),
      },
      Description: {
        type: DataTypes.STRING(1000),
      },
      time: {
        type: DataTypes.DATE, // Changed from TIMESTAMP to DATE
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "PASSENGER_ANNOUNCEMENTS",
      timestamps: false,
    }
  );

  return PassengerAnnouncement;
};
