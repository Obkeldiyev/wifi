import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Connections() {
  const count = 50;
  const lines = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      const pos = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      ];
      const points = [
        new THREE.Vector3(...pos),
        new THREE.Vector3(pos[0] + (Math.random() - 0.5) * 5, pos[1] + (Math.random() - 0.5) * 5, pos[2] + (Math.random() - 0.5) * 5)
      ];
      return points;
    });
  }, []);

  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {lines.map((points, i) => (
        <Line 
          key={i} 
          points={points} 
          color={i % 2 === 0 ? "white" : "#444"} 
          lineWidth={1} 
          transparent 
          opacity={0.3} 
        />
      ))}
      <Sphere args={[0.05, 10, 10]}>
         <meshBasicMaterial color="white" />
      </Sphere>
    </group>
  );
}

function GridBackground() {
    return (
        <group rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <gridHelper args={[40, 40, 0x333333, 0x111111]} />
        </group>
    )
}

export default function Scene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#030303']} />
        <fog attach="fog" args={['#030303', 5, 15]} />
        <ambientLight intensity={0.5} />
        <Connections />
        <GridBackground />
      </Canvas>
    </div>
  );
}
