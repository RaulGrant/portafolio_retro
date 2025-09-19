"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, RoundedBox, Text } from "@react-three/drei"
import * as THREE from "three"

function Console3D({ isActive }: { isActive: boolean }) {
  const consoleRef = useRef<THREE.Group>(null!)
  const screenRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (consoleRef.current) {
      // Gentle floating animation
      consoleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      consoleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05

      // Glow effect when active
      if (screenRef.current && screenRef.current.material instanceof THREE.MeshBasicMaterial) {
        const targetIntensity = isActive ? 1 : 0.3
        screenRef.current.material.opacity = THREE.MathUtils.lerp(
          screenRef.current.material.opacity,
          targetIntensity,
          0.1,
        )
      }
    }
  })

  return (
    <group ref={consoleRef} scale={[0.8, 0.8, 0.8]}>
      {/* Console Body */}
      <RoundedBox args={[2, 1.5, 0.3]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
        <meshBasicMaterial color="#374151" />
      </RoundedBox>

      {/* Screen */}
      <Box ref={screenRef} args={[1.6, 1, 0.05]} position={[0, 0.1, 0.16]}>
        <meshBasicMaterial color="#00ff41" transparent opacity={0.3} />
      </Box>

      {/* D-Pad */}
      <Box args={[0.3, 0.1, 0.05]} position={[-0.6, -0.3, 0.16]}>
        <meshBasicMaterial color="#6b7280" />
      </Box>
      <Box args={[0.1, 0.3, 0.05]} position={[-0.6, -0.3, 0.16]}>
        <meshBasicMaterial color="#6b7280" />
      </Box>

      {/* Action Buttons */}
      <Box args={[0.15, 0.15, 0.05]} position={[0.5, -0.2, 0.16]}>
        <meshBasicMaterial color="#dc2626" />
      </Box>
      <Box args={[0.15, 0.15, 0.05]} position={[0.7, -0.3, 0.16]}>
        <meshBasicMaterial color="#2563eb" />
      </Box>

      {/* Holographic Text */}
      <Text position={[0, 0.1, 0.2]} fontSize={0.1} color="#00ff41" anchorX="center" anchorY="middle">
        RETRO CONSOLE
        <meshBasicMaterial transparent opacity={isActive ? 1 : 0.5} />
      </Text>
    </group>
  )
}

function HolographicGrid() {
  const gridRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      gridRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
    }
  })

  return (
    <group ref={gridRef} position={[0, -1, -2]}>
      <gridHelper args={[4, 10, "#8b5cf6", "#4c1d95"]} />
    </group>
  )
}

interface Console3DViewProps {
  isActive?: boolean
}

export default function Console3DView({ isActive = false }: Console3DViewProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#8b5cf6" />

        <Console3D isActive={isActive} />
        <HolographicGrid />
      </Canvas>
    </div>
  )
}
