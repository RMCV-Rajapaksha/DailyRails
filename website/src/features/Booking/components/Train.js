import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useScroll, Merged } from "@react-three/drei";
import Cabin from "./Cabin";

function Train({ currentCabin }) {
  const ref = useRef();
  const scroll = useScroll();
  const [cabin, seat] = useGLTF([
    "/cabin-transformed.glb",
    "/seat-transformed.glb",
  ]);
  const meshes = useMemo(
    () => ({ Cabin: cabin.nodes.cabin_1, Seat: seat.nodes.seat }),
    [cabin, seat]
  );

  // Move the train based on current cabin index
  useFrame(() => {
    ref.current.position.z = currentCabin * -26;
  });

  let seatNumber = 1; // Initialize seat number globally

  return (
    <Merged castShadow receiveShadow meshes={meshes}>
      {(models) => (
        <group ref={ref}>
          <Cabin
            models={models}
            color="#252525"
            seatColor="sandybrown"
            name="1A"
            seatNumber={seatNumber}
            position={[0, 0, 0]}
          />
          <Cabin
            models={models}
            color="#454545"
            seatColor="gray"
            name="2B"
            seatNumber={(seatNumber += 64)}
            position={[0, 0, 26]}
          />
          <Cabin
            models={models}
            color="#252525"
            seatColor="lightskyblue"
            name="3A"
            seatNumber={(seatNumber += 64)}
            position={[0, 0, 52]}
          />
          <Cabin
            models={models}
            color="#454545"
            seatColor="gray"
            name="4B"
            seatNumber={(seatNumber += 64)}
            position={[0, 0, 78]}
          />
          <Cabin
            models={models}
            color="#252525"
            seatColor="sandybrown"
            name="5B"
            seatNumber={(seatNumber += 64)}
            position={[0, 0, 104]}
          />
        </group>
      )}
    </Merged>
  );
}

export default Train;
