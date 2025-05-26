import Quarter from "./Quarter";

const Row = ({
  models,
  color,
  startNumber,
  rotation,
  reservedSeats,
  selectedSeats, // Add this prop
  onBook,
  ...props
}) => (
  <group {...props} rotation={rotation}>
    <Quarter
      models={models}
      color={color}
      startNumber={startNumber}
      position={[-1.2, -0.45, 9.75]}
      reservedSeats={reservedSeats}
      selectedSeats={selectedSeats} // Add this line
      onBook={onBook}
    />
    <Quarter
      models={models}
      color={color}
      startNumber={startNumber + 4}
      position={[1.2, -0.45, 9.75]}
      reservedSeats={reservedSeats}
      selectedSeats={selectedSeats} // Add this line
      onBook={onBook}
    />
  </group>
);

export default Row;
