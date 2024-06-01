// src/games/Flip/Effect.tsx

import * as THREE from "three";

import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const tmp = new THREE.Object3D();

const TEXTURE_STAR = "/games/flip/star.png";
const STARS = 10;

export const Effect = ({ color }: { color: string }) => {
  const texture = useTexture(TEXTURE_STAR);
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const animation = useRef(0);

  useFrame(() => {
    for (let i = 0; i < STARS; i++) {
      const angle = (i / STARS) * Math.PI * 2;
      const ssss = 0.5 + (1 + Math.cos(i)) * 2;
      tmp.rotation.z = i + Date.now() * 0.001;
      tmp.scale.setScalar(
        ssss * animation.current * 1 * (1 - animation.current),
      );
      const len = 1 + 2 * animation.current;
      tmp.position.set(Math.cos(angle) * len, Math.sin(angle) * len, 0);
      tmp.updateMatrix();
      mesh.current.setMatrixAt(i, tmp.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    animation.current += (1 - animation.current) * 0.1;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, STARS]}
      position-z={-1}
    >
      <planeGeometry />
      <meshBasicMaterial transparent map={texture} color={color} />
    </instancedMesh>
  );
};
