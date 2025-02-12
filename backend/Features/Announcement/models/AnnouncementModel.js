const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Announcement = sequelize.define(
    "Announcement",
    {
      AnnouncementID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      AnnouncementTo: {
        type: DataTypes.STRING(20),
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
    },
    {
      tableName: "ANNOUNCEMENTS",
      timestamps: true,
    }
  );

  return Announcement;
};
