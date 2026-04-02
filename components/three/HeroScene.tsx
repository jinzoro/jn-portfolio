// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 2800;

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 28;
      positions[i3 + 1] = (Math.random() - 0.5) * 16;
      positions[i3 + 2] = (Math.random() - 0.5) * 12;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    return { positions, sizes };
  }, []);

  const vertexShader = `
    attribute float size;
    varying float vAlpha;
    uniform float uTime;

    void main() {
      vAlpha = 0.4 + 0.6 * sin(uTime * 0.3 + position.x * 0.2 + position.y * 0.1);
      vec3 pos = position;
      pos.y += sin(uTime * 0.15 + position.x * 0.3) * 0.25;
      pos.x += cos(uTime * 0.12 + position.z * 0.2) * 0.15;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (280.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying float vAlpha;
    uniform vec3 uColor;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = vAlpha * smoothstep(0.5, 0.1, dist);
      gl_FragColor = vec4(uColor, alpha * 0.65);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ccff00") },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.06;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        state.clock.elapsedTime;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GridLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts: number[] = [];

    // Horizontal lines
    for (let i = -10; i <= 10; i++) {
      verts.push(-18, i * 0.8, 0, 18, i * 0.8, 0);
    }
    // Vertical lines
    for (let i = -20; i <= 20; i++) {
      verts.push(i * 0.9, -8, 0, i * 0.9, 8, 0);
    }

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(verts, 3)
    );
    return geo;
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.position.z = -4 + Math.sin(state.clock.elapsedTime * 0.06) * 0.5;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#ccff00"
        transparent
        opacity={0.025}
      />
    </lineSegments>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <ParticleField />
      <GridLines />
    </Canvas>
  );
}
