import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function Workpiece({
  cutLength = 0,
  currentRadius = 0.22,
  initialRadius = 0.22,
  stockLength = 1.6
}) {
  const workpieceGroupRef = useRef();
  const spindleRunning = useSimulationStore((state) => state.spindleRunning);
  const spindleSpeed = useSimulationStore((state) => state.spindleSpeed);
  const spindleDirection = useSimulationStore((state) => state.spindleDirection);
  const workpieceParams = useSimulationStore((state) => state.workpiece);

  useFrame((_, delta) => {
    if (spindleRunning && workpieceGroupRef.current) {
      const dirFactor = spindleDirection === 'CCW' ? -1 : 1;
      const radPerSec = (spindleSpeed / 60) * 2 * Math.PI;
      const visualSpeed = Math.min(radPerSec, 25);
      workpieceGroupRef.current.rotation.x += delta * visualSpeed * dirFactor;
    }
  });

  // Material color styles
  const materialType = workpieceParams.material || 'Mild Steel (IS 2062)';
  let matColor = '#64748b'; // Mild steel
  let roughness = 0.35;
  let metalness = 0.65;

  if (materialType.includes('Aluminium')) {
    matColor = '#cbd5e1';
    roughness = 0.2;
    metalness = 0.85;
  } else if (materialType.includes('Brass')) {
    matColor = '#d97706';
    roughness = 0.25;
    metalness = 0.75;
  } else if (materialType.includes('Cast Iron')) {
    matColor = '#334155';
    roughness = 0.8;
    metalness = 0.3;
  }

  // Workpiece coordinates:
  // Starts at chuck face: X = -0.82
  // Extends to X = -0.82 + stockLength (approx X = +0.78)
  const chuckStartX = -0.82;
  const rawLength = Math.max(0.01, stockLength - cutLength);
  const turnedLength = Math.max(0, cutLength);

  return (
    <group position={[0, 0.23, 0]}>
      <group ref={workpieceGroupRef}>
        {/* 1. Unturned Raw Stock Section */}
        <mesh
          position={[chuckStartX + cutLength + rawLength / 2, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[initialRadius, initialRadius, rawLength, 32]} />
          <meshStandardMaterial
            color={matColor}
            metalness={metalness}
            roughness={roughness}
          />
        </mesh>

        {/* 2. Turned / Machined Section (Machined Diameter) */}
        {turnedLength > 0 && (
          <mesh
            position={[chuckStartX + turnedLength / 2, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[currentRadius, currentRadius, turnedLength, 32]} />
            <meshStandardMaterial
              color="#e2e8f0" // freshly machined shiny surface
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        )}

        {/* Center Drilling Bore Hole at Free End */}
        <mesh
          position={[chuckStartX + stockLength + 0.005, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  );
}
