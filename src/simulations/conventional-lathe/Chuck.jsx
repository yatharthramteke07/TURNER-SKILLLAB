import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function Chuck({ chuckType = '3-jaw' }) {
  const chuckGroupRef = useRef();
  const spindleRunning = useSimulationStore((state) => state.spindleRunning);
  const spindleSpeed = useSimulationStore((state) => state.spindleSpeed);
  const spindleDirection = useSimulationStore((state) => state.spindleDirection);
  const highlightedComponent = useSimulationStore((state) => state.highlightedComponent);
  const setHighlightedComponent = useSimulationStore((state) => state.setHighlightedComponent);

  useFrame((_, delta) => {
    if (spindleRunning && chuckGroupRef.current) {
      const dirFactor = spindleDirection === 'CCW' ? -1 : 1;
      const radPerSec = (spindleSpeed / 60) * 2 * Math.PI;
      // Scale visual speed slightly for comfortable viewing at high RPM
      const visualSpeed = Math.min(radPerSec, 25);
      chuckGroupRef.current.rotation.x += delta * visualSpeed * dirFactor;
    }
  });

  const is3Jaw = chuckType === '3-jaw';
  const jawAngles = is3Jaw ? [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] : [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

  const isHighlighted = highlightedComponent === 'Chuck' || highlightedComponent === 'Spindle';

  return (
    <group
      position={[-0.92, 0.23, 0]}
      name="Chuck"
      onPointerOver={(e) => {
        e.stopPropagation();
        setHighlightedComponent('Chuck');
      }}
      onPointerOut={() => setHighlightedComponent(null)}
    >
      <group ref={chuckGroupRef}>
        {/* Chuck Cylindrical Body */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.18, 36]} />
          <meshStandardMaterial
            color={isHighlighted ? '#60a5fa' : '#475569'}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Chuck Face Plate Recess */}
        <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.02, 36]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Chuck Jaws (Stepped Jaws) */}
        {jawAngles.map((angle, idx) => (
          <group key={idx} rotation={[angle, 0, 0]}>
            <mesh position={[0.13, 0.2, 0]} castShadow>
              <boxGeometry args={[0.08, 0.12, 0.08]} />
              <meshStandardMaterial
                color={isHighlighted ? '#93c5fd' : '#cbd5e1'}
                metalness={0.85}
                roughness={0.2}
              />
            </mesh>
            {/* Step 2 */}
            <mesh position={[0.11, 0.12, 0]} castShadow>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Chuck Key Socket Holes */}
        <mesh position={[0.04, 0.32, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.05]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  );
}
