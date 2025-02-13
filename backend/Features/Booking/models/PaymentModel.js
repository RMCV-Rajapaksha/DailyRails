const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Payment = sequelize.define(
    "Payment",
    {
      PaymentID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      BookingID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "BOOKING", // References the BOOKING table
          key: "BookingID",
        },
      },
      Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "PAYMENT",
      timestamps: true,
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Booking, {
      foreignKey: "BookingID",
      onDelete: "CASCADE",
    });
  };

  return Payment;
};
