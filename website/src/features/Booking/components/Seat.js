import { useState } from "react";
import { Text } from "@react-three/drei";

const Seat = ({
  models,
  color,
  number,
  rotation,
  reservedSeats,
  onBook,
  ...props
}) => {
  const [isBooked, setIsBooked] = useState(false);

  const handleClick = () => {
    if (!reservedSeats.includes(number) && !isBooked) {
      setIsBooked(true);
      onBook(number);
    }
  };

  return (
    <group {...props} rotation={rotation}>
      <models.Seat color={isBooked ? "red" : color} />
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
