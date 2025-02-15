const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookingSeats = sequelize.define(
    "BookingSeats",
    {
      TicketID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      BookingID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "BOOKING",
          key: "BookingID",
        },
      },
      SeatNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "BOOKING_SEATS",
      timestamps: true,
    }
  );

  BookingSeats.associate = (models) => {
    if (!models.Booking) {
      console.error("Booking model is not loaded properly");
      return;
    }

    BookingSeats.belongsTo(models.Booking, {
      foreignKey: "BookingID",
      as: "booking",
    });
  };

  return BookingSeats;
};
