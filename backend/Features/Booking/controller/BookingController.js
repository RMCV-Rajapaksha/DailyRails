const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models");
const NewBooking = db.newBooking;

const { sendBookingEmail } = require("../../../Services/EmailService");

// Helper function to generate next booking ID
// Helper function to generate next booking ID
const generateNextBookingId = async () => {
  try {
    const lastBooking = await db.Booking.findOne({
      order: [["BookingID", "DESC"]],
    });

    if (!lastBooking) {
      return "BK000001";
    }

    const lastNumber = parseInt(lastBooking.BookingID.replace("BK", ""));
    const nextNumber = (lastNumber + 1).toString().padStart(4, "0");
    return `BK${nextNumber}`;
  } catch (error) {
    console.error("Error generating booking ID:", error);
    throw error;
  }
};

// Create a new booking
const createBooking = async (req, res) => {

 

  try {
    const {
      trainId,
      journeyId,
      passengerNIC,
      classType,
      noOfSeats,
      email,
      date,
      time,
      seatNumbers,
      amount,
    } = req.body;

    console.log(req.body);

    // Step 1: Validate train and journey existence
    const [train, journey, passenger] = await Promise.all([
      db.Train.findByPk(trainId, {
        include: [
          { model: db.Station, as: "startStation" },
          { model: db.Station, as: "endStation" },
        ],
      }),
      db.Journey.findByPk(journeyId, {
        include: [
          { model: db.Station, as: "startStation" },
          { model: db.Station, as: "endStation" },
        ],
      }),
      db.Passenger.findByPk(passengerNIC, {
        include: [{ model: db.Booking, as: "bookings" }],
      }),
    ]);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found with the provided ID",
      });
    }

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: "Journey not found with the provided ID",
      });
    }
    if (!passenger) {
      return res.status(404).json({
        success: false,
        message: "Passenger not found with the provided ID",
      });
    }

    if (!train || !journey || !passenger) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Train ,Journey or Passenger not found",
      });
    }

    // Step 3: Generate booking ID
    const bookingId = await generateNextBookingId();

    // Step 4: Create main booking
    const booking = await db.Booking.create(
      {
        BookingID: bookingId,
        TrainID: trainId,
        JourneyID: journeyId,
        PassengerNIC: passengerNIC,
        Class: classType,
        NoOfSeats: noOfSeats,
        Date: date,
        Time: time,
      },
      { transaction }
    );

    // Step 5: Create booking seats
    const bookingSeats = await Promise.all(
      seatNumbers.map(async (seatNumber, index) => {
        const ticketId = `TK${bookingId.substring(2)}-${(index + 1)
          .toString()
          .padStart(2, "0")}`;
        return db.BookingSeats.create(
          {
            BookingID: bookingId,
            TicketID: ticketId,
            SeatNumber: seatNumber,
          },
          { transaction }
        );
      })
    );

    // Inside the createBooking function, modify the payment creation part:

    const PAYMENT_STATUS = {
      PENDING: "Pending",
      COMPLETED: "Completed",
      FAILED: "Failed",
      REFUNDED: "Refunded",
    };

    // Step 6: Create payment record with pending status
    const payment = await db.Payment.create(
      {
        PaymentID: `PY${bookingId.substring(2)}`,
        BookingID: bookingId,
        Amount: amount,
        Status: PAYMENT_STATUS.PENDING,
      },
      { transaction }
    );

    // Commit the transaction to save the booking
    await transaction.commit();

    // Return booking ID for payment processing
    res.status(201).json({
      success: true,
      data: {
        bookingId: bookingId,
        amount: amount,
        trainDetails: {
          trainName: train.Name,
          class: classType,
          date,
          time,
        },
        seats: seatNumbers,
      },
      message: "Booking created. Please proceed to payment.",
    });

    // Step 7: Fetch complete booking details
    const completeBooking = await db.Booking.findByPk(bookingId, {
      include: [
        {
          model: db.BookingSeats,
          as: "bookingSeats",
          attributes: ["TicketID", "SeatNumber"],
        },
        {
          model: db.Train,
          as: "train",
          attributes: ["TrainID", "Name", "StartTime", "EndTime"],
          include: [
            { model: db.Station, as: "startStation" },
            { model: db.Station, as: "endStation" },
          ],
        },
        {
          model: db.Journey,
          as: "journey",
          include: [
            { model: db.Station, as: "startStation" },
            { model: db.Station, as: "endStation" },
          ],
        },
        {
          model: db.Payment,
          as: "payment",
          attributes: ["PaymentID", "Amount", "Status"],
        },
      ],
    });

    // Send booking confirmation email
    await sendBookingEmail({
      amount,
      trainDetails: {
        trainName: train.Name,
        class: classType,
        date,
        time, // Include the time field here
      },
      seats: seatNumbers,
      user: {
        Name: passengerNIC,
        Email: email,
      },
    });

    res.status(201).json({
      success: true,
      data: completeBooking,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

const newBooking = async (req, res) => {
  try {
    const {
      trainId,
      journeyId,
      classType,
      noOfSeats,
      seatNumbers,
      price, 
      totalAmount,
      passengerNic,
      contactNumber,
      email,
      startStationId,
      endStationId,
      date,
      time,
      firstName,
      lastName
    } = req.body;

    const booking = await NewBooking.create({
      trainId,
      journeyId,
      classType,
      noOfSeats,
      seatNumbers,
      price,
      totalAmount,
      passengerNic,
      contactNumber,
      email,
      startStationId,
      endStationId,
      date,
      time,
    });

    // Generate a booking reference for the email
    const bookingReference = `BK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Send email notification
    try {
      await sendBookingEmail({
        amount: totalAmount,
        trainDetails: {
          trainName: `Train ${trainId}`,
          class: classType,
          date: date,
          time: time
        },
        seats: Array.isArray(seatNumbers) ? seatNumbers : [seatNumbers],
        user: {
          Name: `${firstName || ''} ${lastName || passengerNic || 'Valued Customer'}`,
          Email: email
        },
        reference: bookingReference
      });
      
      console.log("Booking confirmation email sent successfully");
    } catch (emailError) {
      // Log email error but don't fail the booking
      console.error("Error sending booking confirmation email:", emailError);
    }

    // Return success response with booking data and reference
    res.status(201).json({ 
      success: true, 
      booking, 
      reference: bookingReference,
      emailSent: true 
    });
  } catch (error) {
    console.error("Booking creation failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all bookings with optional filters
const getBookings = async (req, res) => {
  try {
    const { passengerNIC, date, trainId, classType } = req.query;

    const whereClause = {};
    if (passengerNIC) whereClause.PassengerNIC = passengerNIC;
    if (date) whereClause.Date = date;
    if (trainId) whereClause.TrainID = trainId;
    if (classType) whereClause.Class = classType;

    const bookings = await db.Booking.findAll({
      where: whereClause,
      include: [
        {
          model: db.BookingSeats,
          as: "bookingSeats",
          attributes: ["TicketID", "SeatNumber"],
        },
        {
          model: db.Train,
          as: "train",
          attributes: ["TrainID", "Name", "StartTime", "EndTime"],
          include: [
            { model: db.Station, as: "startStation" },
            { model: db.Station, as: "endStation" },
          ],
        },
        {
          model: db.Journey,
          as: "journey",
          include: [
            { model: db.Station, as: "startStation" },
            { model: db.Station, as: "endStation" },
          ],
        },
        {
          model: db.Payment,
          as: "payment",
          attributes: ["PaymentID", "Amount", "Status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await db.Booking.findByPk(id, {
      include: [
        {
          model: db.BookingSeats,
          as: "bookingSeats",
          attributes: ["TicketID", "SeatNumber"],
        },
        {
          model: db.Train,
          as: "train",
          attributes: ["TrainID", "Name", "StartTime", "EndTime"],
          include: [
            { model: db.Station, as: "startStation" },
            { model: db.Station, as: "endStation" },
          ],
        },
        {
          model: db.Journey,
          as: "journey",
          include: [
            { model: db.Station, as: "startStation" },
            { model: db.Station, as: "endStation" },
          ],
        },
        {
          model: db.Payment,
          as: "payment",
          attributes: ["PaymentID", "Amount", "Status"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { noOfSeats, classType, date, time, seatNumbers } = req.body;

    const booking = await db.Booking.findByPk(id);
    if (!booking) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await booking.update(
      {
        NoOfSeats: noOfSeats,
        Class: classType,
        Date: date,
        Time: time,
      },
      { transaction }
    );

    if (seatNumbers && seatNumbers.length > 0) {
      await db.BookingSeats.destroy(
        {
          where: { BookingID: id },
        },
        { transaction }
      );

      await Promise.all(
        seatNumbers.map(async (seatNumber, index) => {
          const ticketId = `TK${id.substring(2)}-${(index + 1)
            .toString()
            .padStart(2, "0")}`;
          return db.BookingSeats.create(
            {
              BookingID: id,
              TicketID: ticketId,
              SeatNumber: seatNumber,
            },
            { transaction }
          );
        })
      );
    }

    await transaction.commit();

    const updatedBooking = await db.Booking.findByPk(id, {
      include: [
        {
          model: db.BookingSeats,
          as: "bookingSeats",
          attributes: ["TicketID", "SeatNumber"],
        },
        {
          model: db.Train,
          as: "train",
          attributes: ["TrainID", "Name", "StartTime", "EndTime"],
          include: [
            { model: db.Station, as: "startStation" },
            { model: db.Station, as: "endStation" },
          ],
        }
      ],
    });

    res.status(200).json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

    const booking = await db.Booking.findByPk(id);
    if (!booking) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Promise.all([
      db.BookingSeats.destroy({ where: { BookingID: id } }, { transaction }),
      db.Payment.destroy({ where: { BookingID: id } }, { transaction }),
      booking.destroy({ transaction }),
    ]);

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};
const findBookedSeats = async (req, res) => {
  try {
    const { startStationName, endStationName } = req.query;

    // Step 1: Find the station IDs using the station names
    const startStation = await db.Station.findOne({
      where: { Name: startStationName },
    });

    const endStation = await db.Station.findOne({
      where: { Name: endStationName },
    });

    if (!startStation || !endStation) {
      return res.status(404).json({
        success: false,
        message: "Start or End station not found",
      });
    }

    const startStationId = startStation.StationID;
    const endStationId = endStation.StationID;

    // Step 2: Find the journey ID using the start and end station IDs
    const journey = await db.Journey.findOne({
      where: {
        StartPoint: startStationId,
        EndPoint: endStationId,
      },
    });

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: "Journey not found",
      });
    }

    const journeyId = journey.JourneyID;

    // Step 3: Find the train ID using the journey ID
    const train = await db.Train.findOne({
      include: [
        {
          model: db.Journey,
          as: "journeys",
          where: { JourneyID: journeyId },
        },
      ],
    });

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    const trainId = train.TrainID;

    // Step 4: Find booked seats and all seats in the train using the train ID
    const bookedSeats = await db.BookingSeats.findAll({
      include: [
        {
          model: db.Booking,
          as: "booking",
          where: { TrainID: trainId },
        },
      ],
    });

    const allSeats = await db.Seat.findAll({
      where: { TrainID: trainId },
    });

    res.status(200).json({
      success: true,
      data: {
        bookedSeats,
        allSeats,
      },
    });
  } catch (error) {
    console.error("Error finding booked seats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to find booked seats",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  newBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  findBookedSeats,
};