/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformanceTier } from '@/utils/usePerformanceTier';

// 1. Generate starfield points manually
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

function Stars({ count = 1000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => generateSpherePoints(count, 1.5), [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      const clampedDelta = Math.min(delta, 0.1);
      ref.current.rotation.x -= clampedDelta / 20;
      ref.current.rotation.y -= clampedDelta / 25;

      ref.current.rotation.x += (state.pointer.y * 0.05 - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (state.pointer.x * 0.05 - ref.current.rotation.y) * 0.05;
    }
  });

  // Resource cleanup on unmount
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.geometry?.dispose();
      }
    };
  }, []);

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

function FloatingShape({ position, args, type, speed, rotationSpeed }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.15;
      meshRef.current.rotation.x += rotationSpeed[0];
      meshRef.current.rotation.y += rotationSpeed[1];
    }
  });

  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose();
      }
    };
  }, []);

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

export default function Background3D() {
  const { isLowEnd, isTabVisible, dpr } = usePerformanceTier();

  // If low end hardware, render static ambient gradient for ultra smoothness
  if (isLowEnd) {
    return (
      <div className="absolute inset-0 w-full h-full -z-40 pointer-events-none bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple/15 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full -z-40 pointer-events-none bg-background transition-colors duration-300">
      <Canvas 
        camera={{ position: [0, 0, 1.2] }}
        dpr={[1, dpr]}
        frameloop={isTabVisible ? 'always' : 'never'}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <Stars count={800} />
        <FloatingShape 
          position={[0.8, 0.4, 0]} 
          args={[0.1, 0.03, 6, 16]} 
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
