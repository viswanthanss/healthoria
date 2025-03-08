
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

const NutritionPlate = () => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      {/* Plate */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
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
        
        {/* Protein (chicken breast) */}
        <mesh position={[0, 0.1, 0.8]} castShadow>
          <boxGeometry args={[0.7, 0.2, 0.5]} />
          <meshStandardMaterial color="#f1d9c0" roughness={0.6} />
        </mesh>
        
        {/* Carbs (rice) */}
        <group position={[-0.6, 0.1, -0.6]}>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh 
              key={i} 
              position={[
                Math.random() * 0.4 - 0.2,
                Math.random() * 0.1,
                Math.random() * 0.4 - 0.2
              ]} 
              castShadow
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#fff5e6" roughness={0.5} />
            </mesh>
          ))}
        </group>
        
        {/* Fats (avocado) */}
        <mesh position={[0.5, 0.1, -0.7]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#7fad71" roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

const NutritionMolecules = () => {
  // Create floating "nutrient molecules"
  const particles = Array.from({ length: 15 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5 + 2,
      (Math.random() - 0.5) * 5
    ],
    size: Math.random() * 0.2 + 0.1,
    color: i % 3 === 0 
      ? "#FFA500" // Orange (vitamins)
      : i % 3 === 1 
        ? "#98FF98" // Mint (minerals)
        : "#87CEEB" // Blue (water)
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
          <mesh
            position={particle.position as [number, number, number]}
            castShadow
          >
            <sphereGeometry args={[particle.size, 16, 16]} />
            <meshStandardMaterial
              color={particle.color}
              roughness={0.2}
              emissive={particle.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const NutritionScene = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FFA500" />
        
        <NutritionPlate />
        <NutritionMolecules />
        
        <Environment preset="sunset" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
};

export default NutritionScene;
