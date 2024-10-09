const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { amount, trainDetails, seats } = req.body;

  try {
    const lineItems = seats.map((seat) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `Train Booking - ${trainDetails.trainName}`,
          description: `Seat: ${seat}, Class: ${trainDetails.class}, Date: ${trainDetails.date}`, // Seat-specific info
        },
        unit_amount: amount,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({
      url: session.url,
      message: "Train booking payment session created successfully",
    });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.export = {
  createPaymentIntent,
};

// {
//     "amount": 2000,
//     "trainDetails": {
//       "trainName": "Express Train 101",
//       "class": "First Class",
//       "date": "2024-10-10"
//     },
//     "seats": ["A1", "A2", "A3"]
//   }
