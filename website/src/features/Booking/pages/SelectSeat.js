import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ScrollControls,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import Train from "../components/Train";
import "./styles.css"; // Import CSS file for full-screen styling

export default function SeatBooking() {
  const [currentCabin, setCurrentCabin] = useState(0);

  const handleNextCabin = () => {
    setCurrentCabin((prev) => (prev < 4 ? prev + 1 : 4)); // Move forward
  };

  const handlePreviousCabin = () => {
    setCurrentCabin((prev) => (prev > 0 ? prev - 1 : 0)); // Move backward
  };

  return (
    <>
      <Canvas
        className="full-screen-canvas" // Apply full-screen class to Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [-15, 15, 18], fov: 35 }}
        gl={{ alpha: false }}
      >
        <fog attach="fog" args={["#17171b", 30, 40]} />
        <color attach="background" args={["#000000"]} />{" "}
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={2}
          position={[10, 6, 6]}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach="shadow-camera"
            left={-20}
            right={20}
            top={20}
            bottom={-20}
          />
        </directionalLight>
        <Suspense fallback={null}>
          <ScrollControls pages={5}>
            <Train currentCabin={currentCabin} />
          </ScrollControls>
          <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={15}
              depthScale={1}
              minDepthThreshold={0.85}
              color="#151515"
              metalness={0.6}
              roughness={1}
            />
          </mesh>
          <Environment preset="dawn" />
        </Suspense>
        <OrbitControls />
      </Canvas>

      <div className="controls">
        <button onClick={handlePreviousCabin}> Previous Cabin </button>
        <button onClick={handleNextCabin}>Next Cabin</button>
      </div>
    </>
  );
}
