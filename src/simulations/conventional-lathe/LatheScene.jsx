import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import LatheMachine from './LatheMachine';
import Chuck from './Chuck';
import Workpiece from './Workpiece';
import CuttingTool from './CuttingTool';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function LatheScene({
  toolZ = 0.5,
  toolX = 0.23,
  cutLength = 0,
  currentRadius = 0.22,
  isCutting = false
}) {
  const selectedChuck = useSimulationStore((state) => state.selectedChuck);
  const sparksRef = useRef();

  // Chips effect
  useFrame(({ clock }) => {
    if (isCutting && sparksRef.current) {
      sparksRef.current.position.y = 0.23 + Math.sin(clock.getElapsedTime() * 30) * 0.03;
      sparksRef.current.position.z = toolX + (Math.random() - 0.5) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Procedural 3D Lathe Body (Bed, Headstock, Carriage, Tailstock, etc.) */}
      <LatheMachine carriageZ={toolZ} crossSlideX={toolX} />

      {/* 2. Chuck Mounted on Spindle Nose */}
      <Chuck chuckType={selectedChuck} />

      {/* 3. Workpiece Clamped in Chuck */}
      <Workpiece
        cutLength={cutLength}
        currentRadius={currentRadius}
        initialRadius={0.22}
        stockLength={1.45}
      />

      {/* 4. Single-point Cutting Tool Mounted in Tool Post */}
      <CuttingTool toolZ={toolZ} toolX={toolX} />

      {/* 5. Cutting Chips / Sparkles Effect */}
      {isCutting && (
        <group ref={sparksRef} position={[toolZ, 0.23, toolX]}>
          <mesh>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <pointLight color="#f59e0b" intensity={1.5} distance={0.5} />
        </group>
      )}
    </group>
  );
}
