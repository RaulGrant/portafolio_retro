"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Box } from "@react-three/drei"
import * as THREE from "three"

function TransitionCube({ isVisible }: { isVisible: boolean }) {
  const cubeRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!)

  useFrame((state) => {
    if (cubeRef.current && materialRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 2
      cubeRef.current.rotation.y = state.clock.elapsedTime * 1.5
      cubeRef.current.rotation.z = state.clock.elapsedTime * 0.5

      // Animate scale and opacity based on visibility
      const targetScale = isVisible ? 2 : 0
      const targetOpacity = isVisible ? 0.8 : 0

      cubeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.1)
    }
  })

  return (
    <Box ref={cubeRef} args={[1, 1, 1]}>
      <meshBasicMaterial ref={materialRef} color="#8b5cf6" transparent opacity={0} wireframe />
    </Box>
  )
}

function FloatingText({ text, isVisible }: { text: string; isVisible: boolean }) {
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1

      const targetOpacity = isVisible ? 1 : 0
      if (textRef.current.material instanceof THREE.Material) {
        textRef.current.material.opacity = THREE.MathUtils.lerp(
          textRef.current.material.opacity || 0,
          targetOpacity,
          0.1,
        )
      }
    }
  })

  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      fontSize={0.5}
      color="#00ff41"
      anchorX="center"
      anchorY="middle"
      font="/fonts/press-start-2p.woff"
    >
      {text}
      <meshBasicMaterial transparent opacity={0} />
    </Text>
  )
}

function ParticleExplosion({ isVisible }: { isVisible: boolean }) {
  const particlesRef = useRef<THREE.Points>(null!)

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const velocities = new Float32Array(particleCount * 3)

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = 0
    positions[i * 3 + 1] = 0
    positions[i * 3 + 2] = 0

    velocities[i * 3] = (Math.random() - 0.5) * 0.1
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
  }

  useFrame(() => {
    if (particlesRef.current && isVisible) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3]
        positions[i * 3 + 1] += velocities[i * 3 + 1]
        positions[i * 3 + 2] += velocities[i * 3 + 2]

        // Reset particles that go too far
        if (Math.abs(positions[i * 3]) > 5) {
          positions[i * 3] = 0
          positions[i * 3 + 1] = 0
          positions[i * 3 + 2] = 0
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff0080"
        size={0.02}
        transparent
        opacity={isVisible ? 0.8 : 0}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

interface Transition3DProps {
  isVisible: boolean
  text: string
}

export default function Transition3D({ isVisible, text }: Transition3DProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TransitionCube isVisible={isVisible} />
        <FloatingText text={text} isVisible={isVisible} />
        <ParticleExplosion isVisible={isVisible} />
      </Canvas>
    </div>
  )
}
