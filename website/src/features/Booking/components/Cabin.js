import { Text } from "@react-three/drei";
import Row from "./Row";

const Cabin = ({
  models,
  color = "white",
  seatColor = "white",
  name,
  seatNumber,
  reservedSeats,
  onBook,
  rotation,
  ...props
}) => {
  return (
    <group {...props} rotation={rotation}>
      <Text
        fontSize={4}
        color="#101020"
        position={[0, 6, 4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {name}
      </Text>
      <models.Cabin color={color} />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber}
        position={[0, 0, 0]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber + 8}
        position={[0, 0, -1.9]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber + 16}
        position={[0, 0, -6.6]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber + 24}
        position={[0, 0, -8.5]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber + 32}
        position={[0, 0, -11]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber + 40}
        position={[0, 0, -12.9]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber + 48}
        position={[0, 0, -17.6]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
      <Row
        models={models}
        color={seatColor}
        startNumber={seatNumber + 56}
        position={[0, 0, -19.5]}
        reservedSeats={reservedSeats}
        onBook={onBook}
      />
    </group>
  );
};

export default Cabin;
