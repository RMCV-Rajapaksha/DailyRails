const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../../../models");

const createPaymentIntent = async (req, res) => {
  const { amount, trainDetails, seats, bookingId } = req.body;
  // Note: Now we're also expecting a bookingId in the request

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Stripe secret key is missing",
      });
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(amount * 100);

    const lineItems = seats.map((seat) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `Train Booking - ${trainDetails.trainName}`,
          description: `Seat: ${seat}, Class: ${trainDetails.class}, Date: ${trainDetails.date}`,
        },
        unit_amount: amountInCents,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${process.env.CLIENT_URL}/booking/cancel?booking_id=${bookingId}`,
      metadata: {
        booking_id: bookingId,
      },
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
      message: "Payment session created successfully",
    });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment session",
      error: error.message,
    });
  }
};

// Add a new function to handle webhook events from Stripe
const handleWebhookEvent = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle specific event types
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await handleSuccessfulPayment(session);
  }

  // Return success response to Stripe
  res.status(200).json({ received: true });
};

// Helper function to handle successful payments
const handleSuccessfulPayment = async (session) => {
  try {
    const bookingId = session.metadata.booking_id;

    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      // Update the payment status
      await db.Payment.update(
        { Status: "Completed" },
        {
          where: { BookingID: bookingId },
          transaction,
        }
      );

      // Optionally: Update the booking status if you have a status field
      // await db.Booking.update(
      //   { Status: "Confirmed" },
      //   { where: { BookingID: bookingId }, transaction }
      // );

      await transaction.commit();
      console.log(`Payment for booking ${bookingId} marked as completed`);
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating payment status:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error handling successful payment:", error);
    throw error;
  }
};

module.exports = {
  createPaymentIntent,
  handleWebhookEvent,
};
