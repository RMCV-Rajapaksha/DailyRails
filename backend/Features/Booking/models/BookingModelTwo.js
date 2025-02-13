const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookingSeats = sequelize.define(
    "BookingSeats",
    {
      BookingID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "BOOKING",
          key: "BookingID",
        },
      },
      TicketID: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      SeatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "BOOKINGSEATS",
      timestamps: true,
      indexes: [
        {
          unique: true,
          primary: true,
          fields: ["BookingID", "TicketID"],
        },
      ],
    }
  );

  BookingSeats.associate = (models) => {
    BookingSeats.belongsTo(models.Booking, {
      foreignKey: "BookingID",
      onDelete: "CASCADE",
    });
  };

  return BookingSeats;
};
