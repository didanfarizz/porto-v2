'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import Image from 'next/image';
import { usePerformanceTier } from '@/utils/usePerformanceTier';

// ─── Rope rendered as a native THREE.Line for mutable geometry ───
function LanyardRope({ posRef }: { posRef: React.MutableRefObject<THREE.Vector3> }) {
  const ANCHOR = useMemo(() => new THREE.Vector3(0, 3.2, 0), []);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pts = new Float32Array(31 * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const mat = new THREE.LineBasicMaterial({ color: '#8350EB', linewidth: 2 });
    return new THREE.Line(geo, mat);
  }, []);

  useFrame(() => {
    const cardHook = posRef.current.clone().add(new THREE.Vector3(0, 1.4, 0));
    const midX = (ANCHOR.x + cardHook.x) / 2;
    const dist  = ANCHOR.distanceTo(cardHook);
    const sag   = Math.max(0.5, 2.2 - dist * 0.4);
    const midY  = Math.min(ANCHOR.y, cardHook.y) - sag;
    const midZ  = (ANCHOR.z + cardHook.z) / 2;
    const mid   = new THREE.Vector3(midX, midY, midZ);

    const curve  = new THREE.QuadraticBezierCurve3(ANCHOR, mid, cardHook);
    const points = curve.getPoints(30);

    const attr = lineObj.geometry.getAttribute('position') as THREE.BufferAttribute;
    points.forEach((p, i) => { attr.setXYZ(i, p.x, p.y, p.z); });
    attr.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      lineObj.geometry.dispose();
      (lineObj.material as THREE.Material).dispose();
    };
  }, [lineObj]);

  return <primitive object={lineObj} />;
}

// ─── Card with manual spring simulation ───
function IDCard({
  isDragged,
  setIsDragged,
}: {
  isDragged: boolean;
  setIsDragged: (v: boolean) => void;
}) {
  const meshGroupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  const posRef = useRef(new THREE.Vector3(0, 0.5, 0));
  const velRef = useRef(new THREE.Vector3(0, 0, 0));
  const rotRef = useRef({ x: 0, y: 0, z: 0 });

  const [profileTex, setProfileTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      '/profil-2.png',
      (t) => {
        if (!active) return;
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.needsUpdate = true;
        setProfileTex(t);
      },
      undefined,
      (e) => console.error('[Lanyard] texture error:', e),
    );

    return () => {
      active = false;
      if (profileTex) profileTex.dispose();
    };
  }, []);

  const ANCHOR   = useMemo(() => new THREE.Vector3(0, 3.2, 0), []);
  const REST_LEN = 2.6;
  const K_SPRING = 55;
  const GRAVITY  = -18;
  const DAMP     = 0.88;

  useFrame((_, delta) => {
    if (!meshGroupRef.current) return;
    const dt = Math.min(delta, 0.04);

    if (isDragged) {
      const tx = (mouse.x * viewport.width)  / 2;
      const ty = (mouse.y * viewport.height) / 2;
      posRef.current.lerp(new THREE.Vector3(tx, ty, 0), 0.25);
      velRef.current.set(0, 0, 0);
      rotRef.current.x = THREE.MathUtils.lerp(rotRef.current.x, -mouse.y * 0.4, 0.1);
      rotRef.current.y = THREE.MathUtils.lerp(rotRef.current.y,  mouse.x * 0.4, 0.1);
    } else {
      const hookPos = posRef.current.clone().add(new THREE.Vector3(0, 1.4, 0));
      const toAnchor = new THREE.Vector3().subVectors(ANCHOR, hookPos);
      const dist = toAnchor.length();

      if (dist > REST_LEN) {
        const stretch = dist - REST_LEN;
        velRef.current.addScaledVector(toAnchor.normalize(), K_SPRING * stretch * dt);
      }

      velRef.current.y += GRAVITY * dt;
      velRef.current.z += -posRef.current.z * 40 * dt;
      velRef.current.multiplyScalar(Math.pow(DAMP, dt * 60));
      posRef.current.addScaledVector(velRef.current, dt);

      rotRef.current.z = THREE.MathUtils.lerp(rotRef.current.z, -velRef.current.x * 0.02, 0.1);
      rotRef.current.x = THREE.MathUtils.lerp(rotRef.current.x,  velRef.current.y * 0.005, 0.1);
      rotRef.current.y = THREE.MathUtils.lerp(rotRef.current.y, 0, 0.05);
    }

    meshGroupRef.current.position.copy(posRef.current);
    meshGroupRef.current.rotation.x = rotRef.current.x;
    meshGroupRef.current.rotation.y = rotRef.current.y;
    meshGroupRef.current.rotation.z = rotRef.current.z;
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragged(true);
    velRef.current.set(0, 0, 0);
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragged(false);
  };

  return (
    <>
      <LanyardRope posRef={posRef} />

      <group
        ref={meshGroupRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Glassmorphic outer casing */}
        <mesh>
          <boxGeometry args={[2.0, 3.0, 0.12]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.2}
            roughness={0.15}
            metalness={0.1}
            clearcoat={1.0}
            color="#ffffff"
          />
        </mesh>

        {/* Top clip ring */}
        <mesh position={[0, 1.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.04, 8, 24]} />
          <meshStandardMaterial color="#8350EB" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Inner dark card body */}
        <mesh>
          <boxGeometry args={[1.86, 2.86, 0.08]} />
          <meshStandardMaterial color="#1b122c" roughness={0.4} />
        </mesh>

        {/* Front: profile photo */}
        <mesh position={[0, 0, 0.047]}>
          <planeGeometry args={[1.8, 2.8]} />
          {profileTex ? (
            <meshBasicMaterial map={profileTex} />
          ) : (
            <meshStandardMaterial color="#241535" roughness={0.6} />
          )}
        </mesh>

        {/* Back face */}
        <mesh position={[0, 0, -0.047]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.8, 2.8]} />
          <meshBasicMaterial color="#8350EB" />
        </mesh>
      </group>
    </>
  );
}

function TopAnchor() {
  return (
    <mesh position={[0, 3.2, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#8350EB" roughness={0.2} metalness={0.9} />
    </mesh>
  );
}

// ─── Main export ───
export default function Lanyard() {
  const [isDragged, setIsDragged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isLowEnd, isTabVisible, dpr } = usePerformanceTier();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] rounded-3xl bg-secondary/10 border border-purple/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback static profile card for low-power mobile devices
  if (isLowEnd) {
    return (
      <div className="w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] rounded-3xl bg-secondary/20 border border-primary/30 p-4 flex flex-col items-center justify-center backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple/10 to-transparent pointer-events-none" />
        <div className="relative w-48 h-64 rounded-2xl overflow-hidden shadow-lg border border-purple/20 mb-4">
          <Image
            src="/profil-2.png"
            alt="Didan Farizz Profile"
            fill
            sizes="(max-width: 768px) 192px, 200px"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="text-center z-10">
          <h4 className="text-sm font-bold text-white tracking-wide">Didan Farizz</h4>
          <p className="text-xs text-primary font-mono font-semibold">Web Developer &amp; ML Engineer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] relative select-none">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-bold tracking-widest text-primary px-3 py-1.5 rounded-full uppercase pointer-events-none z-20 animate-pulse">
        Drag &amp; Sway Me
      </div>

      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        dpr={[1, dpr]}
        frameloop={isTabVisible ? 'always' : 'never'}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        shadows
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.0} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={1.0} />

        <IDCard isDragged={isDragged} setIsDragged={setIsDragged} />
        <TopAnchor />
      </Canvas>
    </div>
  );
}
