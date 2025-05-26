import { useState, useEffect } from "react";
import { Text } from "@react-three/drei";

const Seat = ({
  models,
  color,
  number,
  rotation,
  reservedSeats,
  selectedSeats,
  onBook,
  ...props
}) => {
  const [isBooked, setIsBooked] = useState(false);

  // Sync local state with selectedSeats prop
  useEffect(() => {
    setIsBooked(selectedSeats && selectedSeats.includes(number));
  }, [selectedSeats, number]);

  const handleClick = () => {
    if (!reservedSeats.includes(number)) {
      onBook(number);
      // Remove local state management since it's handled by parent
    }
  };

  // Determine seat color based on state
  const getSeatColor = () => {
    if (reservedSeats.includes(number)) {
      return "red"; // Reserved seats are red
    }
    if (selectedSeats && selectedSeats.includes(number)) {
      return "green"; // Selected seats are green
    }
    return color; // Default color for available seats
  };

  return (
    <group {...props} rotation={rotation}>
      <models.Seat color={getSeatColor()} />
      <Text
        fontSize={0.2}
        color="#000"
        position={[0, 0.3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
      >
        {number}
      </Text>
    </group>
  );
};

export default Seat;
