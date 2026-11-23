import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function CNCMachine({ turretPos = { x: 50, z: 10 } }) {
  const spindleRunning = useSimulationStore((state) => state.spindleRunning);
  const chuckRef = useRef();

  useFrame((_, delta) => {
    if (spindleRunning && chuckRef.current) {
      chuckRef.current.rotation.x += delta * 15;
    }
  });

  // Scale coordinates: X (diameter mm) to 3D units, Z (length mm) to 3D units
  // Lathe center: Z = 0 at chuck face, Z- moves into the chuck (negative X in 3D), X diameter mapped to Y/Z
  const zScale = 0.025;
  const xScale = 0.015;

  const tool3DX = turretPos.z * zScale;
  const tool3DY = 0.2 + (turretPos.x / 2) * xScale;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. CNC Machine Slant Bed Enclosure Frame */}
      <group position={[0, -0.4, -0.2]}>
        {/* Slant Base (45° inclined casting) */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.6, 1.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.4} />
        </mesh>

        {/* Back Enclosure Sheet Metal */}
        <mesh position={[0, 0.8, -0.75]} receiveShadow>
          <boxGeometry args={[3.8, 1.2, 0.1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Yellow Safety Guard Accent */}
        <mesh position={[0, 1.35, -0.7]}>
          <boxGeometry args={[3.8, 0.06, 0.04]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>
      </group>

      {/* 2. Spindle & Hydraulic Power Chuck (Left at Z = -1.2) */}
      <group position={[-1.2, 0.2, 0]}>
        {/* Spindle Housing */}
        <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.5, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Rotating 3-Jaw Power Chuck */}
        <group ref={chuckRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.16, 32]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Chuck Hardened Jaws */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((ang, i) => (
            <mesh key={i} position={[0.1, 0.18 * Math.cos(ang), 0.18 * Math.sin(ang)]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 3. Cylindrical Workpiece Stock */}
      <mesh position={[-0.55, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 1.1, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* 4. 8-Station Disc Turret with Tool Pockets */}
      <group position={[tool3DX, tool3DY, 0.4]}>
        {/* Octagonal Turret Disk */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.14, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Active Tool Shank & Gold Carbide Insert */}
        <mesh position={[0, -0.22, -0.1]} castShadow>
          <boxGeometry args={[0.06, 0.18, 0.06]} />
          <meshStandardMaterial color="#0284c7" metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.32, -0.1]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.04, 0.03, 0.04]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
}
