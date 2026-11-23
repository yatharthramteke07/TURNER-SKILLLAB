import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function LatheMachine({ carriageZ = 0, crossSlideX = 0 }) {
  const highlightedComponent = useSimulationStore((state) => state.highlightedComponent);
  const setHighlightedComponent = useSimulationStore((state) => state.setHighlightedComponent);
  const spindleRunning = useSimulationStore((state) => state.spindleRunning);
  const spindleSpeed = useSimulationStore((state) => state.spindleSpeed);

  const leadScrewRef = useRef();

  useFrame((_, delta) => {
    if (spindleRunning && leadScrewRef.current) {
      leadScrewRef.current.rotation.x += delta * (spindleSpeed / 100);
    }
  });

  const isHighlighted = (name) => highlightedComponent === name;

  // Material helpers
  const castIronColor = '#334155';
  const guidewayColor = '#94a3b8';
  const highlightColor = '#3b82f6';

  return (
    <group position={[0, 0, 0]}>
      {/* 1. LATHE BED & LEGS */}
      <group
        name="Bed"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHighlightedComponent('Bed');
        }}
        onPointerOut={() => setHighlightedComponent(null)}
      >
        {/* Main Bed Body (Inverted box bridging ways) */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.45, 0.9]} />
          <meshStandardMaterial
            color={isHighlighted('Bed') ? highlightColor : castIronColor}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>

        {/* Precision Guideways (V-ways and flat ways) */}
        <mesh position={[0, -0.15, -0.18]} receiveShadow>
          <boxGeometry args={[4.2, 0.05, 0.1]} />
          <meshStandardMaterial
            color={isHighlighted('Bed') ? '#60a5fa' : guidewayColor}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, -0.15, 0.18]} receiveShadow>
          <boxGeometry args={[4.2, 0.05, 0.1]} />
          <meshStandardMaterial
            color={isHighlighted('Bed') ? '#60a5fa' : guidewayColor}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Left Cast Leg */}
        <mesh position={[-1.7, -0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.85]} />
          <meshStandardMaterial color={castIronColor} roughness={0.9} />
        </mesh>
        {/* Right Cast Leg */}
        <mesh position={[1.7, -0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.85]} />
          <meshStandardMaterial color={castIronColor} roughness={0.9} />
        </mesh>

        {/* Chip Pan Tray */}
        <mesh position={[0, -0.63, 0]} receiveShadow>
          <boxGeometry args={[4.0, 0.04, 1.1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.6} />
        </mesh>
      </group>

      {/* 2. HEADSTOCK (Left Housing) */}
      <group
        position={[-1.5, 0.15, 0]}
        name="Headstock"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHighlightedComponent('Headstock');
        }}
        onPointerOut={() => setHighlightedComponent(null)}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.75, 0.95]} />
          <meshStandardMaterial
            color={isHighlighted('Headstock') ? highlightColor : '#1e3a8a'}
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>

        {/* Speed Selection Levers */}
        <mesh position={[0.2, 0.2, 0.5]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        <mesh position={[-0.2, 0.2, 0.5]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* 3. TAILSTOCK (Right Assembly) */}
      <group
        position={[1.5, 0.08, 0]}
        name="Tailstock"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHighlightedComponent('Tailstock');
        }}
        onPointerOut={() => setHighlightedComponent(null)}
      >
        {/* Tailstock Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.5, 0.65]} />
          <meshStandardMaterial
            color={isHighlighted('Tailstock') ? highlightColor : '#1e293b'}
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>

        {/* Quill Barrel */}
        <mesh position={[-0.45, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.35, 24]} />
          <meshStandardMaterial
            color={isHighlighted('Tailstock') ? '#60a5fa' : '#cbd5e1'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Dead/Live Center 60° Cone */}
        <mesh position={[-0.67, 0.08, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.08, 0.15, 24]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Tailstock Handwheel */}
        <mesh position={[0.4, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.16, 0.025, 12, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
      </group>

      {/* 4. CARRIAGE ASSEMBLY (Moves along Z-axis) */}
      <group position={[carriageZ, 0, 0]}>
        {/* Saddle bridging bed */}
        <group
          name="Carriage"
          onPointerOver={(e) => {
            e.stopPropagation();
            setHighlightedComponent('Carriage');
          }}
          onPointerOut={() => setHighlightedComponent(null)}
        >
          <mesh position={[0, -0.06, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.12, 0.85]} />
            <meshStandardMaterial
              color={isHighlighted('Carriage') ? highlightColor : '#334155'}
              roughness={0.5}
            />
          </mesh>

          {/* Apron Front Casting */}
          <mesh position={[0, -0.3, 0.45]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.35, 0.15]} />
            <meshStandardMaterial
              color={isHighlighted('Carriage') ? highlightColor : '#1e293b'}
              roughness={0.6}
            />
          </mesh>

          {/* Apron Handwheel */}
          <mesh position={[-0.15, -0.3, 0.54]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.02, 12, 24]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
          </mesh>
        </group>

        {/* 5. CROSS SLIDE (Moves perpendicularly in X/Z) */}
        <group
          position={[0, 0.05, crossSlideX]}
          name="Cross slide"
          onPointerOver={(e) => {
            e.stopPropagation();
            setHighlightedComponent('Cross slide');
          }}
          onPointerOut={() => setHighlightedComponent(null)}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.08, 0.45]} />
            <meshStandardMaterial
              color={isHighlighted('Cross slide') ? highlightColor : '#475569'}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>

          {/* Cross Slide Feed Handle */}
          <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>

          {/* 6. COMPOUND REST (Swivels) */}
          <group
            position={[0, 0.08, 0]}
            name="Compound rest"
            onPointerOver={(e) => {
              e.stopPropagation();
              setHighlightedComponent('Compound rest');
            }}
            onPointerOut={() => setHighlightedComponent(null)}
          >
            {/* Swivelling Circular Base */}
            <mesh castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.06, 32]} />
              <meshStandardMaterial
                color={isHighlighted('Compound rest') ? highlightColor : '#334155'}
                metalness={0.6}
              />
            </mesh>

            {/* Top Slide */}
            <mesh position={[0, 0.06, 0]} castShadow>
              <boxGeometry args={[0.28, 0.06, 0.22]} />
              <meshStandardMaterial
                color={isHighlighted('Compound rest') ? highlightColor : '#475569'}
              />
            </mesh>

            {/* 7. TOOL POST & TOOL HOLDER */}
            <group
              position={[0, 0.16, 0]}
              name="Tool post"
              onPointerOver={(e) => {
                e.stopPropagation();
                setHighlightedComponent('Tool post');
              }}
              onPointerOut={() => setHighlightedComponent(null)}
            >
              {/* Square 4-way Tool Post block */}
              <mesh castShadow>
                <boxGeometry args={[0.16, 0.15, 0.16]} />
                <meshStandardMaterial
                  color={isHighlighted('Tool post') ? highlightColor : '#0f172a'}
                  metalness={0.7}
                  roughness={0.3}
                />
              </mesh>

              {/* Clamping T-Bolts */}
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.08]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.8} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* 8. LEAD SCREW & FEED ROD (Along bed front) */}
      <group
        name="Lead screw"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHighlightedComponent('Lead screw');
        }}
        onPointerOut={() => setHighlightedComponent(null)}
      >
        <mesh
          ref={leadScrewRef}
          position={[0, -0.22, 0.46]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.025, 0.025, 3.8, 16]} />
          <meshStandardMaterial
            color={isHighlighted('Lead screw') ? highlightColor : '#cbd5e1'}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}
