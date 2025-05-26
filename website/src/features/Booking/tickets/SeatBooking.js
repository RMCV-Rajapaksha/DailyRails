import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ScrollControls,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import Train from "./components/Train";

export default function SeatBooking({
  allowedSeats,
  selectedSeats,
  setSelectedSeats,
}) {
  const [currentCabin, setCurrentCabin] = useState(0);

  // Reserved seats - you can fetch this from your API based on train, date, and class
  const reservedSeats = [1, 2, 3, 4, 5, 6, 7, 8, 38, 42, 45, 51, 67, 73]; // Example reserved seats

  const handleNextCabin = () => {
    setCurrentCabin((prev) => (prev < 4 ? prev + 1 : 4));
  };

  const handlePreviousCabin = () => {
    setCurrentCabin((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleBook = (seatNumber) => {
    // Don't allow booking of reserved seats
    if (reservedSeats.includes(seatNumber)) {
      alert("This seat is already reserved!");
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
      return;
    }

    if (selectedSeats.length >= allowedSeats) {
      alert(`You can only select ${allowedSeats} seats.`);
      return;
    }

    // Select seat
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

      {/* Cabin Navigation */}
      <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-5 left-1/2">
        <button
          className="px-4 py-2 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-900 rounded hover:bg-gray-600 active:bg-gray-900 focus:outline-none"
          onClick={handlePreviousCabin}
          disabled={currentCabin === 0}
        >
          Previous Cabin
        </button>
        <span className="px-4 py-2 text-white bg-blue-600 rounded">
          Cabin {currentCabin + 1} / 5
        </span>
        <button
          className="px-4 py-2 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-900 rounded hover:bg-gray-600 active:bg-gray-900 focus:outline-none"
          onClick={handleNextCabin}
          disabled={currentCabin === 4}
        >
          Next Cabin
        </button>
      </div>

      {/* Selected Seats Info */}
      <div className="absolute p-4 bg-white rounded-lg shadow-lg top-5 right-5 min-w-[200px]">
        <h2 className="mb-3 text-lg font-bold text-gray-800">Selected Seats</h2>
        {selectedSeats.length > 0 ? (
          <ul className="space-y-1">
            {selectedSeats.map((seat) => (
              <li
                key={seat}
                className="flex justify-between items-center text-gray-700 bg-green-50 px-2 py-1 rounded"
              >
                <span>Seat {seat}</span>
                <button
                  onClick={() => handleBook(seat)}
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Remove seat"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No seats selected</p>
        )}

        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {selectedSeats.length} / {allowedSeats} seats selected
          </p>
        </div>
      </div>

      {/* Color Legend */}
      <div className="absolute p-4 bg-white rounded-lg shadow-lg top-5 left-5">
        <h3 className="mb-3 text-lg font-bold text-gray-800">Seat Legend</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
