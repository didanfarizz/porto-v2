/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Generate starfield points manually (avoiding external maath package)
const generateSpherePoints = (numPoints: number, radius: number) => {
  const points = new Float32Array(numPoints * 3);
  for (let i = 0; i < numPoints; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius * Math.cbrt(Math.random());

    points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i * 3 + 2] = r * Math.cos(phi);
  }
  return points;
};  

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => generateSpherePoints(1200, 1.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate stars slowly (fallback if delta is huge, cap it)
      const clampedDelta = Math.min(delta, 0.1);
      ref.current.rotation.x -= clampedDelta / 20;
      ref.current.rotation.y -= clampedDelta / 25;

      // Parallax effect following mouse pointer
      ref.current.rotation.x += (state.pointer.y * 0.05 - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (state.pointer.x * 0.05 - ref.current.rotation.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#8350EB"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

interface FloatingShapeProps {
  position: [number, number, number];
  args: number[];
  type: 'torus' | 'dodecahedron' | 'icosahedron';
  speed: number;
  rotationSpeed: [number, number];
}

// 2. Floating wireframe shape component
function FloatingShape({ position, args, type, speed, rotationSpeed }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle floating up and down
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.15;
      
      // Rotate
      meshRef.current.rotation.x += rotationSpeed[0];
      meshRef.current.rotation.y += rotationSpeed[1];
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'torus' && <torusGeometry args={args} />}
      {type === 'dodecahedron' && <dodecahedronGeometry args={args} />}
      {type === 'icosahedron' && <icosahedronGeometry args={args} />}
      <meshBasicMaterial 
        color="#8350EB" 
        wireframe 
        transparent 
        opacity={0.12} 
      />
    </mesh>
  );
}

// 3. Main export component
export default function Background3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-40 pointer-events-none bg-background transition-colors duration-300">
      <Canvas 
        camera={{ position: [0, 0, 1.2] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <Stars />
        <FloatingShape 
          position={[0.8, 0.4, 0]} 
          args={[0.1, 0.03, 8, 24]} 
          type="torus" 
          speed={0.8} 
          rotationSpeed={[0.002, 0.003]} 
        />
        <FloatingShape 
          position={[-0.8, -0.2, 0]} 
          args={[0.08, 0]} 
          type="dodecahedron" 
          speed={1.1} 
          rotationSpeed={[0.004, 0.002]} 
        />
        <FloatingShape 
          position={[0.5, -0.6, 0]} 
          args={[0.07, 0]} 
          type="icosahedron" 
          speed={0.9} 
          rotationSpeed={[0.001, 0.005]} 
        />
      </Canvas>
    </div>
  );
}
