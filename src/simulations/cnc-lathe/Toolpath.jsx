import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function Toolpath({ toolpath = [], activeIndex = 0 }) {
  if (!toolpath || toolpath.length === 0) return null;

  // Coordinate mapping for visual display:
  // Z mm mapped to 3D X: z * 0.025
  // X mm mapped to 3D Y: 0.2 + (x / 2) * 0.015
  const mapPoint = (pt) => {
    return new THREE.Vector3(
      pt.z * 0.025,
      0.2 + (pt.x / 2) * 0.015,
      0.28
    );
  };

  return (
    <group>
      {toolpath.map((segment, idx) => {
        const p1 = mapPoint(segment.from);
        const p2 = mapPoint(segment.to);
        const isRapid = segment.type === 'rapid';
        const isCurrent = idx === activeIndex;

        const points = [p1, p2];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: isRapid ? '#e11d48' : isCurrent ? '#38bdf8' : '#22c55e',
          linewidth: isCurrent ? 3 : 1,
          transparent: true,
          opacity: isRapid ? 0.6 : 1.0,
        });

        const lineObj = new THREE.Line(lineGeo, lineMat);

        return (
          <primitive
            key={idx}
            object={lineObj}
          />
        );
      })}
    </group>
  );
}
