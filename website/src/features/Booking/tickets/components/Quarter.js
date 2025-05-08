import Seat from "./Seat";

const Quarter = ({
  models,
  color,
  startNumber,
  rotation,
  reservedSeats,
  onBook,
  ...props
}) => (
  <group {...props} rotation={rotation}>
    <Seat
      models={models}
      color={color}
      number={startNumber}
      position={[-0.35, 0, 0.7]}
      reservedSeats={reservedSeats}
      onBook={onBook}
    />
    <Seat
      models={models}
      color={color}
      number={startNumber + 1}
      position={[0.35, 0, 0.7]}
      reservedSeats={reservedSeats}
      onBook={onBook}
    />
    <Seat
      models={models}
      color={color}
      number={startNumber + 2}
      position={[-0.35, 0, -0.7]}
      rotation={[0, Math.PI, 0]}
      reservedSeats={reservedSeats}
      onBook={onBook}
    />
    <Seat
      models={models}
      color={color}
      number={startNumber + 3}
      position={[0.35, 0, -0.7]}
      rotation={[0, Math.PI, 0]}
      reservedSeats={reservedSeats}
      onBook={onBook}
    />
  </group>
);

export default Quarter;
