const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { amount, trainDetails } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Train Booking - ${trainDetails.trainName}`, // Example: Train name and other details
              description: `Seat: ${trainDetails.seat}, Class: ${trainDetails.class}, Date: ${trainDetails.date}`, // Additional booking info
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
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

module.exports = { createPaymentIntent };

// {
//     "amount": 2000,
//     "trainDetails": {
//       "trainName": "Express Train 101",
//       "seat": "A1",
//       "class": "First Class",
//       "date": "2024-10-10"
//     }
//   }
