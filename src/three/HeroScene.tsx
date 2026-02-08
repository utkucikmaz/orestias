import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import logoUrl from "../assets/logo.png";

const basePositions = [
  new THREE.Vector3(-0.35, -0.35, -0.35),
  new THREE.Vector3(0.35, -0.35, -0.35),
  new THREE.Vector3(-0.35, 0.35, -0.35),
  new THREE.Vector3(0.35, 0.35, -0.35),
  new THREE.Vector3(-0.35, -0.35, 0.35),
  new THREE.Vector3(0.35, -0.35, 0.35),
  new THREE.Vector3(-0.35, 0.35, 0.35),
  new THREE.Vector3(0.35, 0.35, 0.35),
];

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Particle component for dust effect
type Velocity = { x: number; y: number; z: number };

const Particles = ({ exploded }: { exploded: boolean }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 30;
  const initialPositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const seed = i * 13.37;
      positions[i * 3] = (pseudoRandom(seed + 1) - 0.5) * 0.5;
      positions[i * 3 + 1] = (pseudoRandom(seed + 2) - 0.5) * 0.5;
      positions[i * 3 + 2] = (pseudoRandom(seed + 3) - 0.5) * 0.5;
    }
    return positions;
  }, [particleCount]);

  const initialVelocities = useMemo(() => {
    const velocities: Velocity[] = [];
    for (let i = 0; i < particleCount; i++) {
      const seed = i * 13.37;
      velocities.push({
        x: (pseudoRandom(seed + 4) - 0.5) * 0.02,
        y: pseudoRandom(seed + 5) * 0.03 - 0.01,
        z: (pseudoRandom(seed + 6) - 0.5) * 0.02,
      });
    }
    return velocities;
  }, [particleCount]);

  const velocitiesRef = useRef<Velocity[]>([]);

  useEffect(() => {
    velocitiesRef.current = initialVelocities.map((velocity) => ({
      ...velocity,
    }));
  }, [initialVelocities]);

  useFrame(() => {
    if (!particlesRef.current) return;

    const attribute = particlesRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const velocity = velocitiesRef.current[i];
      if (!velocity) continue;

      if (exploded) {
        positions[i * 3] += velocity.x;
        positions[i * 3 + 1] += velocity.y;
        positions[i * 3 + 2] += velocity.z;

        velocity.y -= 0.001;

        if (positions[i * 3 + 1] < -2) {
          const seed = i * 19.73;
          positions[i * 3] = (pseudoRandom(seed + 7) - 0.5) * 0.5;
          positions[i * 3 + 1] = (pseudoRandom(seed + 8) - 0.5) * 0.5;
          positions[i * 3 + 2] = (pseudoRandom(seed + 9) - 0.5) * 0.5;
          velocity.y = pseudoRandom(seed + 10) * 0.03 - 0.01;
        }
      }
    }

    attribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b7355"
        transparent
        opacity={exploded ? 0.6 : 0}
        sizeAttenuation
      />
    </points>
  );
};

type Piece = {
  base: THREE.Vector3;
  explode: THREE.Vector3;
  rotation: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
};

type CrateProps = {
    position: [number, number, number];
    scale?: number;
};

