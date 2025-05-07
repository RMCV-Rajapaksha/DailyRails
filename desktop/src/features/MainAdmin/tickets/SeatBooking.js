import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ScrollControls,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import Train from "./components/Train";

export default function SeatBooking({ allowedSeats, selectedSeats, setSelectedSeats }) {
  const [currentCabin, setCurrentCabin] = useState(0);
  const reservedSeats = [1, 2, 3, 4, 5, 6, 7, 8, 38]; // Example reserved seats

  const handleNextCabin = () => {
    setCurrentCabin((prev) => (prev < 4 ? prev + 1 : 4));
  };

  const handlePreviousCabin = () => {
    setCurrentCabin((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleBook = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
      return;
    }

    if (selectedSeats.length >= allowedSeats) {
      alert(`You can only select ${allowedSeats} seats.`);
      return;
    }
    setSelectedSeats([...selectedSeats, seatNumber]);
  };


  return (
    <div className="relative w-full h-[75vh] overflow-hidden">
      <Canvas
        className="fixed top-0 left-0 w-screen h-screen z-0"
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [-15, 15, 18], fov: 35 }}
        gl={{ alpha: false }}
      >
        <fog attach="fog" args={["#17171b", 30, 40]} />
        <color attach="background" args={["#000000"]} />
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
            <Train
              currentCabin={currentCabin}
              reservedSeats={reservedSeats}
              selectedSeats={selectedSeats}
              onBook={handleBook}
            />
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

      <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-5 left-1/2">
        <button
          className="px-4 py-2 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-900 rounded hover:bg-gray-600 active:bg-gray-900 focus:outline-none"
          onClick={handlePreviousCabin}
        >
          Previous Cabin
        </button>
        <button
          className="px-4 py-2 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-900 rounded hover:bg-gray-600 active:bg-gray-900 focus:outline-none"
          onClick={handleNextCabin}
        >
          Next Cabin
        </button>
      </div>

      <div className="absolute p-4 bg-white rounded shadow-lg top-5 right-5">
        <h2 className="mb-2 text-xl font-bold">Selected Seats</h2>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat} className="text-gray-700">
              Seat {seat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
