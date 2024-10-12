import Quarter from "./Quarter";

const Row = ({ models, color, startNumber, rotation, ...props }) => (
  <group {...props} rotation={rotation}>
    <Quarter
      models={models}
      color={color}
      startNumber={startNumber}
      position={[-1.2, -0.45, 9.75]}
    />
    <Quarter
      models={models}
      color={color}
      startNumber={startNumber + 4}
      position={[1.2, -0.45, 9.75]}
    />
  </group>
);

export default Row;
