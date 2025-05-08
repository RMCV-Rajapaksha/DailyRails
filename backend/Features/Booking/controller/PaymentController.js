const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid"); // Add this dependency
const { createBooking } = require("../controller/BookingController");

// Store pending bookings with their payment details
const pendingBookings = new Map();

const createPaymentIntent = async (req, res) => {
  try {
    // Generate a unique identifier for this booking attempt
    const bookingRef = uuidv4();

    // Store the booking data temporarily
    pendingBookings.set(bookingRef, {
      bookingData: req.body,
      timestamp: Date.now(),
    });

    console.log("Pending bookings:", pendingBookings);

    // Clean up old entries every hour
    setTimeout(() => {
      if (pendingBookings.has(bookingRef)) {
        pendingBookings.delete(bookingRef);
      }
    }, 3600000);

    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Train Ticket Booking",
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/booking/success?ref=${bookingRef}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking/cancel`,
    });

    // Send the session URL to the client
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    const { ref } = req.query;

    if (!ref || !pendingBookings.has(ref)) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired booking reference",
      });
    }

    // Get the stored booking data
    const { bookingData } = pendingBookings.get(ref);

    // Delete the reference to prevent reuse
    pendingBookings.delete(ref);

    // Update the payment status to completed
    bookingData.paymentCompleted = true;

    // Forward the request to the booking controller
    req.body = bookingData;

    // Call the createBooking function (passing control)
    return createBooking(req, res);
  } catch (error) {
    console.error("Error processing successful payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process successful payment",
      error: error.message,
    });
  }
};

module.exports = {
  createPaymentIntent,
  handlePaymentSuccess,
  pendingBookings, // Export for testing purposes
};
