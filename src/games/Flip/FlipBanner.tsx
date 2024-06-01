// src/games/Flip/FlipBanner.tsx
import {
  BufferGeometry,
  ExtrudeGeometry,
  Line,
  LineBasicMaterial,
  MeshBasicMaterial,
  Shape,
  Vector3,
} from "three";
import React, { FC, useEffect, useRef, useState } from "react";

import { Text } from "@react-three/drei";

interface FlashingTextProps {
  messages: string[];
  interval?: number;
  fontSize?: number;
  position?: [number, number, number];
}

const FlashingText: FC<FlashingTextProps> = ({
  messages,
  interval = 2500,
  fontSize = 0.4,
  position = [0, 0, 0],
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setMessageIndex((x) => (x + 1) % messages.length);
    }, interval);

    const flashInterval = setInterval(() => {
      setFlash((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(flashInterval);
    };
  }, [messages, interval]);

  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={flash ? "#ffec63" : "#ffec6311"}
      anchorX="center"
      anchorY="middle"
    >
      {messages[messageIndex]}
    </Text>
  );
};

const YellowBanner = ({ position }: { position: [number, number, number] }) => {
  const roundedRect = createRoundedRectShape(4, 1, 0.2);
  const extrudeSettings = { depth: 0.1, bevelEnabled: false };
  const geometry = new ExtrudeGeometry(roundedRect, extrudeSettings);

  const material = new MeshBasicMaterial({
    color: "#ffec63",
    transparent: true,
    opacity: 0.2,
  });

  return <mesh position={position} geometry={geometry} material={material} />;
};

const createRoundedRectShape = (
  width: number,
  height: number,
  radius: number,
) => {
  const shape = new Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
};

const createRoundedRectOutline = (
  width: number,
  height: number,
  radius: number,
) => {
  const shape = new Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const points = shape
    .getPoints()
    .map((point) => new Vector3(point.x, point.y, 0));
  const geometry = new BufferGeometry().setFromPoints(points);

  return geometry;
};

export const FlipBanner: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const lineRef = useRef<Line>(null);

  useEffect(() => {
    const geometry = createRoundedRectOutline(1.8, 0.8, 0.2);
    const material = new LineBasicMaterial({
      color: "#ffec63",
      linewidth: 2,
    });

    const line = new Line(geometry, material);
    line.position.set(...position);

    if (lineRef.current) {
      lineRef.current.add(line);
    }

    return () => {
      if (lineRef.current) {
        lineRef.current.remove(line);
      }
    };
  }, [position]);

  return <group ref={lineRef as any} />;
};

export const BannerWithMessages = ({ messages }: { messages: string[] }) => (
  <group position={[0, 2, 0]}>
    <YellowBanner position={[0, 0, 0]} />
    <FlashingText
      messages={messages}
      interval={2500}
      fontSize={0.4}
      position={[0, 0, 0]}
    />
  </group>
);
