import { Text } from "@react-three/drei";

const Seat = ({ models, color, number, rotation, ...props }) => {
  const handleClick = () => {
    console.log(`Seat number: ${number}`);
  };

  return (
    <group {...props} rotation={rotation}>
      <models.Seat color={color} />
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
