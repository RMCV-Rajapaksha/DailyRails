import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe public key from environment
const stripePromise = loadStripe(import.meta.env.STRIPE_SECRET_KEY);

const StripePayment = ({ amount, trainDetails, seats, bookingId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const createSessionAndRedirect = async () => {
      try {
        const response = await fetch("/api/payment/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            trainDetails,
            seats,
            bookingId,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          console.error("Failed to create payment session:", data.message);
          return;
        }

        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          console.error("Stripe redirection error:", result.error.message);
        }
      } catch (error) {
        console.error("Error initiating Stripe payment:", error);
      }
    };

    if (amount && trainDetails && seats?.length && bookingId) {
      createSessionAndRedirect();
    } else {
      console.warn("Missing payment data.");
      navigate("/booking/error");
    }
  }, [amount, trainDetails, seats, bookingId, navigate]);

  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-lg font-medium text-gray-700">Redirecting to payment...</p>
    </div>
  );
};

export default StripePayment;
