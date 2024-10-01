const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Announcement = sequelize.define(
    "Announcement",
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
    },
    {
      tableName: "ANNOUNCEMENTS",
      timestamps: true,
    }
  );

  return Announcement;
};
