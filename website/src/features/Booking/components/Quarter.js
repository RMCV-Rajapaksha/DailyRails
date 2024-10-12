import Seat from "./Seat";

const Quarter = ({ models, color, startNumber, rotation, ...props }) => (
  <group {...props} rotation={rotation}>
    <Seat
      models={models}
      color={color}
      number={startNumber}
      position={[-0.35, 0, 0.7]}
    />
    <Seat
      models={models}
      color={color}
      number={startNumber + 1}
      position={[0.35, 0, 0.7]}
    />
    <Seat
      models={models}
      color={color}
      number={startNumber + 2}
      position={[-0.35, 0, -0.7]}
      rotation={[0, Math.PI, 0]}
    />
    <Seat
      models={models}
      color={color}
      number={startNumber + 3}
      position={[0.35, 0, -0.7]}
      rotation={[0, Math.PI, 0]}
    />
  </group>
);

export default Quarter;
