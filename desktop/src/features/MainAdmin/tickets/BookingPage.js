import BookingForm from "../tickets/BookingForm/BookingForm";
import { BookingProvider } from "../tickets/Context/BookingContext";


const BookingPage = () => {
  return (
    <BookingProvider>
      <div className="h-screen mx-auto ">
        <h1 className="text-2xl font-bold">Train Booking</h1>
        <BookingForm />
      </div>
    </BookingProvider>
  );
};

export default BookingPage;