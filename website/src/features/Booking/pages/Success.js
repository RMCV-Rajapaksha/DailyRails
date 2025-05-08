import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';

function Success() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      // Check for booking reference from URL params or query params
      const bookingRef = id || searchParams.get('ref');
      
      if (!bookingRef) {
        setError("No booking reference found. Please contact customer support.");
        setLoading(false);
        return;
      }
      
      try {
        // Call the backend to process the successful payment
        const response = await fetch(`http://localhost:4000/api/bookings/payment/success?ref=${bookingRef}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setBooking(data.data);
        } else {
          setError(data.message || "An error occurred while processing your booking.");
        }
      } catch (error) {
        setError("Failed to connect to the server. Please try again or contact customer support.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [id, searchParams]);
  
  return (
    <div className="max-w-3xl p-5 mx-auto">
      <div className="p-8 mb-5 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="mb-5 text-center">
          <div className="mb-5 text-6xl text-green-600">✓</div>
          <h1 className="mb-2 text-2xl font-bold text-green-600">Payment Successful!</h1>
          <p className="text-gray-600">Your payment has been processed successfully.</p>
        </div>
        
        {loading && (
          <div className="my-5 text-center">
            <div className="inline-block w-8 h-8 mb-5 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-gray-600">Processing your booking...</p>
          </div>
        )}
        
        {booking && !loading && (
          <div>
            <h2 className="text-xl font-bold text-gray-800">Booking Confirmation</h2>
            <div className="p-5 mt-4 border-l-4 border-blue-500 bg-blue-50">
              <div className="flex mb-2">
                <span className="w-1/3 font-bold text-gray-500">Booking ID:</span>
                <span className="w-2/3 text-gray-800">{booking.BookingID}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-1/3 font-bold text-gray-500">Train:</span>
                <span className="w-2/3 text-gray-800">{booking.train.Name}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-1/3 font-bold text-gray-500">Date:</span>
                <span className="w-2/3 text-gray-800">{new Date(booking.Date).toLocaleDateString()}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-1/3 font-bold text-gray-500">Time:</span>
                <span className="w-2/3 text-gray-800">{booking.Time}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-1/3 font-bold text-gray-500">Class:</span>
                <span className="w-2/3 text-gray-800">{booking.Class}</span>
              </div>
              <div className="flex mb-2">
                <span className="w-1/3 font-bold text-gray-500">Seats:</span>
                <span className="w-2/3 text-gray-800">
                  {booking.bookingSeats.map(seat => seat.SeatNumber).join(', ')}
                </span>
              </div>
              <div className="flex mb-2">
                <span className="w-1/3 font-bold text-gray-500">Amount:</span>
                <span className="w-2/3 text-gray-800">${booking.payment.Amount}</span>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-600">A confirmation email has been sent to your email address.</p>
          </div>
        )}
        
        {error && !loading && (
          <div className="p-4 my-5 text-red-700 border-l-4 border-red-500 bg-red-50">
            {error}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/" className="inline-block px-5 py-3 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;