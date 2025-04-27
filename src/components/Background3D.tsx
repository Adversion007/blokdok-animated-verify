
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Simplified particle component that doesn't use drei primitives directly
const Particle = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const randomSpeed = useRef(Math.random() * 0.01 + 0.003);
  const randomRotation = useRef(Math.random() * 0.01 + 0.003);
  const direction = useRef<[number, number, number]>([
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01
  ]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += randomRotation.current;
      mesh.current.rotation.y += randomRotation.current * 0.5;

      mesh.current.position.x += direction.current[0];
      mesh.current.position.y += direction.current[1];
      mesh.current.position.z += direction.current[2];

      // Bounce back when reaching boundaries
      if (Math.abs(mesh.current.position.x) > 10) {
        direction.current[0] *= -1;
      }
      if (Math.abs(mesh.current.position.y) > 10) {
        direction.current[1] *= -1;
      }
      if (Math.abs(mesh.current.position.z) > 10) {
        direction.current[2] *= -1;
      }
    }
  });

  // Use basic Three.js geometries instead of drei components
  return (
    <mesh ref={mesh} position={position}>
      {Math.random() > 0.5 ? (
        <sphereGeometry args={[0.2 + Math.random() * 0.3]} />
      ) : (
        <boxGeometry args={[
          0.3 + Math.random() * 0.3, 
          0.3 + Math.random() * 0.3, 
          0.3 + Math.random() * 0.3
        ]} />
      )}
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

const ParticleGroup: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, i) => {
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ];
    
    // Alternate between purple and blue tones
    const colors = ['#9b87f5', '#7E69AB', '#0EA5E9', '#D3E4FD'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return <Particle key={i} position={position} color={color} />;
  });

  return <>{particles}</>;
};

const Background3D: React.FC = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <ParticleGroup />
    </Canvas>
  );
};

export default Background3D;
