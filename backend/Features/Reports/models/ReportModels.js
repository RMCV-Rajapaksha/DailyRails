const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Report = sequelize.define(
    "Report",
    {
      ReportID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      NIC: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      ClosestStation: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "REPORT",
      timestamps: true,
    }
  );

  return Report;
};
