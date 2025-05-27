const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
// Fix this import - it should import the function, not require the whole module
const { newBooking } = require("./BookingController"); // Changed from ../controller/BookingController

// Store pending bookings with their payment details
const pendingBookings = new Map();

const createPaymentIntent = async (req, res) => {
  try {
    console.log("Received payment intent request:", req.body);

    // Validate Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set");
      return res.status(500).json({
        success: false,
        message: "Payment service configuration error",
      });
    }

    // Generate a unique identifier for this booking attempt
    const bookingRef = uuidv4();

    // Store the booking data temporarily
    pendingBookings.set(bookingRef, {
      bookingData: req.body,
      timestamp: Date.now(),
    });

    console.log("Stored booking with ref:", bookingRef);

    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    // Validate frontend URL
    const frontendUrl = "https://dailyrails.altero.dev"; // Ensure this is the correct URL for your frontend

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Train Ticket Booking",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${frontendUrl}/payment/success?ref=${bookingRef}`,
      cancel_url: `${frontendUrl}/payment/cancel`,
    });

    console.log("Created Stripe session:", session.id);

    // Send the session URL to the client
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment session",
      error: error.message,
    });
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    const { ref } = req.query;

    console.log("Processing payment success for ref:", ref);
    console.log(
      "Available pending bookings:",
      Array.from(pendingBookings.keys())
    );

    if (!ref) {
      return res.status(400).json({
        success: false,
        message: "Booking reference is required",
      });
    }

    if (!pendingBookings.has(ref)) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired booking reference",
      });
    }

    // Get the stored booking data
    const { bookingData } = pendingBookings.get(ref);

    // Delete the reference to prevent reuse
    pendingBookings.delete(ref);

    console.log("Original booking data:", bookingData);

    // Use consistent field naming - no mapping needed now
    const processedBookingData = {
      ...bookingData,
      totalAmount: bookingData.amount,
      price: bookingData.amount / (bookingData.seatNumbers?.length || 1),
      paymentCompleted: true,
    };

    console.log("Processed booking data:", processedBookingData);

    // Validate required fields
    const requiredFields = [
      "trainId",
      "journeyId",
      "passengerNic",
      "classType",
      "email",
    ];
    for (const field of requiredFields) {
      if (!processedBookingData[field]) {
        console.error(`Missing required field: ${field}`);
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Forward the request to the booking controller
    req.body = processedBookingData;

    // Call the newBooking function
    return await newBooking(req, res);
  } catch (error) {
    console.error("Error processing successful payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process successful payment",
      error: error.message,
    });
  }
};

// Clean up expired pending bookings (run every 30 minutes)
const cleanupExpiredBookings = () => {
  const now = Date.now();
  const EXPIRY_TIME = 30 * 60 * 1000;

  for (const [ref, data] of pendingBookings.entries()) {
    if (now - data.timestamp > EXPIRY_TIME) {
      pendingBookings.delete(ref);
      console.log(`Cleaned up expired booking reference: ${ref}`);
    }
  }
};

// Run cleanup every 30 minutes
setInterval(cleanupExpiredBookings, 30 * 60 * 1000);

module.exports = {
  createPaymentIntent,
  handlePaymentSuccess,
  pendingBookings,
};
