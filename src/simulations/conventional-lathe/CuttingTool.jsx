import React from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function CuttingTool({ toolX = 0, toolZ = 0 }) {
  const selectedTool = useSimulationStore((state) => state.selectedTool);

  // Position tool tip directly on top of tool post
  // Tool shank: square bar mounted in tool post holder
  // Tool insert: triangular or rhombic carbide tip
  return (
    <group position={[toolZ, 0.23, toolX]}>
      {/* Tool Steel Shank */}
      <mesh position={[0, 0, 0.16]} castShadow>
        <boxGeometry args={[0.06, 0.06, 0.24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Indexable Carbide Tip (Gold TiN Coated Rhombus) */}
      <mesh position={[0, 0.015, 0.02]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[0.04, 0.025, 0.04]} />
        <meshStandardMaterial
          color="#f59e0b" // TiN Gold
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Tool Clamp Torx Screw */}
      <mesh position={[0, 0.035, 0.06]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>
    </group>
  );
}
