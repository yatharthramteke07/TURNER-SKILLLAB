import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows } from '@react-three/drei';
import { useSimulationStore } from '../../store/useSimulationStore';
import WebGLFallback from './WebGLFallback';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Viewport({ children, cameraPosition = [0, 2.5, 5], fov = 45, onCreated }) {
  const simplifiedGraphics = useSimulationStore((state) => state.simplifiedGraphics);
  const controlsRef = useRef(null);

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      {/* 3D Canvas */}
      <Suspense fallback={<LoadingSpinner fullPage message="Loading 3D Machine Mesh..." />}>
        <Canvas
          shadows={!simplifiedGraphics}
          dpr={simplifiedGraphics ? 1 : [1, 2]}
          camera={{ position: cameraPosition, fov }}
          onCreated={({ gl, scene, camera }) => {
            gl.setClearColor('#050811');
            if (onCreated) onCreated({ gl, scene, camera, controls: controlsRef.current });
          }}
          className="w-full h-full"
        >
          {/* Lighting */}
          <ambientLight intensity={simplifiedGraphics ? 1.0 : 0.7} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.2}
            castShadow={!simplifiedGraphics}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          <pointLight position={[0, -2, 2]} intensity={0.3} />

          {/* Workshop Floor Grid */}
          <Grid
            renderOrder={-1}
            position={[0, -1.0, 0]}
            infiniteGrid
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#1e293b"
            sectionSize={2.0}
            sectionThickness={1.0}
            sectionColor="#334155"
            fadeDistance={20}
          />

          {/* Machine shadow */}
          {!simplifiedGraphics && (
            <ContactShadows
              position={[0, -0.99, 0]}
              opacity={0.6}
              scale={10}
              blur={1.5}
              far={4}
            />
          )}

          {/* Machine Children & Content */}
          {children}

          {/* Camera Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            minDistance={1.2}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 + 0.05} // don't go below floor
            dampingFactor={0.08}
            enableDamping
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
