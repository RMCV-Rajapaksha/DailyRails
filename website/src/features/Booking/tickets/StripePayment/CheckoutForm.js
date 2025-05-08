import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import BookingContext from "../Context/BookingContext";

const stripePromise = loadStripe("your-publishable-key-here");

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingDetails } = React.useContext(BookingContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.createPayment({
      amount: totalAmount * 100, // Stripe expects the amount in cents
      currency: "usd",
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: bookingDetails.passengerNic,
        },
      },
      confirm: true,
    });

    if (error) {
      console.error("Payment error:", error);
    } else {
      console.log("Payment successful:", paymentIntent);
      // Submit booking details to backend
      await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${totalAmount}
      </button>
    </form>
  );
};

const StripePayment = ({ totalAmount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} />
  </Elements>
);

export default StripePayment;
