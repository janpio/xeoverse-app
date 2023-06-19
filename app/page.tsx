"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Euler, useThree, useLoader } from '@react-three/fiber'
import Box from "./components/Box"
import Floor from "./components/Floor"
import { Cone, FirstPersonControls, Sphere, Stars, useKeyboardControls } from "@react-three/drei"
import useSocket from "./hooks/useSocket"
import { Vector3 } from "three"
import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import { Controls } from "./clientLayout"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import User from './components/User'

export const arraytoVector3 = (arr: number[]) => {
  return new Vector3(arr?.[0], arr?.[1], arr?.[2])
}

export const arrayToEuler = (arr: number[]) => {
  return [arr?.[0], arr?.[1], arr?.[2], "XYZ"] as Euler
}

interface User {
  userId: string,
  position: number[]
  rotation: number[]
}

export interface SocketMessage {
  type: 'userInit' | 'userJoin' | 'userLeave' | 'userMove' | 'userRotate' | 'userVoice'
  userId: string
  position: number[]
  rotation: number[]
  data: string
  userStates: Record<string, { position: number[], rotation: number[] }>
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])

  const [myPosition, setMyPosition] = useState<number[]>([0, 0, 0])
  const [myRotation, setMyRotation] = useState<number[]>([0, 0, 0])
  const [myUserId, setMyUserId] = useState<string | null>(null)

  const [isFirstPerson, setIsFirstPerson] = useState<boolean>(true)

  const escapePressed = useKeyboardControls<Controls>(state => state.escape)

  const soccerBall = useRef<RapierRigidBody>(null);

  const { camera } = useThree()

  const socket = useSocket()

  const handleSocketMessage = useCallback((data: any) => {
    const parsed: SocketMessage = JSON.parse(data?.data || "{}")

    if (parsed.type === "userInit" && parsed.userId && parsed.userStates) {
      setMyUserId(parsed.userId)
      setUsers(Object.entries(parsed.userStates).map(([userId, { position, rotation }]) => ({ userId, position, rotation })) || [])
    }
    if (parsed.type === "userJoin" && parsed.userId) {
      setUsers(prev => {
        const filteredUsers = prev.filter(u => u.userId !== parsed.userId)
        return [...filteredUsers, ...[{ userId: parsed.userId as string, position: [0, 1, 0], rotation: [0, 0, 0] }]]
      })
    }
    if (parsed.type === "userLeave") {
      setUsers(prev => prev.filter(u => u.userId !== parsed.userId))
    }
    if (parsed.type === "userMove" && parsed.userId && parsed?.position) {
      setUsers(prev => {
        const user = prev.find(u => u.userId === parsed.userId)
        const filteredUsers = prev.filter(u => u.userId !== parsed.userId)
        const userUpdate = { userId: parsed.userId, position: user?.position.map((v, i) => v + parsed.position[i]) || [0, 0, 0], rotation: user?.rotation || [0, 0, 0] }

        return [...filteredUsers, ...[userUpdate]]
      })
    }
    if (parsed.type === "userRotate") {
      setUsers(prev => {
        const user = prev.find(u => u.userId === parsed.userId)
        const filteredUsers = prev.filter(u => u.userId !== parsed.userId)
        const userUpdate = { userId: parsed.userId, position: user?.position || [0, 0, 0], rotation: user?.rotation.map((v, i) => v + parsed.rotation[i]) || [0, 0, 0] }

        return [...filteredUsers, ...[userUpdate]]
      })
    }
  }, [])

  useEffect(() => {
    if (escapePressed) {
      setIsFirstPerson(prev => !prev)
    }
  }, [escapePressed])

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', (data) => {
        handleSocketMessage(data)
      })

      socket.addEventListener('open', (data) => {
        handleSocketMessage(data)
      })
    }
    return () => {
      socket?.removeEventListener('message', () => { })
      socket?.removeEventListener('open', () => { })
    }
  }, [handleSocketMessage, socket])

  useEffect(() => {
    const interval = setInterval(() => {
      if (myUserId && socket) {
        const prevPosition = myPosition
        const newPosition = camera.position.toArray()
        setMyPosition(newPosition)

        const prevRotation = myRotation
        const newRotation = camera.rotation.toArray().slice(0, 3) as number[];
        setMyRotation(newRotation)

        const rotationDiff = newRotation.map((v, i) => v - prevRotation[i])
        const positionDiff = newPosition.map((v, i) => v - prevPosition[i])

        if (rotationDiff.some(v => v !== 0)) {
          socket.send(`userRotate ${rotationDiff}`)
        }

        if (positionDiff.some(v => v !== 0)) {
          socket.send(`userMove ${positionDiff}`)
        }
      }
    }, 1000 / 60)

    return () => {
      clearInterval(interval)
    }
  }, [camera.position, camera.rotation, myPosition, myRotation, myUserId, socket])

  const gltf = useLoader(GLTFLoader, '/test1.glb')

  const handleSoccerBallClick = useCallback(() => {
    if (soccerBall.current) {
      const cameraDirection = camera.getWorldDirection(new Vector3())
      soccerBall.current.applyImpulse(cameraDirection, true)
    }
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={1024 * 2}
        shadow-mapSize-width={1024 * 2}
        position={[10, 10, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Box position={[-1.2, 0, 1]} color="purple" />
      <Box position={[1.2, 0, 2]} color="brown" />
      <Box position={[1.2, 2, -1]} color="blue" />
      <Box position={[-1.2, 2, -2]} color="green" />

      <RigidBody colliders={"ball"} restitution={1.5} ref={soccerBall}>
        <Sphere position={[-4, 4, 0]} onClick={handleSoccerBallClick} castShadow>
          <meshPhysicalMaterial attach="material" color="white" />
        </Sphere>
      </RigidBody>

      <RigidBody colliders={"hull"} restitution={2}>
        <Sphere position={[6, 2, 0]} args={[2, 5, 5]}>
          <meshBasicMaterial attach="material" color="brown" wireframe />
        </Sphere>
      </RigidBody>

      <primitive object={gltf.scene} position={[0, -1.05, 0]} />

      {
        users.filter(user => user.userId !== myUserId).map((u) => {
          return (
            <User key={u.userId} userId={u.userId} position={u.position} rotation={u.rotation} />
          )
        })
      }

      <FirstPersonControls makeDefault lookSpeed={0.15} enabled={isFirstPerson} movementSpeed={2} />

      <Cone position={arraytoVector3(myPosition)} rotation={arrayToEuler(myRotation)} castShadow args={[0.3, 0.7, 8]}>
        <meshPhysicalMaterial attach="material" color="gold" />
      </Cone>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Floor />
    </>
  )
}
