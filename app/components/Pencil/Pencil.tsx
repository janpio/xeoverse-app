import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Matrix4, Quaternion, Vector3 } from 'three'

const instanceCount = 1000

const Pencil = () => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [instanceIndex, setInstanceIndex] = useState(0)

    const instancedMeshRef = useRef<InstancedMesh>(null)

    useEffect(() => {
        const mouseDown = (e: MouseEvent) => {
            if (e.button === 0) {
                setIsDrawing(true)
            }
        }
        const mouseUp = (e: MouseEvent) => {
            if (e.button === 0) {
                setIsDrawing(false)
            }
        }
        window.addEventListener('mousedown', mouseDown)
        window.addEventListener('mouseup', mouseUp)
        return () => {
            window.removeEventListener('mousedown', mouseDown)
            window.removeEventListener('mouseup', mouseUp)
        }
    }, [])

    useFrame(({ camera }) => {
        if (isDrawing && instancedMeshRef.current) {
            if (instanceIndex >= instanceCount) return setInstanceIndex(0)
            const fromOfMe = camera.position.clone().add(camera.getWorldDirection(new Vector3()).multiplyScalar(2))
            const matrix = new Matrix4().compose(fromOfMe, new Quaternion(), new Vector3(1, 1, 1))
            instancedMeshRef.current.setMatrixAt(instanceIndex, matrix)
            instancedMeshRef.current.instanceMatrix.needsUpdate = true
            setInstanceIndex(instanceIndex + 1)
        }
    })

    return (
        <group>
            <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, instanceCount]} frustumCulled={false}>
                <sphereGeometry args={[0.05, 6]} />
                <meshStandardMaterial color={0xff0000} />
            </instancedMesh>
        </group>
    )
}

export default Pencil