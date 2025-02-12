const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookingSeats = sequelize.define(
    "BookingSeats",
    {
      BookingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "BOOKING",
          key: "BookingID",
        },
        primaryKey: true,
      },
      TicketID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      SeatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "BOOKINGSEATS",
      timestamps: true,
    }
  );

  return BookingSeats;
};
