/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 ./public/gltf/dragon.glb --shadows --output ./app/components/gltf/Dragon.tsx --types --root ./public/ --debug
Author: Fabian Orrego (https://sketchfab.com/fabian_orrego)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/wrath-of-the-dragon-bda2c373806747a28812c9d88bf55dfa
Title: Wrath of the Dragon
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    MagicSpell001_0: THREE.Mesh
    LeaderWarrior_0: THREE.Mesh
    Wizard_0: THREE.Mesh
    Tooth_Lower_0: THREE.Mesh
    Tooth_Upper_0: THREE.Mesh
    Dragon_0: THREE.SkinnedMesh
    ['Mountain-2000_0']: THREE.Mesh
    ['Mountain-2000_0_1']: THREE.Mesh
    Tooth_Lower001_0: THREE.Mesh
    Tooth_Upper001_0: THREE.Mesh
    Dragon001_0: THREE.SkinnedMesh
    rock_004011_0: THREE.Mesh
    rock_004014_0: THREE.Mesh
    Armature_rootJoint: THREE.Bone
    Armature001_rootJoint: THREE.Bone
  }
  materials: {
    TranslucencyMaterial: THREE.MeshStandardMaterial
    ['rock_004.014_0']: THREE.MeshStandardMaterial
    ['rock_004.014_0']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/gltf/dragon.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[3.212, -56.971, 24.241]} rotation={[0, 0, -Math.PI]}>
          <primitive object={nodes.Armature_rootJoint} />
          <skinnedMesh geometry={nodes.Dragon_0.geometry} material={materials['rock_004.014_0']} skeleton={nodes.Dragon_0.skeleton} />
          <mesh castShadow receiveShadow geometry={nodes.Tooth_Lower_0.geometry} material={materials['rock_004.014_0']} position={[-2.805, -6.4, 14.082]} rotation={[1.427, 0.138, -0.003]} scale={[1.253, 1.254, 1.253]} />
          <mesh castShadow receiveShadow geometry={nodes.Tooth_Upper_0.geometry} material={materials['rock_004.014_0']} position={[-2.415, -8.992, 15.603]} rotation={[0.804, 0.114, 0.078]} scale={[1.253, 1.254, 1.253]} />
        </group>
        <group position={[-15.409, 143.678, 31.764]} rotation={[0, 0, 2.908]}>
          <mesh castShadow receiveShadow geometry={nodes['Mountain-2000_0'].geometry} material={materials['rock_004.014_0']} />
          <mesh castShadow receiveShadow geometry={nodes['Mountain-2000_0_1'].geometry} material={materials['rock_004.014_0']} />
        </group>
        <group position={[9.358, 26.971, 4.452]} rotation={[0, 0, -Math.PI]}>
          <primitive object={nodes.Armature001_rootJoint} />
          <skinnedMesh geometry={nodes.Dragon001_0.geometry} material={materials['rock_004.014_0']} skeleton={nodes.Dragon001_0.skeleton} />
          <mesh castShadow receiveShadow geometry={nodes.Tooth_Lower001_0.geometry} material={materials['rock_004.014_0']} position={[3.443, -19.143, -2.215]} rotation={[0.467, 0.318, 0.626]} scale={0.757} />
          <mesh castShadow receiveShadow geometry={nodes.Tooth_Upper001_0.geometry} material={materials['rock_004.014_0']} position={[3.765, -19.613, -0.831]} rotation={[0.195, 0.112, 0.685]} scale={0.757} />
        </group>
        <mesh castShadow receiveShadow geometry={nodes.MagicSpell001_0.geometry} material={materials.TranslucencyMaterial} position={[0.314, 51.424, 0.665]} rotation={[0, 0, 0.74]} />
        <mesh castShadow receiveShadow geometry={nodes.LeaderWarrior_0.geometry} material={materials['rock_004.014_0']} position={[0.314, 51.424, 0.665]} rotation={[0, 0, 0.74]} />
        <mesh castShadow receiveShadow geometry={nodes.Wizard_0.geometry} material={materials['rock_004.014_0']} position={[-1.74, -15.486, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.rock_004011_0.geometry} material={materials['rock_004.014_0']} position={[0.428, 51.168, 1.809]} rotation={[0, 0, 0.814]} scale={[2.175, 2.175, 0.853]} />
        <mesh castShadow receiveShadow geometry={nodes.rock_004014_0.geometry} material={materials['rock_004.014_0']} position={[-1.53, -15.564, 1.113]} rotation={[0, 0, 1.562]} scale={[2.175, 2.175, 0.853]} />
      </group>
    </group>
  )
}

useGLTF.preload('/gltf/dragon.glb')
