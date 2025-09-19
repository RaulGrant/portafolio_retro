"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Sphere, Torus, Text } from "@react-three/drei"
import type * as THREE from "three"

interface TechIcon3DProps {
  name: string
  color: string
  position: [number, number, number]
  type: "cube" | "sphere" | "torus"
}

function TechIcon3D({ name, color, position, type }: TechIcon3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }

    if (textRef.current) {
      textRef.current.lookAt(0, 0, 5) // Always face the camera
    }
  })

  const renderGeometry = () => {
    switch (type) {
      case "sphere":
        return (
          <Sphere ref={meshRef} args={[0.3]} position={position}>
            <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
          </Sphere>
        )
      case "torus":
        return (
          <Torus ref={meshRef} args={[0.3, 0.1]} position={position}>
            <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
          </Torus>
        )
      default:
        return (
          <Box ref={meshRef} args={[0.4, 0.4, 0.4]} position={position}>
            <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
          </Box>
        )
    }
  }

  return (
    <group>
      {renderGeometry()}
      <Text
        ref={textRef}
        position={[position[0], position[1] - 0.6, position[2]]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
        <meshBasicMaterial transparent opacity={0.8} />
      </Text>
    </group>
  )
}

function TechConstellation() {
  const groupRef = useRef<THREE.Group>(null!)

  const techStack = [
    { name: "React", color: "#61dafb", position: [-2, 1, 0] as [number, number, number], type: "sphere" as const },
    { name: "TypeScript", color: "#3178c6", position: [0, 1.5, -1] as [number, number, number], type: "cube" as const },
    { name: "Next.js", color: "#000000", position: [2, 1, 0] as [number, number, number], type: "cube" as const },
    { name: "Node.js", color: "#339933", position: [-1.5, 0, 1] as [number, number, number], type: "sphere" as const },
    { name: "JavaScript", color: "#f7df1e", position: [1.5, 0, 1] as [number, number, number], type: "torus" as const },
    { name: "Python", color: "#3776ab", position: [0, -1, 0] as [number, number, number], type: "sphere" as const },
    { name: "Java", color: "#ed8b00", position: [-2, -1, -1] as [number, number, number], type: "cube" as const },
    { name: "Docker", color: "#2496ed", position: [2, -1, -1] as [number, number, number], type: "torus" as const },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {techStack.map((tech, index) => (
        <TechIcon3D key={index} name={tech.name} color={tech.color} position={tech.position} type={tech.type} />
      ))}

      {/* Connection Lines */}
      {techStack.map((tech, index) => (
        <line key={`line-${index}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, ...tech.position])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  )
}

export default function TechIcons3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, 10]} intensity={0.3} color="#8b5cf6" />

        <TechConstellation />
      </Canvas>
    </div>
  )
}
