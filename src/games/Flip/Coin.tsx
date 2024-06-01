import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import { Group } from "three";
import { useFrame } from "@react-three/fiber";

const MODEL_COIN = "/games/flip/Coin.glb";
const TEXTURE_HEADS = "/games/flip/heads.png";
const TEXTURE_TAILS = "/games/flip/tails.png";

function CoinModel({ headsMap, tailsMap }: { headsMap: any; tailsMap: any }) {
  const { nodes } = useGLTF(MODEL_COIN);

  const coinMesh = nodes.Coin.clone();

  return (
    <>
      <primitive object={coinMesh} />
      <mesh position-z={0.3}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial transparent map={headsMap} />
      </mesh>
      <group rotation-y={Math.PI}>
        <mesh position-z={0.3}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshStandardMaterial transparent map={tailsMap} />
        </mesh>
      </group>
    </>
  );
}

interface CoinProps {
  flipping: boolean;
  result: number;
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  onClick?: () => void;
}

export function Coin({
  flipping,
  result,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  onClick,
}: CoinProps) {
  const group = useRef<Group | null>(null);
  const target = useRef(0);
  const [heads, tails] = useTexture([TEXTURE_HEADS, TEXTURE_TAILS]);

  useEffect(() => {
    if (!flipping && group.current) {
      const fullTurns = Math.floor(group.current.rotation.y / (Math.PI * 2));
      target.current = (fullTurns + 1) * Math.PI * 2 + result * Math.PI;
    }
  }, [flipping, result]);

  useFrame((state, dt) => {
    if (group.current) {
      if (flipping) {
        group.current.rotation.y += 25 * dt;
      } else {
        const clamp = (value: number, min: number, max: number) =>
          Math.min(Math.max(value, min), max);
        group.current.rotation.y += clamp(
          (target.current - group.current.rotation.y) * 10 * dt,
          0,
          1,
        );
      }
      const currentScale = flipping ? 1.25 : 1;
      group.current.scale.y += (currentScale - group.current.scale.y) * 0.1;
      group.current.scale.setScalar(group.current.scale.y * scale);
    }
  });

  return (
    <group
      rotation={rotation}
      ref={group}
      position={position}
      onClick={onClick}
    >
      <CoinModel headsMap={heads} tailsMap={tails} />
    </group>
  );
}

useGLTF.preload(MODEL_COIN);

export { TEXTURE_HEADS, TEXTURE_TAILS };