const Crate = ({ position, scale = 1 }: CrateProps) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const pieceRefs = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const clock = useRef(0);
  const hoverBoxSize = 2.8;
  const logoTexture = useLoader(THREE.TextureLoader, logoUrl);
  const pieceSize = 0.6;
  const logoSize = 0.26;
  const logoOffset = pieceSize / 2 + 0.008;

  const woodMaterials = useMemo<THREE.MeshStandardMaterial[]>(() => {
    const materials: THREE.MeshStandardMaterial[] = [];
    for (let i = 0; i < 8; i++) {
      const isDark = i % 2 === 0;
      materials.push(
        new THREE.MeshStandardMaterial({
          color: isDark ? "#a67c52" : "#c99655",
          roughness: 0.85,
          metalness: 0.02,
          flatShading: false,
        })
      );
    }
    return materials;
  }, []);

  const configuredLogoTexture = useMemo(() => {
    const texture = logoTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [logoTexture]);

  const logoMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: configuredLogoTexture,
        transparent: true,
        roughness: 0.8,
        metalness: 0,
        depthWrite: true,
        alphaTest: 0.2,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      }),
    [configuredLogoTexture]
  );

  const pieces = useMemo<Piece[]>(() => {
    return basePositions.map((base) => {
      const direction = base.clone().normalize();
      // Push pieces outward mostly on X/Z so they spread to all four sides on hover.
      const explode = new THREE.Vector3(
        direction.x * 1.4,
        direction.y * 0.35,
        direction.z * 1.4
      );

      const seed = base.x * 10 + base.y * 20 + base.z * 30;
      explode.x += (pseudoRandom(seed + 1) - 0.5) * 0.5;
      explode.y += (pseudoRandom(seed + 2) - 0.5) * 0.2;
      explode.z += (pseudoRandom(seed + 3) - 0.5) * 0.5;

      return {
        base: base.clone(),
        explode,
        rotation: new THREE.Vector3(
          (pseudoRandom(seed + 4) - 0.5) * Math.PI,
          (pseudoRandom(seed + 5) - 0.5) * Math.PI,
          (pseudoRandom(seed + 6) - 0.5) * Math.PI
        ),
        rotationSpeed: new THREE.Vector3(
          (pseudoRandom(seed + 7) - 0.5) * 0.15,
          (pseudoRandom(seed + 8) - 0.5) * 0.15,
          (pseudoRandom(seed + 9) - 0.5) * 0.15
        ),
      };
    });
  }, []);

  const logoFaces = useMemo(() => {
    const faces: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [
      { position: [0, 0, logoOffset], rotation: [0, 0, 0] },
      { position: [0, 0, -logoOffset], rotation: [0, Math.PI, 0] },
      { position: [logoOffset, 0, 0], rotation: [0, Math.PI / 2, 0] },
      { position: [-logoOffset, 0, 0], rotation: [0, -Math.PI / 2, 0] },
      { position: [0, logoOffset, 0], rotation: [-Math.PI / 2, 0, 0] },
      { position: [0, -logoOffset, 0], rotation: [Math.PI / 2, 0, 0] },
    ];

    return pieces.map((piece, index) => {
      const seed = piece.base.x * 17 + piece.base.y * 31 + piece.base.z * 47 + index * 13;
      const faceIndex = Math.floor(pseudoRandom(seed) * faces.length);
      return faces[faceIndex];
    });
  }, [logoOffset, pieces]);

  useFrame((_, delta) => {
    if (reduceMotion) return;

    clock.current += delta;

    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y = Math.sin(clock.current * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.current * 0.2) * 0.05;
    } else if (groupRef.current && hovered) {
      groupRef.current.rotation.y += delta * 0.3;
    }

    const intensity = hovered ? 1 : 0;
    const lerpFactor = hovered ? 0.06 : 0.12;

    pieceRefs.current.forEach((mesh, index) => {
      const piece = pieces[index];
      if (!mesh) return;

      tempVec.copy(piece.base).addScaledVector(piece.explode, intensity);
      mesh.position.lerp(tempVec, lerpFactor);

      if (hovered) {
        mesh.rotation.x += piece.rotationSpeed.x * delta * 3;
        mesh.rotation.y += piece.rotationSpeed.y * delta * 3;
        mesh.rotation.z += piece.rotationSpeed.z * delta * 3;
      } else {
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0, lerpFactor);
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, 0, lerpFactor);
        mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, 0, lerpFactor);
      }
    });
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
    >
      <mesh
        onPointerEnter={(event) => {
          event.stopPropagation();
          if (!reduceMotion) {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          if (!reduceMotion) {
            setHovered(false);
            document.body.style.cursor = "default";
          }
        }}
      >
        <boxGeometry args={[hoverBoxSize, hoverBoxSize, hoverBoxSize]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {pieces.map((piece, index) => (
        <mesh
          key={index}
          ref={(node) => {
            if (node) pieceRefs.current[index] = node;
          }}
          position={piece.base}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[pieceSize, pieceSize, pieceSize]} />
          <primitive object={woodMaterials[index]} attach="material" />
          <mesh
            position={logoFaces[index].position}
            rotation={logoFaces[index].rotation}
            material={logoMaterial}
          >
            <planeGeometry args={[logoSize, logoSize]} />
          </mesh>
        </mesh>
      ))}
      <Particles exploded={hovered} />
    </group>
  );
};

const HeroScene = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={reduceMotion ? "demand" : "always"}
      camera={{ position: [0, 0.5, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[5, 8, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <directionalLight position={[-3, 2, -5]} intensity={0.3} />

      <directionalLight position={[0, -2, -5]} intensity={0.5} />

      <pointLight position={[0, 3, 2]} intensity={0.4} color="#ffd9a8" />

      <Crate position={[0, 0, 0]} scale={1.05} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </Canvas>
  );
};

export default HeroScene;
