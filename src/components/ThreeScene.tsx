
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, Text, Sphere } from '@react-three/drei';
import { Mesh } from 'three';

const FloatingPlate = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={1.5}
    >
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial color="#f8f8f8" metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Food items on the plate */}
      <group position={[0, 0.2, 0]}>
        {/* Apple */}
        <mesh position={[-0.8, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.5} />
        </mesh>
        
        {/* Broccoli (simplified) */}
        <group position={[0.8, 0.2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
            <meshStandardMaterial color="#7db587" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.4, 0]} castShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#57a773" roughness={0.8} />
          </mesh>
        </group>
        
        {/* Orange */}
        <mesh position={[0, 0.1, 0.8]} castShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#ffaa5e" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const NutrientMolecules = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8
    ],
    size: Math.random() * 0.3 + 0.1,
    color: i % 3 === 0 
      ? "#98FF98" // Mint green
      : i % 3 === 1 
        ? "#FFA500" // Gold
        : "#87CEEB" // Light blue
  }));

  return (
    <group>
      {particles.map((particle, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={0.2 + Math.random() * 0.3}
          floatIntensity={2 + Math.random()}
        >
          <Sphere
            args={[particle.size, 16, 16]}
            position={particle.position as [number, number, number]}
          >
            <meshStandardMaterial
              color={particle.color}
              roughness={0.2}
              emissive={particle.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

const ThreeScene = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#98FF98" />
        <FloatingPlate />
        <NutrientMolecules />
        <Environment preset="sunset" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
