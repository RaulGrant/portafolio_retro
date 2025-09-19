"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function AnimatedPoints({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    return positions
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null!)

  const cubes = useMemo(() => {
    const cubeArray = []
    for (let i = 0; i < 50; i++) {
      cubeArray.push({
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.1 + 0.05,
      })
    }
    return cubeArray
  }, [])

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
      cubesRef.current.rotation.y = state.clock.elapsedTime * 0.02

      cubesRef.current.children.forEach((cube, i) => {
        cube.rotation.x += 0.01 + i * 0.001
        cube.rotation.y += 0.01 + i * 0.001
        cube.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5
      })
    }
  })

  return (
    <group ref={cubesRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} rotation={cube.rotation} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.3} wireframe />
        </mesh>
      ))}
    </group>
  )
}

function MatrixGrid() {
  const gridRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
      gridRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.05) * 2
    }
  })

  return (
    <group ref={gridRef}>
      <gridHelper args={[20, 20, "#8b5cf6", "#4c1d95"]} />
      <gridHelper args={[20, 20, "#8b5cf6", "#4c1d95"]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedPoints />
        <FloatingCubes />
        <MatrixGrid />
      </Canvas>
    </div>
  )
}
